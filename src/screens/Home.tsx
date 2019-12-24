import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import get from 'lodash/get'

import { setTitle } from 'store/layout/actions'
import { RootState } from 'store'

import heroImage from 'images/hero.png'

const useStyles = makeStyles((theme: Theme) => {
  return {
    heroContainer: {
      height: '600px',
      backgroundImage: `url(${heroImage})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      [theme.breakpoints.down('md')]: {
        height: '300px',
      },
    },
  }
})

function Home() {
  const classes = useStyles()
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(setTitle('Mistery Chest League'))
  }, [dispatch])
  const isAuth = useSelector(({ firebase }: RootState) =>
    Boolean(get(firebase, 'auth.uid'))
  )
  return (
    <div>
      <div className={classes.heroContainer}></div>
      <Container>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Typography variant="h5" component="h1" gutterBottom>
              Participa en nuestras ligas para llevar producto de Weiss Schwarz
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              component={Link}
              to={isAuth ? 'leagues' : '/register'}
            >
              {isAuth ? 'Ligas' : 'Registrarse'}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Home
