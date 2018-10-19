# imageToText
  - This project job is to convert images and video to text illustration
## How to use 
There are two way to use it
###### using javascript
This is the easist way to do it 
  - edit `js/main.js` and point Image or video element and canvas from `index.html`
  
    ' video to text '
    ```
    ....
    let vid = document.querySelector('video');
    let canvas = document.querySelector('canvas');
    var videoToText = setInterval(function(){ imageToText(vid,canvas); }, 1);
    ...
    
    ```
    ' image to text '
    ```
    ....
    let img = document.querySelector('img');
    let canvas = document.querySelector('canvas');
    imageToText(img,canvas);
    ...
    
    ```
  - It results the output in `index.html`
###### using Python
This python program convert any image to text and export it to data.json

  - Open run.py in Editor
  - Change image Path 
```
...ze = 100;
imageFile = Image.open("your image path")
...
```
  - And run run.py
  - It would data.json file in current Dir.
  - That data.json can use anywhere

    In Folder, named `Example`, there is an example how to use it.
