from PIL import Image 
from array import *

def convertColorintensityToText(x):
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

textImageSize = 100;
imageFile = Image.open("test.png")

widthRatio = (textImageSize/float(imageFile.size[0]))
hightSize = int((float(imageFile.size[1])*float(widthRatio)))
imageResized = imageFile.resize((textImageSize,hightSize), Image.ANTIALIAS)
image_rgb = imageResized.convert('RGB')
image_bnw = imageResized.convert('L')

w, h = imageResized.size

data = "["
for x in range(w):
    data += '['
    for y in range(h):
        r, g, b = image_rgb.getpixel((x,y))
        data += '[\"'+str('#%02x%02x%02x' % (r, g, b))+'\",\"'+convertColorintensityToText(image_bnw.getpixel((x,y)))+'\"]'
        if(y != h-1):
            data += ','
    if(x != w-1):
        data += '],'
    else:    
        data += ']'
data += ']'

with open('data.json', 'w') as f:
    f.write(data)
