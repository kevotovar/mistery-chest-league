import React from 'react'
import { Link } from 'react-router-dom'
import { isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import get from 'lodash/get'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Home from '@material-ui/icons/Home'

import Anonymous from './Anonymous'
import Logged from './Logged'
import { RootState } from '../../store'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
})

interface TemporaryDrawerProps {
  open: boolean
  toggleOpenDrawer: any
}

export default function TemporaryDrawer({
  open,
  toggleOpenDrawer,
}: TemporaryDrawerProps) {
  const classes = useStyles()
  const auth = useSelector(({ firebase }: RootState) => get(firebase, 'auth'))

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleOpenDrawer}
      onKeyDown={toggleOpenDrawer}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItem>
      </List>
      <Divider />
      {isEmpty(auth) ? <Anonymous /> : <Logged />}
    </div>
  )

  return (
    <Drawer open={open} onClose={toggleOpenDrawer}>
      {sideList()}
    </Drawer>
  )
}
