import { NavLink } from "react-router-dom";
import React from 'react'; // Necessário para usar React.Fragment

export default function Header({ pathnames }: { pathnames: string[] }) {
    return (
        <header className="header">
            <h1 className="header_title">CineAI</h1>
            <i className="fi fi-rr-angle-small-right header_arrow"></i>
            <nav className="header_nav">
                {pathnames.map((name, index) => {
                    // Link para o segmento atual
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = (index === pathnames.length - 1);

                    return (
                        <React.Fragment key={routeTo}>
                            <NavLink
                                end
                                to={routeTo}
                                className={({ isActive }) => isActive ? "header_link active" : "header_link"}
                            >
                                {name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </NavLink>
                            {!isLast && <p>/</p>}
                        </React.Fragment>
                    );
                })}
            </nav>
        </header>
    );
}