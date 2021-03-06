import React from 'react'
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import get from 'lodash/get'
import { useFirebase } from 'react-redux-firebase'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { setTitle } from '../store/layout/actions'
import { CircularProgress } from '@material-ui/core'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
})

const createStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
  },
  facebookButton: {
    margin: theme.spacing(0, 2, 0, 2),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2, 0, 0),
    },
  },
}))

interface RegisterUser {
  email: string
  password: string
}

export default function Login() {
  const styles = createStyles()
  const firebase = useFirebase()
  const auth = useSelector(function({ firebase }: RootState) {
    return get(firebase, 'auth')
  })
  const dispatch = useDispatch()
  React.useMemo(
    function() {
      dispatch(setTitle('Iniciar sesión'))
    },
    [dispatch]
  )
  async function registerUser({ email, password }: RegisterUser) {
    try {
      await firebase.login({ email, password })
    } catch (e) {
      console.error(e)
    }
  }
  function loginWithFacebook(params: any) {
    return firebase.login({
      provider: 'facebook',
      type: 'popup',
      scopes: ['email', 'public_profile'],
    })
  }
  const theme = useTheme()
  const useFullWidthButtons = useMediaQuery(theme.breakpoints.down('sm'))
  if (isLoaded(auth) && isEmpty(auth)) {
    return (
      <Formik
        initialValues={{ password: '', email: '' }}
        onSubmit={registerUser}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => {
          return (
            <Form>
              <Container className={styles.container}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      name="email"
                      label="Email"
                      type="email"
                      component={TextField}
                      margin="normal"
                      fullWidth
                      variant="outlined"
                    />
                    <Field
                      name="password"
                      label="Contraseña"
                      type="password"
                      component={TextField}
                      margin="normal"
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      disabled={!isValid && isSubmitting}
                      variant="contained"
                      color="primary"
                      fullWidth={useFullWidthButtons}
                    >
                      Enviar
                    </Button>
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={loginWithFacebook}
                      className={styles.facebookButton}
                      fullWidth={useFullWidthButtons}
                    >
                      Registrarse con Facebook
                    </Button>
                  </Grid>
                </Grid>
              </Container>
            </Form>
          )
        }}
      </Formik>
    )
  } else if (isLoaded(auth) && !isEmpty(auth)) {
    return <Redirect to="/" />
  }
  return <CircularProgress />
}
