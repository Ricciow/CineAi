import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import LayoutProjeto, { projetoLoader } from './LayoutProjeto'

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
        element: <div>index</div>
      },
      {
        path: 'roteiro',
        element: <div>roteiro</div>
      },
      {
        path: 'esboco',
        element: <div>esboco</div>
      },
      {
        path: 'video',
        element: <div>video</div>
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
