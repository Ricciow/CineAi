import { createContext, useContext, useState } from "react"
import { BackendUrl } from "../../constants/env"
import { useLocalStorage } from "react-use"

type AuthContext = {
    authToken?: string | null,
    handleLogin: (email: string, password: string) => Promise<void>
    handleLogout: () => Promise<void>
}

const AuthContext = createContext<AuthContext | undefined>(undefined)

type AuthProviderProps = {
    children: React.ReactNode
}

export default function Authprovider({ children }: AuthProviderProps) {
    const [authToken, setAuthToken] = useLocalStorage<string | null>("token", null)

    async function handleLogin(email: string, password: string) {
        const response = await fetch(`${BackendUrl}/auth/login`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ 
                email, 
                  password 
            })
        })

        const data = await response.json();

        if(!response.ok) {
            setAuthToken(null);
            throw new Error(data.detail);
        }

        setAuthToken(data.token);
    }

    async function handleLogout() {
        setAuthToken(null);
    }

    return (
    <AuthContext.Provider
        value={{
            authToken,
            handleLogin,
            handleLogout
        }}
    >
        {children}
    </AuthContext.Provider>)
}

export function useAuth() {
    const context = useContext(AuthContext)

    if(context === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }

    return context
}