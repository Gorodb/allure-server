import React from 'react'
import { Route, Switch } from 'react-router-dom'

import './App.scss'
import NavBar from "./components/navbar"
import Modal from "./components/modal"
import Push from "./components/push/Push"
import { HomePage, ExamplesPage } from "./components/pages"

import { withApiService } from './hoc'

const App = () => {
  return (
      <div>
          <Modal />
          <Push />
          <NavBar />
          <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/examples" component={ExamplesPage} />
          </Switch>
      </div>
  )
}

export default withApiService()(App)
