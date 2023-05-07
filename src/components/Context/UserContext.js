import { collection, setDoc, doc } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { db } from "../firebaseConfig";


const UserDataContext = createContext()

export const UserDataContextProvider = ({
    children
}) => {
    const colRef = collection(db, 'users')
    const [currentUser, setCurrentUser] = useState({})

    const createUserByUserData = (newUser) => {

        try {
            const userRef = doc(colRef, newUser.id)
            setDoc(userRef, newUser)
        } catch (e) {
            console.log(e.message)
        }

    }
    return (
        <UserDataContextProvider value = {createUserByUserData}>
            children
        </UserDataContextProvider>
    )
}

export const UserData = () => {
    return useContext(UserDataContext)
}