import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import { Link } from 'react-router-dom'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import Power from '@material-ui/icons/Power'

export default function Anonymous() {
  return (
    <List>
      <ListItem button component={Link} to="/logout">
        <ListItemIcon>
          <Power />
        </ListItemIcon>
        <ListItemText primary="Cerrar Sesión" />
      </ListItem>
    </List>
  )
}
