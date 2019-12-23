import * as functions from 'firebase-functions'
import * as yup from 'yup'
import * as admin from 'firebase-admin'

admin.initializeApp()
let db = admin.firestore()

exports.registerGame = functions.https.onCall(async (data, context) => {
  const VALIDATION_SCHEMA = yup.object().shape({
    winner: yup.string().required(),
    loser: yup.string().required(),
    leagueId: yup.string().required(),
  })
  try {
    if (!context.auth?.uid) {
      return new functions.https.HttpsError(
        'unauthenticated',
        'El usuario no esta autenticado'
      )
    }
    await VALIDATION_SCHEMA.validate(data)
    const userRoleReference = await db
      .collection('roles')
      .doc(context.auth?.uid || '')
    const userRole = await userRoleReference.get()

    const userRoleData = userRole.data()
    if (userRoleData?.admin) {
      const gamesReference = await db.collection('games').doc()
      await gamesReference.set({
        winner: data.winner,
        loser: data.loser,
        leagueId: data.leagueId,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      })
      return {
        message: 'Juego registrado',
      }
    } else {
      return new functions.https.HttpsError(
        'permission-denied',
        'El ususario no es administrador'
      )
    }
  } catch (error) {
    throw new functions.https.HttpsError('invalid-argument', error)
  }
})
