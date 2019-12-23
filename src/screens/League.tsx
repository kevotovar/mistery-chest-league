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
  useFirestoreConnect(
    participants.map((participant: string) => ({
      collection: 'users',
      doc: participant,
    }))
  )
  const storeParticipants = useSelector(({ firestore }: RootState) => {
    const users = get(firestore, 'data.users', {})
    return participants
      .map((participantId: string) =>
        users[participantId]
          ? { id: participantId, ...users[participantId] }
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
      </Grid>
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
      />
    </Container>
  )
}
