
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { useAuth } from './Context/Auth'
import AdminHome from './pages/Admin/AdminHome'
import UserHome from './pages/User/UserHome'
import AdminRoute from './components/Routes/AdminRoute'
import CreateProduct from './pages/Admin/CreateProduct'

import CarList from './pages/CarList'
import CarDetail from './pages/CarDetail'
import ScrollToTop from './Context/ScrollToTop'
import SearchCom from './pages/SearchCom'


function App() {
  const [auth, setAuth] = useAuth()
  const isAuthenticated = auth?.user !== null;

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={
          isAuthenticated ? (
            auth.user.role === 1 ? (
              <AdminHome />
            ) : (
              <UserHome />
            )
          ) : (
            <Home />

          )

        } />
        <Route path="/admin" element={<AdminRoute />}>
          <Route path='create-product' element={<CreateProduct />} />
        </Route>


        <Route path='/c' element={<CarList />} />
        <Route path='/c/:slug' element={<CarDetail />} />
        <Route path='/search' element={<SearchCom />} />


        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />

      </Routes>

    </>
  )
}

export default App
