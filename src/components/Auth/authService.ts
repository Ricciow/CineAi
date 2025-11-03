import { BackendUrl } from "../../constants/env";
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = "token";

let refreshPromise: Promise<{ token: string, userId: string }> | null = null;

export function authTokenLocalStorage(): string | null {
    const item = localStorage.getItem(TOKEN_KEY);
    return item ? JSON.parse(item) : null;
}

export async function refreshAccessToken(): Promise<{ token: string, userId: string }> {
    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = (async () => {
        try {
            const result = await fetch(`${BackendUrl}/auth/login/refresh`, {
                method: "POST",
                credentials: "include"
            });

            if (!result.ok) {
                localStorage.removeItem(TOKEN_KEY);
                throw new Error("Falha ao dar refresh no token");
            }

            const data = await result.json();
            const newAuthToken = data.token;
            
            localStorage.setItem(TOKEN_KEY, JSON.stringify(newAuthToken)); 

            const tokenData: { user_id: string } = jwtDecode(newAuthToken);
            
            return { token: newAuthToken, userId: tokenData.user_id };

        } catch (e) {
            localStorage.removeItem(TOKEN_KEY);
            throw e;
        } finally {
            refreshPromise = null;
        }
    })();

    return refreshPromise;
}