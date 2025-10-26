import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {createBrowserRouter, redirect, RouterProvider} from 'react-router-dom';
import LayoutProjeto, { projetoLoader } from './LayoutProjeto';
import RoteiroPage, { roteiroPageLoader } from './pages/RoteiroPage';
import ErrorPage from './pages/ErrorPage';
import CineAI from './pages/CineAI';
import ChatPage, { chatPageLoader } from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import Authprovider from './components/Auth/AuthProvider';
import RegisterPage from './pages/RegisterPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CineAI />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: '/projetos',
    loader: () => redirect('/projetos/vingadores/roteiro'),
  },
  {
    path: '/projetos/:projeto',
    element: <LayoutProjeto />,
    loader: projetoLoader,
    children: [
      {
        index: true,
        loader: () => redirect('/projetos/vingadores/roteiro'),
      },
      {
        path: 'roteiro',
        loader: roteiroPageLoader,
        element: <RoteiroPage />,
      },
      {
        path: 'roteiro/:id',
        loader: chatPageLoader,
        element: <ChatPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Authprovider>
      <RouterProvider router={router} />
    </Authprovider>
  </StrictMode>
);
