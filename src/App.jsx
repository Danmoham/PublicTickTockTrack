import { useState } from 'react'
import {Route,Routes} from 'react-router-dom'
import { SignIn } from './components/SignIn'
import { SignUp } from './components/SignUp'
import { Home } from './components/Home'
function App() {

  return (
    <div className='app-page'>
      <h1>Time Tracker</h1>
    <div>
    <Routes>
      <Route path="/" element={<SignIn/>}/>
      <Route path="/SignIn" element={<SignIn/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/SignUp" element={<SignUp/>}/>

    </Routes>
    </div>
    </div>

  )
}

export default App
