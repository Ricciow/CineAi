import { createContext, useContext, useEffect, useState } from "react"
import { BackendUrl } from "../../constants/env"
import { useLocalStorage } from "react-use"
import { jwtDecode } from "jwt-decode"

type AuthContext = {
    authToken?: string | null,
    userId?: string | null,
    handleLogin: (email: string, password: string) => Promise<void>
    handleLogout: () => Promise<void>
    handleRefresh: () => Promise<void>
}

const MARGEM_EXPIRACAO = 30000

const AuthContext = createContext<AuthContext | undefined>(undefined)

type AuthProviderProps = {
    children: React.ReactNode
}

export default function Authprovider({ children }: AuthProviderProps) {
    const [authToken, setAuthToken] = useLocalStorage<string | null>("token", undefined)
    const [userId, setUserId] = useState<string | null>()

    async function handleRefresh() {
        if(expiration && expiration * 1000 + MARGEM_EXPIRACAO < Date.now()) {
            try {
                const result = await fetch(`${BackendUrl}/auth/login/refresh`, {
                    method: "POST",
                    credentials: "include"
                })

                if(result.ok) {
                    const data = await result.json();
                    setAuthToken(data.token);
                    const tokenData : { user_id: string } = jwtDecode(data.token);
                    setUserId(tokenData.user_id);
                }
            }
            catch(e) {
                setAuthToken(null);
                setUserId(null);
            }
        }
    }

    var expiration : number | undefined;
    if(authToken) {
        expiration = jwtDecode(authToken).exp;
    }

    async function handleLogin(email: string, password: string) {
        const response = await fetch(`${BackendUrl}/auth/login`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            credentials: "include",
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

    useEffect(() => {
        handleRefresh();
    }, [])


    return (
    <AuthContext.Provider
        value={{
            authToken,
            userId,
            handleLogin,
            handleLogout,
            handleRefresh
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