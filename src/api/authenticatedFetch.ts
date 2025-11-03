import { authTokenLocalStorage, refreshAccessToken } from "../components/Auth/authService";
import { BackendUrl } from "../constants/env";


type authenticatedFetchParams = {
    method: string,
    body?: {
        [key: string]: any
    }
}

export default async function authenticatedFetch(url : string, { method, body }: authenticatedFetchParams) : Promise<Response> {
    const token = authTokenLocalStorage();

    const fetching = await fetch(`${BackendUrl}/${url}`, { 
        method, 
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });

    if(fetching.status === 401) {
        const { token: newToken } =  await refreshAccessToken();

        const retryFetch = await fetch(`${BackendUrl}/${url}`, { 
            method, 
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${newToken}`,
            }
        });

        return retryFetch
    }

    return fetching
}