import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Avatar from '@material-ui/core/Avatar'

import get from 'lodash/get'

export default function Profile() {
  const auth: any = useSelector((state: RootState) =>
    get(state, 'firebase.auth')
  )
  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={auth.photoURL} />
        </ListItemAvatar>
        <ListItemText>{auth.displayName}</ListItemText>
      </ListItem>
      <Divider />
    </List>
  )
}
