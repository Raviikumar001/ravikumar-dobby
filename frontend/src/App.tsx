import {Routes,Route} from 'react-router-dom';
import Home from './home/Home';
import Auth from './accounts/Auth';


export default function App() {
  return (
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path ='/accounts' element={<Auth/>} />

      {/* <Route element={<ProtectedRoute />}> 
        <Route path='/app' element={<MainApp />} />
        <Route path='/game' element={<Game />} />
        <Route path='/app/leaderboard' element ={<Leaderboard />} />
        <Route path='/app/instructons' element={<Instructions />} / >
      </Route> */}

    </Routes>
  )
}