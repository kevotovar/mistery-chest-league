import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import { Formik, Form, Field } from 'formik'
import { Select } from 'formik-material-ui'
import { makeStyles, Theme } from '@material-ui/core/styles'
import * as yup from 'yup'
import alert from 'components/Alert'

const VALIDATION_SCHEMA = yup.object().shape({
  winner: yup.string().required(),
  loser: yup.string().required(),
})

interface AddGameProps {
  open: boolean
  onSubmit: any
  onClose: any
  users: any
}

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing(2, 0),
  },
}))

export default function AddGame({
  open,
  onSubmit,
  onClose,
  users,
}: AddGameProps) {
  const classes = useStyles()
  const usersParsed = React.useMemo(() => {
    const userKeys = Object.keys(users)
    return userKeys.map(userKey => ({
      userId: userKey,
      ...users[userKey],
    }))
  }, [users])
  const usersOptions = React.useMemo(
    () =>
      usersParsed.map(userData => (
        <MenuItem value={userData.userId} key={userData.userId}>
          {userData.email}
        </MenuItem>
      )),
    [usersParsed]
  )
  return (
    <Formik
      validationSchema={VALIDATION_SCHEMA}
      initialValues={{
        winner: '',
        loser: '',
      }}
      onSubmit={async (values, actions) => {
        try {
          if (values.winner === values.loser) {
            actions.setSubmitting(false)
            return alert.fire({
              text: 'No se pueden seleccionar los mismos jugadores',
              icon: 'error',
            })
          }
          await onSubmit(values)
          onClose()
          actions.setSubmitting(false)
          actions.resetForm()
        } catch (e) {
          console.error(e)
        }
      }}
    >
      {({ resetForm, isValid, isSubmitting, submitForm }) => (
        <Form>
          <Dialog open={open} onClose={onClose}>
            <DialogTitle>Registrar juego de liga</DialogTitle>
            <DialogContent>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel>Ganador</InputLabel>
                <Field
                  name="winner"
                  label="Ganador"
                  fullWidth
                  component={Select}
                >
                  {usersOptions}
                </Field>
              </FormControl>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel>Perdedor</InputLabel>
                <Field
                  name="loser"
                  label="Perdedor"
                  fullWidth
                  component={Select}
                >
                  {usersOptions}
                </Field>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  onClose()
                  resetForm()
                }}
              >
                Cerrar
              </Button>
              <Button
                onClick={submitForm}
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Enviar
              </Button>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  )
}
