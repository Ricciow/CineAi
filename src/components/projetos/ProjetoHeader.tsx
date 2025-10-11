import { NavLink, useLocation } from "react-router-dom";
import React from 'react'; // Necessário para usar React.Fragment
import Button from "../Buttons/Button";

export default function ProjetoHeader() {
    // URL atual
    const location = useLocation();

    // Divide a URL
    const pathnames = location.pathname.split('/').filter((x) => x);
    

    return (
        <header className="header">
            <h1 className="header_title">CineAI</h1>
            <i className="fi fi-rr-angle-small-right header_arrow"></i>
            <nav className="header_nav">
                {pathnames.map((name_unformatted, index) => {
                    // Link para o segmento atual
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = (index === pathnames.length - 1);
                    
                    const name = name_unformatted.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

                    return (
                        <React.Fragment>
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
        </header>
    );
}