"use strict";
    function putDataInElement(data){
        data.forEach(
            function(dataX, index){
                let x = index;
                dataX.forEach(
                    function(dataY, index){
                        let y = index;
                        if(data[x][y][1] != null){
                            let newSpan = document.createElement("span");
                            newSpan.style.top = y+"%";
                            newSpan.style.left = x+"%";
                            newSpan.style.color = data[x][y][0];
                            newSpan.innerHTML = data[x][y][1];
                            document.querySelector('#imageToText').appendChild(newSpan);
                        }
                    }
                );
            }
        );
    }

    function imageToText(image,canvas){
        let enlarge = 16;
        let spacing = 1.5;
        let newWidth = Math.round(100*(8/enlarge));
        let newHeight = Math.round(((image.offsetHeight*100)/image.offsetWidth)*(8/enlarge));
        let tempCanvas = document.createElement('canvas');
        tempCanvas.width = newWidth;
        tempCanvas.height = newHeight;
        tempCanvas.getContext('2d').drawImage(image, 0, 0, newWidth, newHeight);
        let data = [];
        data[0] = [];
        data[0][0] = [255,255,255,255];
        for(let x = 0; x < newWidth; x++){
            data[x] = [];
            for(let y = 0; y < newHeight; y++){
                data[x][y] = [];
                let pixel = tempCanvas.getContext('2d').getImageData(x, y, 1, 1).data;
                data[x][y][0] = rgbToHex(pixel[0], pixel[1], pixel[2]);
                data[x][y][1] = convertColorintensityToText(Math.round(((0.3 * pixel[0]) + (0.59 * pixel[1]) + (0.11 * pixel[2]) )));
            }
        }
        canvas.width = data.length*enlarge;
        canvas.height = data[0].length*enlarge;
        let ctx = canvas.getContext("2d");
        ctx.font = (enlarge*spacing)+"px Arial";
        data.forEach(
            function(dataX, index){
                let x = index;
                dataX.forEach(
                    function(dataY, index){
                        let y = index;
                        if(data[x][y][1] != null){
                            //ctx.font = (enlarge*getRandomNum(.5, 5))+"px Arial";
                            ctx.fillStyle = data[x][y][0];
                            ctx.fillText(data[x][y][1],x*enlarge,y*enlarge);
                        }
                    }
                );
            }
        );
    }

    let vid = document.querySelector('#imageToText video');
    let canvas = document.querySelector('#outputCanvas');
    var videoToText = setInterval(function(){ imageToText(vid,canvas); }, 1);

    function convertColorintensityToText(x){
        x = 255-x;
        if(x < 16) return null
        else if(x < 32) return '`'
        else if(x < 48) return '.'
        else if(x < 64) return '-'
        else if(x < 80) return ':'
        else if(x < 96) return '\\'
        else if(x < 96) return '\\'
        else if(x < 112) return 'o'
        else if(x < 128) return 's'
        else if(x < 144) return 'y'
        else if(x < 160) return 'h'
        else if(x < 176) return 'd'
        else if(x < 192) return 'm'
        else if(x < 208) return '7'
        else if(x < 224) return 'N'
        else return 'M'
        // else if(x < 112) return randomProgramSymbol()
        // else if(x < 128) return randomProgramSymbol()
        // else if(x < 144) return randomProgramSymbol()
        // else if(x < 160) return randomProgramSymbol()
        // else if(x < 176) return randomProgramSymbol()
        // else if(x < 192) return randomAlphabet()
        // else if(x < 208) return randomAlphabet()
        // else if(x < 224) return randomAlphabet()
        // else return randomAlphabet()
    }

    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    function getRandomNum(min, max){
        return Math.floor(Math.random() * (max - min) + min);
    }

    function randomAlphabet() {
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        return possible.charAt(getRandomNum(0, possible.length));
    }
    function randomProgramSymbol() {
        var possible = "<>/?#{}'\"*[],$";
        return possible.charAt(getRandomNum(0, possible.length));
    }
