import assert from 'node:assert/strict';
import { createServer } from 'vite';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
const server=await createServer({server:{middlewareMode:true},appType:'custom'});
try {
 global.window={location:{hash:'#inicio'}};
 const {HomePage}=await server.ssrLoadModule('/src/components/HomePage.jsx');
 const props={onSelectProduct(){},onSelectCategory(){},onSortChange(){},onAddToCart(){}};
 for(const page of ['inicio','catalogo-section','best-sellers','new-in','faq','personaliza-tu-prenda','personaliza/strapless']) {
  window.location.hash='#'+page;
  const html=renderToStaticMarkup(React.createElement(HomePage,props));
  assert.ok(html.length>100,page);
  assert.equal(html.includes('customizer-viewer-container'),page==='personaliza/strapless',page+' isolates the viewer');
  if(page==='personaliza/strapless'){assert.ok(html.includes('Regular'));assert.ok(html.includes('Blanco'));assert.ok(!html.includes('Selecciona el tipo de calce'));}
  assert.ok(!html.includes('Daniela Atelier'));
  console.log('PASS',page);
 }
}finally{await server.close();}
