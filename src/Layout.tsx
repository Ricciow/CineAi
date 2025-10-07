import { useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children?: React.ReactNode }) {
    // URL atual
    const location = useLocation();

    // Divide a URL
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <div className="layout">
            <Header pathnames={pathnames}/>
            <Sidebar pathnames={pathnames}/>
            {children}
        </div>
    )
}