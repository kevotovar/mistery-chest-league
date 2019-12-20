import React, { Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import NavBar from 'components/NavBar'
import Drawer from 'components/Drawer'

const Home = React.lazy(() => import('screens/Home'))
const Register = React.lazy(() => import('screens/Register'))
const Leagues = React.lazy(() => import('screens/Leagues'))
const Login = React.lazy(() => import('screens/Login'))
const Logout = React.lazy(() => import('screens/Logout'))

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  function toggleOpenDrawer() {
    setDrawerOpen(!drawerOpen)
  }
  return (
    <BrowserRouter>
      <Suspense fallback={<CircularProgress />}>
        <div className="App">
          <NavBar toggleOpenDrawer={toggleOpenDrawer} />
          <Drawer open={drawerOpen} toggleOpenDrawer={toggleOpenDrawer} />
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route exact path="/leagues">
              <Leagues />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
