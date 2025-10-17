import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {createBrowserRouter, redirect, RouterProvider} from 'react-router-dom';
import LayoutProjeto, { projetoLoader } from './LayoutProjeto';
import RoteiroPage from './pages/RoteiroPage';
import ErrorPage from './pages/ErrorPage';
import CineAI from './pages/CineAI';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CineAI />,
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
        element: <RoteiroPage />,
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
    <RouterProvider router={router} />
  </StrictMode>
);
