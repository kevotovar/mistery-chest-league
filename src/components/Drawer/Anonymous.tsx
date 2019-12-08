import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import { Link } from 'react-router-dom'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import VpnKey from '@material-ui/icons/VpnKey'

export default function Anonymous() {
  return (
    <List>
      <ListItem button component={Link} to="/login">
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        <ListItemText primary="Iniciar Sesión" />
      </ListItem>
      <ListItem button component={Link} to="/register">
        <ListItemIcon>
          <VpnKey />
        </ListItemIcon>
        <ListItemText primary="Registrarse" />
      </ListItem>
    </List>
  )
}
