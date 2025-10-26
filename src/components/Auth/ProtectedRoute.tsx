import { useNavigate } from "react-router-dom"
import ErrorPage from "../../pages/ErrorPage"
import Spinner from "../Outros/Spinner"
import { useAuth } from "./AuthProvider"

type ProtectedRouteProps = {
    children: React.ReactNode
    loading?: React.ReactNode
    denied?: React.ReactNode
    forceNavigateToLogin?: boolean
}

export default function ProtectedRoute({ children, loading, denied, forceNavigateToLogin } : ProtectedRouteProps) {
    const { authToken } = useAuth()
    const navigate = useNavigate();

    if(authToken == undefined) {
        return loading ? loading : <Spinner message="Carregando..." />;
    } 
    
    if(authToken == null) {
        if(forceNavigateToLogin) {
            navigate('/login');
        }
        return denied ? denied : <ErrorPage />;
    } 
    
    return children
}