from pathlib import Path
from PIL import Image,ImageChops,ImageStat
import json
rows=[]
for part in ['housing','grooves','base','stitch','shin3','shin4','scroll','wrap','hair','passage','strap','knot']:
 root=Path('evidence/selection')
 images=[Image.open(root/f'{part}-{state}.png').convert('RGB') for state in ['before','selected','restored']]
 # Exclude HTML labels and camera controls at the top of the canvas rectangle.
 a,b,c=[im.crop((0,100,im.width,im.height)) for im in images]
 difference=ImageChops.difference(a,b);restore=ImageChops.difference(a,c)
 changed=sum(max(v)>10 for v in difference.get_flattened_data());error=sum(ImageStat.Stat(restore).mean)/3
 row={'part':part,'changed_model_pixels':changed,'restoration_mean_error':error,'pass':changed>25 and error<.03};rows.append(row)
 print(row)
Path('evidence/selection-pixels.json').write_text(json.dumps(rows,indent=2)+'\n')
assert all(r['pass'] for r in rows)
