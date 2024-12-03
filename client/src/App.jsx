
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast';
import { useAuth } from './Context/Auth'
import AdminHome from './pages/Admin/AdminHome'
import UserHome from './pages/User/UserHome'
import AdminRoute from './components/Routes/AdminRoute'


function App() {
  const [auth, setAuth] = useAuth()
  const isAuthenticated = auth?.user !== null;

  return (
    <>
      <Routes>
        {/* <Route path='/' element={
          isAuthenticated ? (
            auth.user.role === 1 ? (
              <AdminHome />
            ) : (
              <UserHome />
            )
          ) : (
            <Home />

          )

        } /> */}
        <Route path='/' element={<AdminRoute />}>
          <Route path='admin' element={<AdminHome />} />

        </Route>

        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />

      </Routes>

    </>
  )
}

export default App
