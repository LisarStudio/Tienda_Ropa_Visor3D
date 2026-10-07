import React, { useId } from 'react';
import { ArrowUpRight } from 'lucide-react';
import './StyleShortcuts.css';

const shortcuts = [
  { id: 'personaliza-tu-prenda', label: 'Personaliza tu prenda', note: 'Tu diseño. Tus reglas.', tag: 'HECHO POR TI', tone: 'rose', icon: 'bow' },
  { id: 'catalogo-section', label: 'Catálogo', note: 'Encuentra tu próximo crush.', tag: 'EXPLORA', tone: 'lavender', icon: 'bag' },
  { id: 'best-sellers', label: 'Best sellers', note: 'Los favoritos de todas.', tag: 'MUCHO AMOR', tone: 'peach', icon: 'heart' },
  { id: 'new-in', label: 'New in', note: 'Un nuevo flechazo te espera.', tag: 'RECIÉN LLEGADO', tone: 'butter', icon: 'star' },
];

function Charm({ icon }) {
  const id = useId().replace(/:/g, '');
  const shapes = {
    bow: <><path d="M59 52C41 29 18 25 17 46c-1 21 16 26 40 17L38 94l18-5 7-19 12 24 17 3-22-33c22 8 39 2 36-18-3-20-24-15-39 6Z"/><ellipse cx="63" cy="57" rx="10" ry="13"/></>,
    bag: <><path d="M29 42h65l7 56c-15 12-58 12-79 0Z"/><path d="M44 45V32c0-23 35-23 35 0v13" fill="none" strokeWidth="9" strokeLinecap="round"/><path d="M43 69c10 9 23 9 34 0" fill="none" strokeWidth="4" strokeLinecap="round"/></>,
    heart: <path d="M62 101C40 84 16 67 16 44c0-27 32-34 46-12 16-22 47-15 47 12 0 23-24 40-47 57Z"/>,
    star: <path d="m62 10 16 31 34 6-24 25 4 35-30-15-31 15 5-35L12 47l35-6Z" strokeLinejoin="round"/>,
  };
  return <svg className="shortcut-charm" viewBox="0 0 124 124" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={id+'-body'} x1="0" y1="0" x2="85%" y2="100%">
        <stop offset="0" stopColor="var(--charm-light)"/><stop offset=".42" stopColor="var(--charm-mid)"/><stop offset="1" stopColor="var(--charm-dark)"/>
      </linearGradient>
      <linearGradient id={id+'-edge'} x2="0" y2="100%"><stop stopColor="#fff" stopOpacity=".95"/><stop offset="1" stopColor="var(--charm-dark)"/></linearGradient>
      <radialGradient id={id+'-shine'}><stop stopColor="#fff" stopOpacity=".85"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></radialGradient>
    </defs>
    <g transform="translate(0 5)" fill="var(--charm-dark)" stroke="var(--charm-dark)" strokeWidth="3">{shapes[icon]}</g>
    <g fill={'url(#'+id+'-body)'} stroke={'url(#'+id+'-edge)'} strokeWidth="2">{shapes[icon]}</g>
    <ellipse cx="43" cy="40" rx="23" ry="15" fill={'url(#'+id+'-shine)'} transform="rotate(-35 43 40)"/>
  </svg>;
}

export function StyleShortcuts() {
  return <nav className="container style-shortcuts" aria-label="Explora Ninna Wear">
    {shortcuts.map(item => <a key={item.id} href={'#'+item.id} className={'style-shortcut style-shortcut--'+item.tone}>
      <span className="shortcut-tag">{item.tag}</span>
      <div className="shortcut-art" aria-hidden="true">
        <span className="shortcut-orbit"/><Charm icon={item.icon}/><span className="shortcut-twinkle">✦</span>
      </div>
      <div className="shortcut-caption">
        <div><h2>{item.label}</h2><p>{item.note}</p></div>
        <span className="shortcut-arrow"><ArrowUpRight size={19} strokeWidth={1.6}/></span>
      </div>
    </a>)}
  </nav>;
}
