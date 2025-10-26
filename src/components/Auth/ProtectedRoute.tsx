import ErrorPage from "../../pages/ErrorPage"
import Spinner from "../Outros/Spinner"
import { useAuth } from "./AuthProvider"

type ProtectedRouteProps = {
    children: React.ReactNode
    loading?: React.ReactNode
    denied?: React.ReactNode
}

export default function ProtectedRoute({ children, loading, denied } : ProtectedRouteProps) {
    const { authToken } = useAuth()

    if(authToken == undefined) {
        return loading ? loading : <Spinner message="Carregando..." />;
    } 
    
    if(authToken == null) {
        return denied ? denied : <ErrorPage />;
    } 
    
    return children
}