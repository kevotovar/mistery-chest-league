import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createFirestoreInstance } from 'redux-firestore'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import moment from 'moment'

import { store, firebase } from './store'
import App from './App'
import theme from './theme'

import * as serviceWorker from './serviceWorker'
import 'moment/locale/es'
import './styles.css'

moment.locale('es')

const rrfConfig = {
  userProfile: 'users',
  presence: 'presence',
  sessions: 'sessions',
  useFirestoreForProfile: true,
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={rrfConfig}
      createFirestoreInstance={createFirestoreInstance}
      dispatch={store.dispatch}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
