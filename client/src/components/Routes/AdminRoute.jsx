import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Context/Auth'
import axios from 'axios'

const AdminRoute = () => {
    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth()

    useEffect(() => {
        const authCheck = async () => {
            console.log(auth)
            const { data } = await axios.get('/user', {
                headers: {
                    Authorization: `${auth.token}`
                }
            })
            if (data.Ok) {
                setOk(true)
            } else {
                setOk(false)
            }
        }
        if (auth?.token) authCheck()
    }, [auth?.token])
    return ok ? <Outlet /> : 'loading'
}

export default AdminRoute