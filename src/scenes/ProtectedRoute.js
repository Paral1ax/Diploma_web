import React from 'react'
import { Navigate } from 'react-router-dom'
import { auth } from '../components/firebaseConfig'
import { UserAuth } from '../components/Context/AuthContext'

const ProtectedRoute = ({children}) => {

    const { user } = UserAuth()

    if (!auth.currentUser) {
        console.log("Unauthorized access")
        return <Navigate to='/'/>
    } else {
        console.log('Authorized successful ' + user)
    }
    return children
}

export default ProtectedRoute