import { createStore } from 'redux'
import { combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import { layoutReducer } from './layout/reducer'

const firebaseConfig = {
  apiKey: 'AIzaSyC2h5s4j_vMkUFRH2c0k1LT9kHj9pSwjwg',
  authDomain: 'mistery-chest.firebaseapp.com',
  databaseURL: 'https://mistery-chest.firebaseio.com',
  projectId: 'mistery-chest',
  storageBucket: 'mistery-chest.appspot.com',
  messagingSenderId: '890216789840',
  appId: '1:890216789840:web:c8b857eeb9da3dc7f85e55',
  measurementId: 'G-JDYYHXJZ7J',
}

firebase.initializeApp(firebaseConfig)
firebase.firestore()

const reducers = combineReducers({
  layoutState: layoutReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
})

export type RootState = ReturnType<typeof reducers>

const store = createStore(reducers, composeWithDevTools())

export { store, firebase }
