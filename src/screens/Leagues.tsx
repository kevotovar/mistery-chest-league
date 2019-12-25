import React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import get from 'lodash/get'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import { RootState } from 'store'
import LeagueListCard from 'components/leagues/LeagueListCard'

const useStyles = makeStyles((theme: Theme) => ({
  header: { margin: theme.spacing(2, 0, 1) },
}))

export default function Leagues() {
  const classes = useStyles()
  useFirestoreConnect({
    collection: 'leagues',
    where: ['active', '==', true],
  })
  const leagues = useSelector(({ firestore }: RootState) =>
    get(firestore, 'ordered.leagues')
  )
  if (isLoaded(leagues)) {
    return (
      <Container>
        <Grid container justify="space-between">
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" className={classes.header}>
              Ligas
            </Typography>
          </Grid>
          {leagues.map((league: any) => (
            <Grid item xs={12} md={5}>
              <LeagueListCard
                key={league.id}
                title={league.name}
                image={league.image}
                leagueId={league.id}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    )
  }
  if (!isLoaded(leagues)) {
    return <CircularProgress />
  }
  if (isEmpty(leagues)) {
    return (
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" className={classes.header}>
              No hay ligas activas
            </Typography>
          </Grid>
        </Grid>
      </Container>
    )
  }

  return <CircularProgress />
}
