import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {FABRIC_GROUPS,getModelFileName,matchVariantName} from '../src/data/customizerData.js';
import {MODEL_VARIANTS} from '../src/data/modelVariants.js';
const load=name=>{const b=fs.readFileSync(new URL('../public/assets/models/'+name,import.meta.url));return JSON.parse(b.subarray(20,20+b.readUInt32LE(12)));};
test('all 32 crop materials match the reference export in the same order',()=>{
 const crop=load('asimetrico_crop.glb'), reference=load('regular.glb');
 assert.equal(crop.materials.length,32);
 crop.materials.forEach((material,i)=>assert.deepEqual(material.pbrMetallicRoughness,reference.materials[i].pbrMetallicRoughness));
 const variants=MODEL_VARIANTS['asimetrico_crop.glb'];
 for(const color of FABRIC_GROUPS.filter(g=>g.isStretch).flatMap(g=>g.fabrics.flatMap(f=>f.colors)))assert.ok(matchVariantName(color.id,variants),color.id);
 assert.equal(matchVariantName('blanco',variants),'Default Colorway');
 assert.equal(matchVariantName('rayas rojo',variants),'Colorway 23');
});
test('candy selects red stripes, never yellow, and unknown colors do not guess',()=>{
 assert.equal(matchVariantName('rayas rojo',MODEL_VARIANTS['suelto_asimetrico_largo.glb']),'rays rojo');
 assert.equal(matchVariantName('rayas rojo',['rayas amarillo']),null);
 assert.equal(matchVariantName('missing',['blanco','negro']),null);
});
test('every selectable match has material mappings for each primitive',()=>{
 for(const [name,variants] of Object.entries(MODEL_VARIANTS)){
 const json=load(name);
 for(const color of FABRIC_GROUPS.flatMap(g=>g.fabrics.flatMap(f=>f.colors))){
 const match=matchVariantName(color.id,variants);if(!match)continue;
 const index=variants.indexOf(match);
 for(const mesh of json.meshes)for(const primitive of mesh.primitives){
 const mapping=primitive.extensions.KHR_materials_variants.mappings.find(m=>m.variants.includes(index));
 assert.ok(mapping,name+' '+color.id);assert.ok(json.materials[mapping.material]);
 }
 }
 }
});
test('fabric families, merged variants and real texture previews',()=>{
 const fabrics=FABRIC_GROUPS.flatMap(g=>g.fabrics);
 assert.equal(fabrics.length,12);
 assert.equal(fabrics.find(f=>f.id==='mesh').colors.length,7);
 assert.equal(fabrics.find(f=>f.id==='rib rayas').colors.length,5);
 assert.equal(fabrics.find(f=>f.id==='bordado').colors.length,4);
 for(const color of fabrics.flatMap(f=>f.colors).filter(c=>c.pattern||c.sparkle||c.sheen))assert.ok(fs.existsSync(new URL('../public/'+decodeURIComponent(color.swatch),import.meta.url)),color.id);
 for(const fit of ['pegado','suelto'])for(const style of ['regular','asimetrico','fruncido','asimetrico_fruncido'])for(const length of ['crop','regular','largo'])assert.ok(MODEL_VARIANTS[getModelFileName(fit,style,length)]);
});
