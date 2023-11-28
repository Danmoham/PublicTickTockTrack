import { useState } from 'react'
import {Route,Routes} from 'react-router-dom'
import { SignIn } from './components/SignIn'
import { SignUp } from './components/SignUp'
import { Home } from './components/Home'
import { Header } from './components/Header'
import { MyCalendar } from './components/Calendar'
import { SpecificDay } from './components/SpecificDay'
function App() {
  const [myUser,setMyUser] = useState({})
  return (
    <div className='app-page'>
      <Header/>
    <div>
    <Routes>
      <Route path="/" element={<Home setMyUser={setMyUser}myUser={myUser}/>}/>
      <Route path="/SignIn" element={<SignIn setMyUser={setMyUser}myUser={myUser}/>}/>
      <Route path="/Home" element={<Home setMyUser={setMyUser} myUser={myUser}/>}/>
      <Route path="/SignUp" element={<SignUp/>}/>
      <Route path="/Calendar" element={<MyCalendar setMyUser={setMyUser} myUser={myUser} />} />
      <Route path="/day" element={<Home setMyUser={setMyUser} myUser={myUser}/>}/>
      <Route path='/day/:my_day' element={<SpecificDay setMyUser={setMyUser} myUser={myUser} />} />

    </Routes>
    </div>
    </div>

  )
}

export default App
