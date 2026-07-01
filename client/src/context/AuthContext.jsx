import { createContext, useContext, useEffect, useState } from 'react'

import API from '../api/axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
  

    

    const getProfile = async () => {
        try {
            const token = localStorage.getItem("token")

            if(!token){
                setUser(null)
                setLoading(false)
                return
            }

            const res = await API.get("/auth/profile", {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            })
            setUser(res.data)
        } catch (error) {
            setUser(null)
            localStorage.removeItem("token")
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    const logout = async() =>{
        await API.post("/auth/logout")
        setUser(null)
    }


    return(
        <AuthContext.Provider
        value={{
            user,
            setUser,
            loading,
            logout,
            getProfile
        }}>
            { !loading && children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)