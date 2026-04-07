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
import CineAI from "./pages/CineAI";
import LandingPageB from "./pages/LandingPageB";
import ChatPage, { chatPageLoader } from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import Authprovider from "./components/Auth/AuthProvider";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

const getLandingPage = () => {
    let variant = localStorage.getItem("cineai_variant");
    if (!variant) {
        variant = Math.random() < 0.5 ? "A" : "B";
        localStorage.setItem("cineai_variant", variant);
    }
    return variant === "B" ? <LandingPageB /> : <CineAI />;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: getLandingPage(),
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
        loader: () => redirect("/projetos/vingadores/roteiro"),
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
                loader: () => redirect("/projetos/vingadores/roteiro"),
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
