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
  const profile: any = useSelector((state: RootState) =>
    get(state, 'firebase.profile')
  )
  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          {auth.photoURL ? (
            <Avatar src={auth.photoURL} />
          ) : (
            <Avatar>{profile.displayName[0]}</Avatar>
          )}
        </ListItemAvatar>
        <ListItemText>{profile.displayName}</ListItemText>
      </ListItem>
      <Divider />
    </List>
  )
}
