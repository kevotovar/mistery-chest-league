import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from 'screens/Home'
import NavBar from 'components/NavBar'
import Drawer from 'components/Drawer'

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  function toggleOpenDrawer() {
    setDrawerOpen(!drawerOpen)
  }
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar toggleOpenDrawer={toggleOpenDrawer} />
        <Drawer open={drawerOpen} toggleOpenDrawer={toggleOpenDrawer} />
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
