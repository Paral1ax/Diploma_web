import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    setPersistence,
    browserSessionPersistence,
} from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { db } from "../firebaseConfig";
import { query, collection, onSnapshot, where, getDocs, doc, getDoc, getDocFromCache } from "firebase/firestore";
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
    const [loading, setLoading] = useState(true);
    const [authState, setAuthState] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            let userInfo = {}
            console.log("Проверка пользователя")
            if (currentUser) {
                console.log("Проверка завершена успешно")
                setUser(currentUser)
                const userRef = doc(db, 'users', currentUser.uid)
                getDoc(userRef).then((userSnap) => {
                    if (userSnap.exists()) {
                        userInfo = userSnap.data()
                        console.log("функция работает")
                    } else console.log("User not found")

                }).then(() => {

                    setUserData(userInfo)

                    setAuthState(true)
                    setLoading(false)
                    console.log("UserInfo = " + userInfo)
                })
            } else {
                console.log("Пользователь не авторизован")
                setAuthState(false)
                setLoading(false)
            }
        })
        return () => {
            unsubscribe();
        };
    }, [])
    return (
        <UserContext.Provider value={{ createUser, signIn, user, logout, userData, loading, setLoading }}>
            {loading ? (<LoadingScreen />) : { authState } ? (children) : (<AuthForm />)}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}