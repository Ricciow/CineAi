import { Outlet } from 'react-router-dom';
import CineAIHeader from './components/projetos/CineAIHeader';

export default function LayoutCineAI() {
  return (
    <div className="layout">
      <CineAIHeader />
      <main className="layout_content">
        <Outlet />
      </main>
    </div>
  );
}
