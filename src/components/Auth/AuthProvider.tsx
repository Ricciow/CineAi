import { createContext, useContext, useEffect } from "react"
import { BackendUrl } from "../../constants/env"
import { useLocalStorage } from "react-use"
import { jwtDecode } from "jwt-decode"

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
    const [authToken, setAuthToken] = useLocalStorage<string | null>("token", undefined)
    
    var expiration : number | undefined;
    if(authToken) {
        expiration = jwtDecode(authToken).exp;
        console.log(expiration! * 1000, Date.now(), expiration! * 1000 < Date.now());
    }

    useEffect(() => {
        async function refreshToken() {
            if(expiration && expiration * 1000 < Date.now()) {
                try {
                    const result = await fetch(`${BackendUrl}/auth/login/refresh`, {
                        method: "POST",
                        credentials: "include"
                    })
    
                    if(result.ok) {
                        const data = await result.json();
                        console.log(JSON.stringify(data))
                        setAuthToken(data.token);
                    }
                }
                catch(e) {
                    setAuthToken(null);
                }
            }
        }

        refreshToken();
    }, [])

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