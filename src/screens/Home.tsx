import React from 'react'
import Typography from '@material-ui/core/Typography'
import { useDispatch } from 'react-redux'

import { setTitle } from 'store/layout/actions'

function Home() {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(setTitle('Mistery Chest League'))
  }, [dispatch])
  return <Typography>Inicio</Typography>
}

export default Home
