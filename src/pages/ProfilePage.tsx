import { useAuth } from "../components/Auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import Button from "../components/Buttons/Button";
import GenericHeader from "../components/projetos/GenericHeader";
import "../styles/pages/AuthPages.css"; // Reusing some auth styles for simplicity, or I can create ProfilePage.css

export default function ProfilePage() {
    const { username, userEmail, handleLogout } = useAuth();
    const navigate = useNavigate();

    async function onLogout() {
        await handleLogout();
        navigate('/login');
    }

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/projetos');
        }
    };

    return (
        <div className="layout">
            <GenericHeader />
            <main className="layout_content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 'var(--xl)' }}>
                <div className="auth_card" style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
                    <div className="profile_avatar_large" style={{ 
                        width: '100px', 
                        height: '100px', 
                        borderRadius: '50%', 
                        backgroundColor: 'var(--midway-color)', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        margin: '0 auto var(--md) auto',
                        fontSize: '3rem',
                        color: 'var(--text-white)'
                    }}>
                        <i className="fi fi-rr-user"></i>
                    </div>
                    
                    <h1 style={{ color: 'var(--text-white)', marginBottom: 'var(--xs)' }}>{username}</h1>
                    <p style={{ color: 'var(--text-light-gray)', marginBottom: 'var(--xl)' }}>{userEmail}</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--md)' }}>
                        <Button 
                            text="Voltar" 
                            onClick={handleBack} 
                            style="projeto_button" 
                        />
                        <Button 
                            text="Sair da Conta" 
                            onClick={onLogout} 
                            style="delete_button_bg" 
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
