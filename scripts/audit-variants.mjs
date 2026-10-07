import fs from 'node:fs';
import {FABRIC_GROUPS,matchVariantName} from '../src/data/customizerData.js';
import {MODEL_VARIANTS} from '../src/data/modelVariants.js';
const dir=new URL('../public/assets/models/',import.meta.url);
for(const name of fs.readdirSync(dir)){
 if(!name.endsWith('.glb')||name==='avatar_base.glb')continue;
 const b=fs.readFileSync(new URL(name,dir));const j=JSON.parse(b.subarray(20,20+b.readUInt32LE(12)));
 const variants=MODEL_VARIANTS[name];
 const groups=name.startsWith('suelto')||name==='tirantes.glb'||name==='bufanda.glb'?FABRIC_GROUPS:FABRIC_GROUPS.filter(g=>g.isStretch);
 const colors=groups.flatMap(g=>g.fabrics.filter(f=>name!=='bufanda.glb'||!f.noScarf).flatMap(f=>f.colors));
 console.log(name, colors.filter(c=>!matchVariantName(c.id,variants)).map(c=>c.id));
}
