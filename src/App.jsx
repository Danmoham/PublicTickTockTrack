import { useState } from 'react'
import {Route,Routes} from 'react-router-dom'
import { SignIn } from './components/SignIn'
import { SignUp } from './components/SignUp'
import { Home } from './components/Home'
import { Header } from './components/Header'
import { Calendar } from './components/Calendar'
function App() {
  const [myUser,setMyUser] = useState({})
  return (
    <div className='app-page'>
      <Header/>
    <div>
    <Routes>
      <Route path="/" element={<SignIn setMyUser={setMyUser}myUser={myUser}/>}/>
      <Route path="/SignIn" element={<SignIn setMyUser={setMyUser}myUser={myUser}/>}/>
      <Route path="/Home" element={<Home setMyUser={setMyUser} myUser={myUser}/>}/>
      <Route path="/SignUp" element={<SignUp/>}/>
      <Route path="/Calendar" element={<Calendar setMyUser={setMyUser} myUser={myUser} />} />
    </Routes>
    </div>
    </div>

  )
}

export default App
