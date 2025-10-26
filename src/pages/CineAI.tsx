import { Link } from "react-router-dom";
import "../styles/pages/CineAI.css";
import "../styles/components/projetos/CineAIHeader.css";
import "../styles/components/projetos/CineAIFooter.css";
import dev1 from "../assets/dev1.jpg";
import dev2 from "../assets/dev2.jpg";
import dev3 from "../assets/dev3.jpg";

export default function CineAI() {
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
                    <button className="login-btn">Login</button>
                    <button className="signup-btn">Inscreva-se</button>
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
                    <Link className="primary-btn" to="/projetos/vingadores">
                        Acessar o Sistema
                    </Link>
                    <button className="secondary-btn">Ver Demonstração</button>
                </div>
            </section>

            <section id="demo" className="cineai-demo">
                <h3>Veja a Mágica Acontecer</h3>
                <p>
                    Descubra como nossa ferramenta foi usada para criar algo
                    incrível.
                </p>
                <div className="video-demo">
                    <div className="video-placeholder">
                        Demonstração em Vídeo
                    </div>
                </div>
            </section>

            {/* Plans */}
            <section id="plans" className="cineai-plans">
                <h3>Planos Flexíveis para Cada Criador</h3>
                <div className="plans-grid">
                    {/* Beginner Plan */}
                    <div className="plan-card">
                        <h4>Iniciante</h4>
                        <p className="price">Grátis</p>
                        <ul>
                            <li>1 Projeto</li>
                            <li>Geração de Roteiro Básica</li>
                            <li>10 Gerações de Imagem/mês</li>
                        </ul>
                        <button className="plan-btn">Comece Agora</button>
                    </div>

                    {/* Pro Plan */}
                    <div className="plan-card">
                        <h4>
                            Pro <span className="badge">Mais Popular</span>
                        </h4>
                        <p className="price">R$ 99/mês</p>
                        <ul>
                            <li>Projetos Ilimitados</li>
                            <li>Geração de Roteiro Avançada</li>
                            <li>500 Gerações de Imagem/mês</li>
                            <li>20 Gerações de Vídeo/mês</li>
                        </ul>
                        <button className="plan-btn">Ir para Pagamento</button>
                    </div>

                    {/* Business Plan */}
                    <div className="plan-card">
                        <h4>Empresarial</h4>
                        <p className="price">Customizado</p>
                        <ul>
                            <li>Tudo do plano Pro</li>
                            <li>Modelos de IA Dedicados</li>
                            <li>Suporte Prioritário 24/7</li>
                        </ul>
                        <button className="plan-btn">Entre em Contato</button>
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

            <section className="cineai-newsletter">
                <h3>Obtenha Vantagens Exclusivas</h3>
                <p>
                    Inscreva-se na nossa newsletter para receber atualizações e
                    novidades.
                </p>
                <div className="newsletter-form">
                    <input type="email" placeholder="Seu melhor e-mail" />
                    <button>Inscrever-se</button>
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
