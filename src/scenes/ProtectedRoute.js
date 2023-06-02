import React from 'react'
import { Navigate } from 'react-router-dom'
import { auth } from '../components/firebaseConfig'
import { UserAuth } from '../components/Context/AuthContext'

const ProtectedRoute = ({children}) => {

    const { user, setLoading } = UserAuth()
    if (!user) {
        console.log("Unauthorized access")
        return <Navigate to='/'/>
    } else {
        console.log('Мы всегда тут ' + user)
    }
    return children
}

export default ProtectedRoute