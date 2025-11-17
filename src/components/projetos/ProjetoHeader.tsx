import { Link, useLocation, useNavigate } from "react-router-dom";
import React from 'react';
import Button from "../Buttons/Button";
import { useAuth } from "../Auth/AuthProvider";

export default function ProjetoHeader() {
    // URL atual
    const location = useLocation();
    const navigate = useNavigate();
    const { handleLogout } = useAuth();

    // Divide a URL
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <header className="header">
            <Link to="/" className="cine_ai_title">CineAI</Link>
            <i className="fi fi-rr-angle-small-right header_arrow"></i>
            <nav className="header_nav">
                {pathnames.map((name_unformatted, index) => {
                    // Link para o segmento atual
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = (index === pathnames.length - 1);
                    
                    const name = name_unformatted.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

                    return (
                        <React.Fragment key={routeTo}>
                            <Button
                                end
                                to={routeTo}
                                type="header"
                                text={name}
                            />
                            {!isLast && <p>/</p>}
                        </React.Fragment>
                    );
                })}
            </nav>
            <div style={{ marginLeft: 'auto' }}>
                <Button 
                    text="Sair" 
                    style="delete_button_bg" 
                    fileInput={false} 
                    onClick={async () => {
                        await handleLogout();
                        navigate('/login');
                    }} 
                />
            </div>
        </header>
    );
}