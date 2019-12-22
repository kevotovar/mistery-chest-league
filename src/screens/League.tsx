import React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useParams } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import get from 'lodash/get'

import { RootState } from 'store'

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
      </Grid>
    </Container>
  )
}
