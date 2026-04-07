import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import "../styles/pages/CineAI.css";
import "../styles/components/projetos/CineAIHeader.css";
import "../styles/components/projetos/CineAIFooter.css";
import dev1 from "../assets/dev1.jpg";
import dev2 from "../assets/dev2.jpg";
import dev3 from "../assets/dev3.jpg";
import AuthentifiedComponent from "../components/Auth/AuthentifiedComponent";
import { BackendUrl } from "../constants/env";

export default function CineAI() {
    const [email, setEmail] = useState("");
    const newsletterRef = useRef<HTMLElement>(null);

    const trackClick = async (elementId: string, userEmail?: string) => {
        console.log(`Tracking click: ${elementId} ${userEmail ? `with email: ${userEmail}` : ''}`);

        // Envio para o Backend em tempo real
        try {
            await fetch(`${BackendUrl}/analytics/track-click`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    elementId, 
                    variant: "A",
                    email: userEmail || null
                })
            });
        } catch (err) {
            console.error("Falha ao enviar rastreio:", err);
        }
    };

    const scrollToNewsletter = (id: string) => {
        trackClick(id);
        newsletterRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleEmailSubmit = (id: string) => {
        if (!email) return;
        trackClick(id, email);
        alert("Obrigado pelo interesse! Em breve entraremos em contato.");
        setEmail("");
    };

    return (
        <div className="cineai-container">
            <header className="cineai-navbar">
                <h1 className="cine_ai_title">CineAI</h1>
                <nav>
                    <a href="#demo">Demonstração</a>
                    <a href="#plans">Planos</a>
                    <a href="#about">Sobre</a>
                    <a href="#devs">Desenvolvedores</a>
                </nav>
                <div className="nav-buttons">
                    <AuthentifiedComponent unauthorized={<Link to="/login" className="login-btn" onClick={() => trackClick('nav-login')}>Login</Link>}> 
                        <Link to="/projetos" className="login-btn" onClick={() => trackClick('nav-entrar')}>Entrar</Link>
                    </AuthentifiedComponent>
                    <button className="signup-btn" onClick={() => scrollToNewsletter('nav-signup-scroll')}>Tenho Interesse</button>
                </div>
            </header>

            <section className="cineai-hero">
                <h2>
                    Transforme Ideias em <span>Obras Cinematográficas</span> com
                    IA
                </h2>
                <p>
                    Nossa plataforma utiliza inteligência artificial de ponta
                    para auxiliar em todo o processo criativo, desde o roteiro
                    até a geração de vídeo, otimizando seu tempo e expandindo
                    suas possibilidades.
                </p>
                <div className="hero-buttons">
                    <button className="primary-btn" onClick={() => scrollToNewsletter('hero-acessar-scroll')}>
                        Acessar o Sistema
                    </button>
                    <button className="secondary-btn" onClick={() => scrollToNewsletter('hero-demo-scroll')}>Ver Demonstração</button>
                </div>
            </section>

            {/* Plans */}
            <section id="plans" className="cineai-plans">
                <h3>Planos Flexíveis para Cada Criador</h3>
                <div className="plans-grid">
                    <div className="plan-card">
                        <h4>Iniciante</h4>
                        <p className="price">Grátis</p>
                        <ul>
                            <li>1 Projeto</li>
                            <li>Geração de Roteiro Básica</li>
                            <li>10 Gerações de Imagem/mês</li>
                        </ul>
                        <button className="plan-btn" onClick={() => scrollToNewsletter('plan-beginner-scroll')}>Tenho Interesse</button>
                    </div>

                    <div className="plan-card">
                        <h4>Pro <span className="badge">Mais Popular</span></h4>
                        <p className="price">R$ 99/mês</p>
                        <ul>
                            <li>Projetos Ilimitados</li>
                            <li>Geração de Roteiro Avançada</li>
                            <li>500 Gerações de Imagem/mês</li>
                            <li>20 Gerações de Vídeo/mês</li>
                        </ul>
                        <button className="plan-btn" onClick={() => scrollToNewsletter('plan-pro-scroll')}>Tenho Interesse</button>
                    </div>

                    <div className="plan-card">
                        <h4>Empresarial</h4>
                        <p className="price">Customizado</p>
                        <ul>
                            <li>Tudo do plano Pro</li>
                            <li>Modelos de IA Dedicados</li>
                            <li>Suporte Prioritário 24/7</li>
                        </ul>
                        <button className="plan-btn" onClick={() => scrollToNewsletter('plan-business-scroll')}>Entre em Contato</button>
                    </div>
                </div>
            </section>

            <section id="about" className="cineai-mission">
                <h3>Nossa Missão</h3>
                <p>
                    A CineAI nasceu da paixão pelo cinema e pela tecnologia.
                    Acreditamos que a inteligência artificial pode ser uma
                    poderosa aliada para contar histórias, quebrando barreiras
                    criativas e democratizando a produção audiovisual.
                </p>
            </section>

            <section id="devs" className="cineai-devs">
                <h3>Conheça os Desenvolvedores</h3>
                <div className="devs-grid">
                    <div className="dev-card">
                        <img src={dev1} alt="Dev1" />
                        <h4>Dev1</h4>
                        <p>Caroline Atolini</p>
                    </div>
                    <div className="dev-card">
                        <img src={dev2} alt="Dev2" />
                        <h4>Dev2</h4>
                        <p>Dylan</p>
                    </div>
                    <div className="dev-card">
                        <img src={dev3} alt="Dev3" />
                        <h4>Dev3</h4>
                        <p>Fernando</p>
                    </div>
                </div>
            </section>

            <section ref={newsletterRef} className="cineai-newsletter">
                <h3>Garanta seu Acesso Antecipado</h3>
                <p>
                    Deixe seu e-mail para ser avisado assim que abrirmos novas vagas no sistema.
                </p>
                <div className="newsletter-form">
                    <input 
                        type="email" 
                        placeholder="Seu melhor e-mail" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={() => handleEmailSubmit('newsletter-submit')}>Garantir Acesso</button>
                </div>
            </section>

            <footer className="cineai-footer">
                <p>© 2024 CineAI. Todos os direitos reservados.</p>
                <div className="social-icons">
                    <i className="fa fa-twitter" />
                    <i className="fa fa-instagram" />
                    <i className="fa fa-github" />
                </div>
            </footer>
        </div>
    );
}
