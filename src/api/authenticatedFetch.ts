import { BackendUrl } from "../constants/env";


type authenticatedFetchParams = {
    method: string,
    body?: {
        [key: string]: any
    }
}

export default async function authenticatedFetch(url : string, { method, body }: authenticatedFetchParams,  token ?: string | null) : Promise<Response> {
    return fetch(`${BackendUrl}/${url}`, { 
        method, 
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    });
}