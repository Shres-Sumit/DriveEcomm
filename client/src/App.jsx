
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
import Cart from './pages/User/Cart'
import UserInfo from './pages/User/UserInfo'
import { useEffect, useState } from 'react'
import DashBoardHome from './pages/Admin/Dashboard/DashBoardHome'
import EditUser from './pages/Admin/component/EditUser'
import AdminCarComponet from './pages/Admin/component/AdminCarComponet'
import Choice from './pages/Choice'


function App() {
  const [auth, setAuth] = useAuth()
  const [loading, setLoading] = useState(true)
  const isAuthenticated = auth?.user !== null;

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100))
        setLoading(false)
      } catch (error) {
        console.error('Error during initialization:', error);
        setLoading(false);
      }
    }
    initializeApp()

  }, [])

  if (loading) {
    // Render the spinner during the loading phase
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={isAuthenticated ? (auth.user.role === 1 ? <DashBoardHome /> : <UserHome />) : <Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />

        <Route path="/admin" element={<AdminRoute />}>
          <Route index element={<DashBoardHome />} />
          <Route path='create-product' element={<CreateProduct />} />
          <Route path='cars' element={<AdminCarComponet />} />
          <Route path='users' element={<EditUser />} />
        </Route>



        <Route path='/bucket' element={
          isAuthenticated ? (
            <Cart />
          ) : (
            <Login />
          )
        } />


        <Route path='/c' element={<CarList />} />
        <Route path='/c/:slug' element={<CarDetail />} />
        <Route path='/search/:search' element={<SearchCom />} />
        <Route path='/profile' element={<UserInfo />} />





      </Routes>

    </>
  )
}

export default App
