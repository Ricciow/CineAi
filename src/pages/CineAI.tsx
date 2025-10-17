import React, { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/CineAI.css';
import '../styles/components/projetos/CineAIHeader.css';
import '../styles/components/projetos/CineAIFooter.css';
import dev1 from '../assets/dev1.jpg';
import dev2 from '../assets/dev2.jpg';
import dev3 from '../assets/dev3.jpg';

const CineAI: FC = () => {
  const navigate = useNavigate();

  const handleAccessSystem = (): void => {
    navigate('/projetos/vingadores');
  };

  return React.createElement(
    'div',
    { className: 'cineai-container' },

    // Navbar
    React.createElement(
      'header',
      { className: 'cineai-navbar' },
      React.createElement('h1', { className: 'logo' }, 'CineAI'),
      React.createElement(
        'nav',
        null,
        React.createElement('a', { href: '#demo' }, 'Demonstração'),
        React.createElement('a', { href: '#plans' }, 'Planos'),
        React.createElement('a', { href: '#about' }, 'Sobre'),
        React.createElement('a', { href: '#devs' }, 'Desenvolvedores')
      ),
      React.createElement(
        'div',
        { className: 'nav-buttons' },
        React.createElement('button', { className: 'login-btn' }, 'Login'),
        React.createElement(
          'button',
          { className: 'signup-btn' },
          'Inscreva-se'
        )
      )
    ),

    // Hero Section
    React.createElement(
      'section',
      { className: 'cineai-hero' },
      React.createElement(
        'h2',
        null,
        'Transforme Ideias em ',
        React.createElement('span', null, 'Obras Cinematográficas'),
        ' com IA'
      ),
      React.createElement(
        'p',
        null,
        'Nossa plataforma utiliza inteligência artificial de ponta para auxiliar em todo o processo criativo, desde o roteiro até a geração de vídeo, otimizando seu tempo e expandindo suas possibilidades.'
      ),
      React.createElement(
        'div',
        { className: 'hero-buttons' },
        React.createElement(
          'button',
          {
            className: 'primary-btn',
            onClick: handleAccessSystem, // 👈 redirecionamento TS-safe
          },
          'Acessar o Sistema'
        ),
        React.createElement(
          'button',
          { className: 'secondary-btn' },
          'Ver Demonstração'
        )
      )
    ),

    // Video Demonstration
    React.createElement(
      'section',
      { id: 'demo', className: 'cineai-demo' },
      React.createElement('h3', null, 'Veja a Mágica Acontecer'),
      React.createElement(
        'p',
        null,
        'Descubra como nossa ferramenta foi usada para criar algo incrível.'
      ),
      React.createElement(
        'div',
        { className: 'video-demo' },
        React.createElement(
          'div',
          { className: 'video-placeholder' },
          'Demonstração em Vídeo'
        )
      )
    ),

    // Plans
    React.createElement(
      'section',
      { id: 'plans', className: 'cineai-plans' },
      React.createElement('h3', null, 'Planos Flexíveis para Cada Criador'),
      React.createElement(
        'div',
        { className: 'plans-grid' },

        // Beginner Plan
        React.createElement(
          'div',
          { className: 'plan-card' },
          React.createElement('h4', null, 'Iniciante'),
          React.createElement('p', { className: 'price' }, 'Grátis'),
          React.createElement(
            'ul',
            null,
            React.createElement('li', null, '1 Projeto'),
            React.createElement('li', null, 'Geração de Roteiro Básica'),
            React.createElement('li', null, '10 Gerações de Imagem/mês')
          ),
          React.createElement(
            'button',
            { className: 'plan-btn' },
            'Comece Agora'
          )
        ),

        // Pro Plan
        React.createElement(
          'div',
          { className: 'plan-card' },
          React.createElement(
            'h4',
            null,
            'Pro ',
            React.createElement('span', { className: 'badge' }, 'Mais Popular')
          ),
          React.createElement('p', { className: 'price' }, 'R$ 99/mês'),
          React.createElement(
            'ul',
            null,
            React.createElement('li', null, 'Projetos Ilimitados'),
            React.createElement('li', null, 'Geração de Roteiro Avançada'),
            React.createElement('li', null, '500 Gerações de Imagem/mês'),
            React.createElement('li', null, '20 Gerações de Vídeo/mês')
          ),
          React.createElement(
            'button',
            { className: 'plan-btn' },
            'Ir para Pagamento'
          )
        ),

        // Business Plan
        React.createElement(
          'div',
          { className: 'plan-card' },
          React.createElement('h4', null, 'Empresarial'),
          React.createElement('p', { className: 'price' }, 'Customizado'),
          React.createElement(
            'ul',
            null,
            React.createElement('li', null, 'Tudo do plano Pro'),
            React.createElement('li', null, 'Modelos de IA Dedicados'),
            React.createElement('li', null, 'Suporte Prioritário 24/7')
          ),
          React.createElement(
            'button',
            { className: 'plan-btn' },
            'Entre em Contato'
          )
        )
      )
    ),

    // Our Mission
    React.createElement(
      'section',
      { id: 'about', className: 'cineai-mission' },
      React.createElement('h3', null, 'Nossa Missão'),
      React.createElement(
        'p',
        null,
        'A CineAI nasceu da paixão pelo cinema e pela tecnologia. Acreditamos que a inteligência artificial pode ser uma poderosa aliada para contar histórias, quebrando barreiras criativas e democratizando a produção audiovisual.'
      )
    ),

    // Developers
    React.createElement(
      'section',
      { id: 'devs', className: 'cineai-devs' },
      React.createElement('h3', null, 'Conheça os Desenvolvedores'),
      React.createElement(
        'div',
        { className: 'devs-grid' },
        React.createElement(
          'div',
          { className: 'dev-card' },
          React.createElement('img', { src: dev1, alt: 'Dev1' }),
          React.createElement('h4', null, 'Dev1'),
          React.createElement('p', null, 'Caroline Atolini')
        ),
        React.createElement(
          'div',
          { className: 'dev-card' },
          React.createElement('img', { src: dev2, alt: 'Dev2' }),
          React.createElement('h4', null, 'Dev2'),
          React.createElement('p', null, 'Dylan')
        ),
        React.createElement(
          'div',
          { className: 'dev-card' },
          React.createElement('img', { src: dev3, alt: 'Dev3' }),
          React.createElement('h4', null, 'Dev3'),
          React.createElement('p', null, 'Fernando')
        )
      )
    ),

    // Newsletter
    React.createElement(
      'section',
      { className: 'cineai-newsletter' },
      React.createElement('h3', null, 'Obtenha Vantagens Exclusivas'),
      React.createElement(
        'p',
        null,
        'Inscreva-se na nossa newsletter para receber atualizações e novidades.'
      ),
      React.createElement(
        'div',
        { className: 'newsletter-form' },
        React.createElement('input', {
          type: 'email',
          placeholder: 'Seu melhor e-mail',
        }),
        React.createElement('button', null, 'Inscrever-se')
      )
    ),

    // Footer
    React.createElement(
      'footer',
      { className: 'cineai-footer' },
      React.createElement(
        'p',
        null,
        '© 2024 CineAI. Todos os direitos reservados.'
      ),
      React.createElement(
        'div',
        { className: 'social-icons' },
        React.createElement('i', { className: 'fa fa-twitter' }),
        React.createElement('i', { className: 'fa fa-instagram' }),
        React.createElement('i', { className: 'fa fa-github' })
      )
    )
  );
};

export default CineAI;
