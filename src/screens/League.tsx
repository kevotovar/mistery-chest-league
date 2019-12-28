import React from 'react'
import { useSelector } from 'react-redux'
import {
  useFirestoreConnect,
  isLoaded,
  isEmpty,
  useFirebase,
} from 'react-redux-firebase'
import { useParams } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles, Theme } from '@material-ui/core/styles'
import get from 'lodash/get'

import { RootState } from 'store'
import LeagueRegistredUsers from 'components/leagues/LeagueRegistredUsers'
import LeagueGamesHistory from 'components/leagues/LeagueGamesHistory'
import AddGame from 'components/leagues/AddGame'

const useStyles = makeStyles((theme: Theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}))

export default function League() {
  const { leagueId } = useParams()
  useFirestoreConnect(`/leagues/${leagueId}`)
  const league = useSelector(({ firestore }: RootState) =>
    get(firestore, `data.leagues.${leagueId}`)
  )
  const participants = get(league, 'participants', [])
  const users = useSelector(({ firestore }: RootState) =>
    get(firestore, 'data.users', {})
  )
  const userUid = useSelector(({ firebase }: RootState) =>
    get(firebase, 'auth.uid')
  )
  useFirestoreConnect(
    participants.map((participant: string) => ({
      collection: 'users',
      doc: participant,
      type: 'once',
    }))
  )
  useFirestoreConnect({
    collection: 'games',
    where: ['leagueId', '==', leagueId],
  })
  useFirestoreConnect({
    collection: 'roles',
    doc: userUid,
  })
  const userRole = useSelector(
    ({ firestore }: RootState) =>
      get(firestore, `data.roles.${userUid}`, {}) || {}
  )
  const leagueGames: any[] = useSelector(({ firestore }: RootState) =>
    get(firestore, 'ordered.games', [])
  )
  const leagueGamesWins = React.useMemo(
    () =>
      leagueGames.reduce(function(acc, leagueGame) {
        const winner = leagueGame.winner
        const leagueGameWinsCount = acc[winner]
        if (leagueGameWinsCount) {
          acc[winner] += 1
          return acc
        } else {
          acc[winner] = 1
          return acc
        }
      }, {}),
    [leagueGames]
  )
  const leagueGamesPlayed = React.useMemo(
    () =>
      leagueGames.reduce(function(acc, leagueGame) {
        const winner = leagueGame.winner
        const loser = leagueGame.loser
        const accLoserUser = acc[loser]
        const accWinnerUser = acc[winner]
        if (accLoserUser) {
          acc[loser] += 1
        } else {
          acc[loser] = 1
        }
        if (accWinnerUser) {
          acc[winner] += 1
        } else {
          acc[winner] = 1
        }
        return acc
      }, {}),
    [leagueGames]
  )
  const storeParticipants = useSelector(({ firestore }: RootState) => {
    const users = get(firestore, 'data.users', {})
    return participants
      .map((participantId: string) =>
        users[participantId]
          ? {
              id: participantId,
              wins: leagueGamesWins[participantId] || 0,
              played: leagueGamesPlayed[participantId] || 0,
              ...users[participantId],
            }
          : {}
      )
      .filter((participant: any) => participant.email)
  })
  const [dialog, setDialog] = React.useState(false)
  const classes = useStyles()
  const firebase: any = useFirebase()
  function submit(value: any) {
    const functions = firebase.functions()
    const registerGame = functions.httpsCallable('registerGame')
    return registerGame({ ...value, leagueId })
  }
  if (!isLoaded(league)) {
    return <CircularProgress />
  }
  if (isEmpty(league)) {
    return (
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Typography>No existe la liga</Typography>
          </Grid>
        </Grid>
      </Container>
    )
  }
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1">
            {league.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <LeagueRegistredUsers data={storeParticipants} />
        </Grid>
        <Grid item xs={12}>
          <LeagueGamesHistory
            data={leagueGames}
            users={users}
            admin={userRole.admin}
          />
        </Grid>
      </Grid>
      {userRole.admin && (
        <>
          <Fab
            color="primary"
            onClick={() => setDialog(true)}
            className={classes.fab}
          >
            <AddIcon />
          </Fab>
          <AddGame
            open={dialog}
            onClose={() => setDialog(false)}
            onSubmit={submit}
            users={users}
          />
        </>
      )}
    </Container>
  )
}
