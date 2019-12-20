import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

interface LeagueListCardProps {
  title: string
  image: string
  leagueId: string
}

const useStyles = makeStyles({
  cardMedia: {
    height: 300,
  },
  card: {
    width: '100%',
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
  link: {
    textDecoration: 'none',
  },
})

export default function LeagueListCard({
  title,
  image,
  leagueId,
}: LeagueListCardProps) {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.cardMedia} image={image} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Link to={`/leagues/${leagueId}`} className={classes.link}>
          <Button variant="contained" color="primary">
            Ver detalles de la liga
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}
