import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    setPersistence,
    browserSessionPersistence
} from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { db } from "../firebaseConfig";
import { query, collection,onSnapshot, where, getDocs, doc, getDoc } from "firebase/firestore";
import { Dashboard } from "@mui/icons-material";
import LoadingScreen from "../../scenes/loadingScreen";
import AuthForm from "../../scenes/auth";
import AppLayout from "../../scenes/global/Menues";

const UserContext = createContext()

export const AuthContextProvider = ({
    children
}) => {
 
    const [user, setUser] = useState({})
    
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        setUser(null)
        setAuthState(false)
        return signOut(auth)
    }
    const [userData, setUserData] = useState({})

    const getUserById = async () => {
        try {
            console.log("sidebar curid = " + user.uid)
            const userRef = doc(db, 'users', user.uid)
            const userSnap = await getDoc(userRef)
            if (userSnap.exists()) {
                setUserData(userSnap.data())
                console.log("функция работает")
            }
            else console.log("User not found")
        } catch (e) {
            console.log(e.message)
        }
    }

    const [loading, setLoading] = useState(true);
    const [authState, setAuthState] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setLoading(true)
            if (currentUser) {
                setAuthState(true)
                setUser(currentUser)
                setLoading(false)
            } else {
                setAuthState(false)
                setLoading(false)
            }
        })
        return () => {
            unsubscribe();
        };
    }, [])
    return (
        <UserContext.Provider value={{ createUser, signIn, user, logout, getUserById, userData}}>
            {loading ? (<LoadingScreen />): {authState} ? (children) : (<AuthForm/>)}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}