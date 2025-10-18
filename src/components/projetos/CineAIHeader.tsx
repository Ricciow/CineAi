import { useLocation } from "react-router-dom";
import React from 'react';
import Button from "../Buttons/Button";

export default function CineAIHeader() {
    // URL atual
    const location = useLocation();

    // Divide a URL
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <header className="header">
            <h1 className="header_title">CineAI</h1>
            <nav className="header_nav">
                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
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
        </header>
    );
}
