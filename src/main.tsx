import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import LayoutProjeto, { projetoLoader } from './LayoutProjeto'
import RoteiroPage from './pages/RoteiroPage'
import ErrorPage from './pages/ErrorPage'

const router = createBrowserRouter([
  {
    // Redireciona para a pagina de projeto para o MVP
    path: '/',
    element: <div></div>,
    loader: () => {
      return redirect('/projetos/vingadores')
    }
  },
  {
    // Redireciona para a pagina de projeto para o MVP
    path: '/:qualquer',
    element: <div></div>,
    loader: () => {
      return redirect('/projetos/vingadores')
    }
  },
  {
    path: '/projetos/:projeto',
    element: <LayoutProjeto />,
    loader: projetoLoader,
    children: [
      {
        index: true,
        element: <div></div>,
        loader: () => {
          return redirect('/projetos/vingadores/roteiro')
        }
      },
      {
        path: 'roteiro',
        element: <RoteiroPage />  
      },
      {
        path: '*',
        element: <ErrorPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
