import json, struct, io
from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[1]
b=(root/'public/assets/models/suelto_regular.glb').read_bytes()
n=struct.unpack_from('<I',b,12)[0]
j=json.loads(b[20:20+n]); binary=b[28+n:]
out=root/'public/assets/swatches'; out.mkdir(exist_ok=True)
for i,v in enumerate(j['extensions']['KHR_materials_variants']['variants']):
 mapping=next(m for m in j['meshes'][0]['primitives'][0]['extensions']['KHR_materials_variants']['mappings'] if i in m['variants'])
 pbr=j['materials'][mapping['material']]['pbrMetallicRoughness']
 tex=pbr.get('baseColorTexture')
 if not tex: continue
 texture=j['textures'][tex['index']]
 img=j['images'][texture.get('source',texture.get('extensions',{}).get('EXT_texture_webp',{}).get('source'))]
 view=j['bufferViews'][img['bufferView']]; start=view.get('byteOffset',0)
 im=Image.open(io.BytesIO(binary[start:start+view['byteLength']])).convert('RGB')
 im.thumbnail((160,160))
 name=v['name'].lower().replace('mezclila','mezclilla')
 im.save(out/(name+'.png'))
print('Extracted',len(list(out.glob('*.png'))),'fabric images')
