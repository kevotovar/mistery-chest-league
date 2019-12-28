import React from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme } from '@material-ui/core/styles'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import ArrowDropUp from '@material-ui/icons/ArrowDropUp'
import get from 'lodash/get'
import { useTable, useSortBy } from 'react-table'

interface LeagueRegistredUsersProps {
  data: any
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    margin: theme.spacing(4, 0, 4),
  },
  headerTableCell: {
    verticalAlign: 'top',
  },
}))

interface ShowArrowColumn {
  isSorted: boolean
  isSortedDesc: boolean
}

function showArrow(column: ShowArrowColumn) {
  if (column.isSorted) {
    if (column.isSortedDesc) {
      return <ArrowDropDown />
    } else {
      return <ArrowDropUp />
    }
  }
  return null
}

const columns = [
  {
    Header: 'ID',
    disableSortBy: true,
    accessor: (item = {}) => get(item, 'id'),
    sortable: false,
  },
  {
    Header: 'Jugador',
    disableSortBy: true,
    accessor: (item = {}) => get(item, 'displayName') || get(item, 'email'),
  },
  {
    Header: 'Juegos ganados',
    accessor: (item = {}) => get(item, 'wins'),
    id: 'wins',
  },
  { Header: 'Juegos jugados', accessor: (item = {}) => get(item, 'played') },
]

export default function LeagueRegistredUsers({
  data,
}: LeagueRegistredUsersProps) {
  const classes = useStyles()
  const initialState = React.useMemo(
    () => ({
      sortBy: [{ id: 'wins', desc: true }],
    }),
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    headerGroups,
  } = useTable(
    { data, columns, disableMultiSort: true, initialState } as any,
    useSortBy
  )
  if (data.length === 0) {
    return (
      <div className={classes.container}>
        <Typography variant="h5" gutterBottom>
          No existen usuarios registrados
        </Typography>
      </div>
    )
  }
  return (
    <div className={classes.container}>
      <Typography variant="h5" gutterBottom>
        Registrados
      </Typography>
      <TableContainer component={Paper}>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => {
                  return (
                    <TableCell
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={classes.headerTableCell}
                    >
                      {column.render('Header')}
                      {showArrow(column as any)}
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
