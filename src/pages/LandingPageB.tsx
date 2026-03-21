import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CineAiLogo from "../assets/CineAi.png";

const LandingPageB: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const emailSectionRef = useRef<HTMLDivElement>(null);

  const trackClick = async (elementId: string, userEmail?: string) => {
    console.log(`Tracking click: ${elementId} ${userEmail ? `with email: ${userEmail}` : ''}`);
    try {
        await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'}/analytics/track-click`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                elementId, 
                variant: "B",
                email: userEmail || null
            })
        });
    } catch (err) {
        console.error("Falha ao enviar rastreio:", err);
    }
  };

  const scrollToEmail = (id: string) => {
    trackClick(id);
    emailSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
        alert("Por favor, insira um e-mail válido.");
        return;
    }
    trackClick("footer-email-submit", email);
    alert("Inscrição realizada com sucesso! Avisaremos você em breve.");
    setEmail("");
  };

  const handleLogin = (e: React.MouseEvent) => {
    e.preventDefault();
    trackClick("nav-login");
    navigate("/login");
  };

  useEffect(() => {
    document.title = "CineAI - O Futuro do Cinema";
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="bg-surface text-on-surface font-body overflow-x-hidden min-h-screen">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#0c0e12]/80 backdrop-blur-xl shadow-[0_24px_48px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <img src={CineAiLogo} alt="CineAI" className="w-10 h-10 object-contain" />
              <span className="text-2xl font-headline font-bold tracking-tight text-white">CineAI</span>
            </div>
            
            <div className="hidden md:flex items-center gap-10">
              <a href="#recursos" className="text-sm font-medium text-on-surface-variant hover:text-blue-500 transition-colors">Recursos</a>
              <a href="#como-funciona" className="text-sm font-medium text-on-surface-variant hover:text-blue-500 transition-colors">Como funciona</a>
              <a href="#precos" className="text-sm font-medium text-on-surface-variant hover:text-blue-500 transition-colors">Preços</a>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={handleLogin} className="px-5 py-2.5 text-sm font-semibold text-white hover:text-blue-500 transition-colors">Entrar</button>
              <button 
                onClick={() => scrollToEmail("nav-cta-scroll")}
                className="px-6 py-2.5 cinematic-gradient text-white font-bold rounded-full text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(37,99,235,0.3)]"
              >
                Começar agora
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-900/20 blur-[100px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-variant border border-blue-900/50 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-xs font-bold tracking-wider text-blue-400 uppercase">IA Generativa de Próxima Geração</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold text-white mb-8 leading-[1.1] tracking-tighter">
            Transforme ideias em <br/>
            <span className="text-transparent bg-clip-text cinematic-gradient text-glow inline-block">Roteiros Brilhantes</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-on-surface-variant mb-12 leading-relaxed">
            A ferramenta definitiva para roteiristas e cineastas. Use o poder da IA para criar personagens profundos, diálogos cativantes e estruturas narrativas perfeitas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
                onClick={() => scrollToEmail("hero-cta-scroll")}
                className="group relative px-10 py-5 cinematic-gradient text-white font-bold rounded-2xl text-lg hover:scale-105 transition-all shadow-2xl"
            >
              Criar meu primeiro roteiro
            </button>
            <button 
                onClick={() => scrollToEmail("hero-demo-scroll")}
                className="px-10 py-5 bg-surface-variant border border-outline-variant text-white font-bold rounded-2xl text-lg hover:bg-outline-variant transition-colors"
            >
              Ver demonstração
            </button>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section id="recursos" className="py-32 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-surface border border-outline-variant hover:border-blue-500/50 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-blue-500 text-3xl">auto_awesome</span>
              </div>
              <h3 className="text-2xl font-headline font-bold text-white mb-4">Escrita Colaborativa</h3>
              <p className="text-on-surface-variant leading-relaxed">Sugestões de diálogos e cenas em tempo real que mantêm o tom do seu roteiro.</p>
            </div>
            <div className="p-8 rounded-3xl bg-surface border border-outline-variant hover:border-blue-500/50 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-blue-500 text-3xl">psychology</span>
              </div>
              <h3 className="text-2xl font-headline font-bold text-white mb-4">Análise de Arco</h3>
              <p className="text-on-surface-variant leading-relaxed">Mapeie a jornada do herói e identifique furos na trama antes de filmar.</p>
            </div>
            <div className="p-8 rounded-3xl bg-surface border border-outline-variant hover:border-blue-500/50 transition-colors group">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-secondary text-3xl">movie_edit</span>
              </div>
              <h3 className="text-2xl font-headline font-bold text-white mb-4">Formatação Automática</h3>
              <p className="text-on-surface-variant leading-relaxed">Esqueça as regras técnicas. Foque na história enquanto nós cuidamos do padrão industry-standard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Email Section (Newsletter style) */}
      <section ref={emailSectionRef} className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full"></div>
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-white mb-6">Pronto para o próximo nível?</h2>
          <p className="text-on-surface-variant text-lg mb-10">Junte-se à lista de espera e seja um dos primeiros a experimentar o futuro do cinema.</p>
          
          <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 p-2 rounded-3xl bg-surface-variant border border-outline-variant focus-within:border-blue-500 transition-all">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="flex-1 bg-transparent border-none focus:ring-0 text-white px-6 py-4 text-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="px-10 py-4 cinematic-gradient text-white font-bold rounded-2xl text-lg hover:scale-105 transition-transform shadow-xl">
              Garantir Acesso Antecipado
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-3">
              <img src={CineAiLogo} alt="CineAI" className="w-10 h-10 object-contain" />
              <span className="text-2xl font-headline font-bold text-white tracking-tight">CineAI</span>
            </div>
            <p className="text-on-surface-variant text-sm">© 2026 CineAI. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
      
      <style>{`
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        /* NEW DEEP BLUE GRADIENT */
        .cinematic-gradient { background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); }
        .text-glow { text-shadow: 0 0 20px rgba(37, 99, 235, 0.4); }
        .bg-clip-text { -webkit-background-clip: text; background-clip: text; }
      `}</style>
    </div>
  );
};

export default LandingPageB;
