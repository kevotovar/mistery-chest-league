import React from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Delete from '@material-ui/icons/Delete'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useTable } from 'react-table'
import moment from 'moment'
import { functions } from 'store'

interface LeagueGamesHistoryProps {
  data: any
  users: any
  admin: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    margin: theme.spacing(4, 0, 4),
  },
  headerTableCell: {
    verticalAlign: 'top',
  },
}))

const baseColumns = (users: any) => [
  {
    Header: 'Ganador',
    accessor: (item: any) =>
      users[item.winner]?.displayName || users[item.winner]?.email,
  },
  {
    Header: 'Perdedor',
    accessor: (item: any) =>
      users[item.winner]?.displayName || users[item.loser]?.email,
  },
  {
    Header: 'Fecha',
    accessor: (item: any) => item.timestamp.seconds,
    Cell: (props: any) => moment(props.value).format('LLL'),
  },
]

export default function LeagueGamesHistory({
  data,
  users,
  admin,
}: LeagueGamesHistoryProps) {
  const classes = useStyles()

  function deleteGame(gameId: string) {
    return function() {
      const deleteGame = functions.httpsCallable('deleteGame')
      deleteGame({ gameId })
    }
  }

  const columns: any = React.useMemo(
    () =>
      admin
        ? [
            ...baseColumns(users),
            {
              Header: 'Eliminar',
              accessor: (item: any) => item.id,
              Cell: props => {
                return (
                  <IconButton onClick={deleteGame(props.cell.value)}>
                    <Delete />
                  </IconButton>
                )
              },
            },
          ]
        : baseColumns(users),
    [users, admin]
  )
  const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    headerGroups,
  } = useTable({ columns, data })
  if (!data.length) {
    return (
      <div className={classes.container}>
        <Typography variant="h5" gutterBottom>
          Todavía no hay juego registrados
        </Typography>
      </div>
    )
  }
  return (
    <div className={classes.container}>
      <Typography variant="h5" gutterBottom>
        Juegos de liga
      </Typography>
      <TableContainer component={Paper}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => {
                  return (
                    <TableCell
                      {...column.getHeaderProps()}
                      className={classes.headerTableCell}
                    >
                      {column.render('Header')}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
