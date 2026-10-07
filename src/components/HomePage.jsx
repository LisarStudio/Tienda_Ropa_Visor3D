import React, { useMemo, useEffect, useState } from 'react';
import { Hero } from './Hero';
import { CustomizerSection } from './Customizer3D/CustomizerSection';
import { CategoryFilter } from './CategoryFilter';
import { ProductGrid } from './ProductGrid';
import { FAQSection } from './FAQSection';
import { clientData } from '../data/clientData';
import './HomePage.css';

export function HomePage({onSelectProduct, activeCategory='todos', onSelectCategory, searchQuery='', sortBy='featured', onSortChange, onAddToCart}) {
 const [page,setPage] = useState(()=>window.location.hash.slice(1)||'inicio');
 useEffect(()=>{
  const change=()=>{setPage(window.location.hash.slice(1)||'inicio');window.scrollTo({top:0,behavior:'instant'});};
  window.addEventListener('hashchange',change);
  return ()=>window.removeEventListener('hashchange',change);
 },[]);
 const catalogPage = ['catalogo-section','catalogo','best-sellers','new-in'].includes(page);
 const category = ['best-sellers','new-in'].includes(page) ? page : activeCategory;
 const products=useMemo(()=>{
  let list=clientData.products.filter(p=>category==='todos'||category==='all'||p.category===category||p.categorySlugs?.includes(category));
  const query=searchQuery.trim().toLowerCase();
  if(query)list=list.filter(p=>[p.name,p.description,p.category].join(' ').toLowerCase().includes(query));
  if(sortBy==='price-low')list.sort((a,b)=>a.price-b.price);
  if(sortBy==='price-high')list.sort((a,b)=>b.price-a.price);
  if(sortBy==='name')list.sort((a,b)=>a.name.localeCompare(b.name));
  return list;
 },[category,searchQuery,sortBy]);
 const customize=()=>{window.location.hash='personaliza-tu-prenda';};
 if (page === 'personaliza-tu-prenda' || page === 'personaliza/strapless') {
  return <main><CustomizerSection onAddToCart={onAddToCart}/></main>;
 }
 if(page==='faq')return <main><FAQSection/></main>;
 if(catalogPage)return <main className="container ready-to-wear-section"><h1>{page==='best-sellers'?'Best sellers':page==='new-in'?'New in':'Catálogo'}</h1><CategoryFilter categories={clientData.categories} activeCategory={category} onSelectCategory={cat=>{onSelectCategory(cat);window.location.hash='catalogo-section';}} sortBy={sortBy} onSortChange={onSortChange} totalItems={products.length}/><ProductGrid products={products} category={category} onSelectProduct={onSelectProduct} onCustomizeClick={customize}/></main>;
 return <main className="brand-homepage-container"><Hero onCustomizeClick={()=>{window.location.hash='personaliza-tu-prenda';}} onExploreClick={()=>{window.location.hash='catalogo-section';}}/><section className="container home-category-links">{[['personaliza-tu-prenda','Personaliza tu prenda'],['catalogo-section','Catálogo'],['best-sellers','Best sellers'],['new-in','New in']].map(([id,label])=><a key={id} href={'#'+id}>{label} →</a>)}</section></main>;
}
