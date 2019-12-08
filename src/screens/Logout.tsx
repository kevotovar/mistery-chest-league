import React from 'react'
import { useHistory } from 'react-router-dom'
import { useFirebase } from 'react-redux-firebase'
import { CircularProgress } from '@material-ui/core'

export default function Logout() {
  const firebase = useFirebase()
  const history = useHistory()
  firebase
    .auth()
    .signOut()
    .then(function() {
      history.push('/')
    })
    .catch(function() {
      history.push('/')
    })
  return <CircularProgress />
}
