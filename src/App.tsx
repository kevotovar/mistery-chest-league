import React, { Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import NavBar from 'components/NavBar'
import Drawer from 'components/Drawer'

const Home = React.lazy(() => import('screens/Home'))
const Register = React.lazy(() => import('screens/Register'))
const Leagues = React.lazy(() => import('screens/Leagues'))
const League = React.lazy(() => import('screens/League'))
const Login = React.lazy(() => import('screens/Login'))
const Logout = React.lazy(() => import('screens/Logout'))
const NotFound = React.lazy(() => import('screens/404'))
const PrivacyPolicy = React.lazy(() => import('screens/PrivacyPolicy'))

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
            <Route exact path="/leagues/:leagueId">
              <League />
            </Route>
            <Route exact path="/privacy-policy">
              <PrivacyPolicy />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
