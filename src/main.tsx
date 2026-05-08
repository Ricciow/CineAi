import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
    createBrowserRouter,
    redirect,
    RouterProvider,
} from "react-router-dom";
import LayoutProjeto, { projetoLoader } from "./LayoutProjeto";
import RoteiroPage, { roteiroPageLoader } from "./pages/RoteiroPage";
import ErrorPage from "./pages/ErrorPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import LandingPage from "./pages/LandingPage";
import ChatPage, { chatPageLoader } from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import Authprovider from "./components/Auth/AuthProvider";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import ProjetosPage, { projetosPageLoader } from "./pages/ProjetosPage";
import AnalyticsPage, { analyticsPageLoader } from "./pages/AnalyticsPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/projetos",
        element: (
            <ProtectedRoute forceNavigateToLogin>
                <ProjetosPage />
            </ProtectedRoute>
        ),
        loader: projetosPageLoader,
    },
    {
        path: "/projetos/:projeto",
        element: (
            <ProtectedRoute forceNavigateToLogin>
                <LayoutProjeto />
            </ProtectedRoute>
        ),
        loader: projetoLoader,
        children: [
            {
                index: true,
                loader: ({ params }) => redirect(`/projetos/${params.projeto}/roteiro`),
            },
            {
                path: "roteiro",
                loader: roteiroPageLoader,
                element: <RoteiroPage />,
            },
            {
                path: "roteiro/:id",
                loader: chatPageLoader,
                element: <ChatPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "imagem",
                element: <ComingSoonPage 
                    title="Esboço" 
                    description="Visualize sua história com storyboards e esboços gerados por IA." 
                />,
            },
            {
                path: "video",
                element: <ComingSoonPage 
                    title="Geração de vídeo" 
                    description="Transforme seu roteiro em cenas de vídeo impressionantes." 
                />,
            },
            {
                path: "*",
                element: <ErrorPage />,
            },
        ],
    },
    {
        path: "/analytics",
        element: (
            <ProtectedRoute forceNavigateToLogin>
                <AnalyticsPage />
            </ProtectedRoute>
        ),
        loader: analyticsPageLoader,
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Authprovider>
            <RouterProvider router={router} />
        </Authprovider>
    </StrictMode>
);
