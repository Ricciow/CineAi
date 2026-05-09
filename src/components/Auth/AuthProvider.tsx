import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { BackendUrl } from "../../constants/env"
import { useLocalStorage } from "react-use"
import { jwtDecode } from "jwt-decode"
import { refreshAccessToken } from "./authService"

type AuthContext = {
    authToken?: string | null,
    userId?: string | null,
    userEmail?: string | null,
    username?: string | null,
    handleLogin: (email: string, password: string) => Promise<void>
    handleRegister: (email: string, password: string, username: string) => Promise<void>
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
    const [userId, setUserId] = useState<string | null>(null)
    const [userEmail, setUserEmail] = useState<string | null>(null)
    const [username, setUsername] = useState<string | null>(null)

    useEffect(() => {
        if (authToken) {
            try {
                const tokenData: { user_id: string, email: string, username: string } = jwtDecode(authToken);
                setUserId(tokenData.user_id);
                setUserEmail(tokenData.email);
                setUsername(tokenData.username);
            } catch (e) {
                setAuthToken(null);
                setUserId(null);
                setUserEmail(null);
                setUsername(null);
            }
        } else {
            setUserId(null);
            setUserEmail(null);
            setUsername(null);
        }
    }, [authToken, setAuthToken]);

    const expiration = useMemo(() => {
        if (!authToken) return undefined;
        try {
            return jwtDecode(authToken).exp;
        } catch {
            return undefined;
        }
    }, [authToken]);

    async function handleRefresh() {
        if(expiration && expiration * 1000 + MARGEM_EXPIRACAO < Date.now() || !authToken) {
            try {
                const {token, userId} = await refreshAccessToken(); 
                setAuthToken(token);
                setUserId(userId);
            }
            catch(e) {
                setAuthToken(null);
                setUserId(null);
            }
        }
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
            setUserId(null);
            throw new Error(data.detail);
        }

        setAuthToken(data.token);
    }

    async function handleRegister(email: string, password: string, username: string) {
        const response = await fetch(`${BackendUrl}/auth/register`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ 
                email, 
                password,
                username
            })
        })

        const data = await response.json();

        if(!response.ok) {
            throw new Error(data.detail);
        }
    }

    async function handleLogout() {
        try {
            const token = authToken;
            await fetch(`${BackendUrl}/auth/logout`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : "",
                }
            });
        } catch (e) {
            console.error("Erro some error logout no backend:", e);
        } finally {
            setAuthToken(null);
            setUserId(null);
        }
    }

    useEffect(() => {
        handleRefresh();
    }, [])


    return (
    <AuthContext.Provider
        value={{
            authToken,
            userId,
            userEmail,
            username,
            handleLogin,
            handleRegister,
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
