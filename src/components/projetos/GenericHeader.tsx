import { Link, useLocation } from "react-router-dom";
import React from 'react';
import Button from "../Buttons/Button";

export default function GenericHeader() {
    const location = useLocation();

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
                <Link to="/perfil" className="profile_icon_link" style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--midway-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-white)',
                    textDecoration: 'none',
                    fontSize: '1.2rem',
                    transition: 'background-color 0.2s'
                }}>
                    <i className="fi fi-rr-user"></i>
                </Link>
            </div>
        </header>
    );
}
