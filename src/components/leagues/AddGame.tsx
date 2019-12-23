import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import * as yup from 'yup'

const VALIDATION_SCHEMA = yup.object().shape({
  winner: yup.string().required(),
  loser: yup.string().required(),
})

interface AddGameProps {
  open: boolean
  onSubmit: any
  onClose: any
}

export default function AddGame({ open, onSubmit, onClose }: AddGameProps) {
  return (
    <Formik
      validationSchema={VALIDATION_SCHEMA}
      initialValues={{
        winner: '',
        loser: '',
      }}
      onSubmit={async (values, actions) => {
        try {
          await onSubmit(values)
          actions.setSubmitting(false)
        } catch (e) {}
      }}
    >
      {({ resetForm, isValid, isSubmitting, submitForm }) => (
        <Form>
          <Dialog open={open} onClose={onClose}>
            <DialogTitle>Registrar juego de liga</DialogTitle>
            <DialogContent>
              <Field
                name="winner"
                label="Ganador"
                margin="normal"
                fullWidth
                variant="outlined"
                component={TextField}
              />
              <Field
                name="loser"
                label="Perdedor"
                margin="normal"
                fullWidth
                variant="outlined"
                component={TextField}
              />
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
