from PIL import Image 
from array import *
def trtn(x):
    x = 255-x
    if(x < 16):
        return ' '
    elif(x < 32):
        return '`'
    elif(x < 48):
        return '.'
    elif(x < 64):
        return '-'
    elif(x < 80):
        return ':'
    elif(x < 96):
        return '|'
    elif(x < 112):
        return 'o'
    elif(x < 128):
        return 's'
    elif(x < 144):
        return 'y'
    elif(x < 160):
        return 'h'
    elif(x < 176):
        return 'd'
    elif(x < 192):
        return 'm'
    elif(x < 208):
        return 'N'
    elif(x < 224):
        return 'M'
    else:
        return '#'

imageSize = 100;
image_file = Image.open("test.png")
wpercent = (imageSize/float(image_file.size[0]))
hsize = int((float(image_file.size[1])*float(wpercent)))
image_rgb = image_file.resize((imageSize,hsize), Image.ANTIALIAS)
image_rgb = image_rgb.convert('RGB')
image_bnw = image_rgb.convert('L')

w, h = image_bnw.size

bnw_img = "["
rgb_img = "["
hax_img = "["
html = '<html><head><script src="http://www.deep.gallery/js/gsap/TweenMax.min.js"></script></head><body><style> div { position: relative; width:80vh; height:80vh;} div > span { position:absolute;width:1%;height:1%; font-size:100%; }</style><div>'
for y in range(h):
    bnw_img += '['
    rgb_img += '['
    hax_img += '['
    for x in range(w):
        bnw_img += '\''+trtn(image_bnw.getpixel((x,y)))+'\''
        r, g, b = image_rgb.getpixel((x,y))
        rgb_img += '['+str(r)+','+str(g)+','+str(b)+',\''+trtn(image_bnw.getpixel((x,y)))+'\']' 
        hax_img += '[\''+str('#%02x%02x%02x' % (r, g, b))+'\',\''+trtn(image_bnw.getpixel((x,y)))+'\']'
        html += '<span style="top:'+str(y)+'%;left:'+str(x)+'%;background-color: rgba('+str(r)+','+str(g)+','+str(b)+',0);color: '+str('#%02x%02x%02x' % (r, g, b))+'">'+trtn(image_bnw.getpixel((x,y)))+'</span>'

        if(x != w-1):
            bnw_img += ','
            rgb_img += ','
            hax_img += ','
    if(y != h-1):
        bnw_img += '],'
        rgb_img += '],'
        hax_img += '],'
    else:    
        bnw_img += ']'
        rgb_img += ']'
        hax_img += ']'
bnw_img += ']'
rgb_img += ']'
hax_img += ']'
html += '</div><script>document.querySelectorAll(\'div > span\').forEach(el => {TweenMax.to(el, 5, {css:{top:getRandomNum(0,100)+"%", left:getRandomNum(0,100)+"%"}}).reverse(0);});function getRandomNum(min, max) {return Math.floor(Math.random() * (max - min) + min);}</script></body></html>'

with open('data_BNW.json', 'w') as f:
    f.write(bnw_img)
with open('data_RGB.json', 'w') as f:
    f.write(rgb_img)
with open('data_HAX.json', 'w') as f:
    f.write(hax_img)
with open('data.html', 'w') as f:
    f.write(html)
