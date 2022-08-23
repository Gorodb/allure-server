import React from 'react'
import {Route, Routes} from 'react-router-dom'

import './App.scss'
import NavBar from "./components/navbar"
import Modal from "./components/modal"
import Push from "./components/push/Push"
import {HomePage, ExamplesPage} from "./components/pages"

const App = () => {
  return (
    <div>
      <Modal/>
      <Push/>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/examples" element={<ExamplesPage/>}/>
      </Routes>
    </div>
  )
}

export default App
