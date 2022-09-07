import React, {useEffect, useState} from 'react'
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'

import './App.scss'
import NavBar from "./components/navbar"
import Modal from "./components/modal"
import Push from "./components/push/Push"
import {HomePage, ExamplesPage, NotFoundPage} from "./components/pages"
import {strings} from "./localization/strings";

const App = () => {
  const [, setLang] = useState<string>(strings.getLanguage())
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const language = location.pathname.split('/')[1];
    const languages = strings.getAvailableLanguages();
    if (languages.includes(language)) {
      strings.setLanguage(language)
      setLang(language)
    } else {
      strings.setLanguage(strings.getLanguage())
      navigate(strings.getLanguage())
    }
  }, [])

  return (
    <div data-id="root_section">
      <Modal/>
      <Push/>
      <NavBar/>
      <Routes>
        <Route path=":lang/">
          <Route path={``} element={<HomePage />}/>
          <Route path={`examples`} element={<ExamplesPage />}/>
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
