import { Link, useLocation, useNavigate } from "react-router-dom";
import React from 'react';
import Button from "../Buttons/Button";
import LogoutButton from "../Buttons/LogoutButton";

export default function GenericHeader() {
    const location = useLocation();
    const navigate = useNavigate();

    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <header className="header">
            <div className="header_left">
                <Link to="/" className="cine_ai_title">CineAI</Link>
            </div>
            
            <i className="fi fi-rr-angle-small-right header_arrow header_desktop_only"></i>
            
            <nav className="header_nav header_desktop_only">
                {pathnames.map((name_unformatted, index) => {
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

            <div className="header_right">
                <LogoutButton />
            </div>
        </header>
    );
}
