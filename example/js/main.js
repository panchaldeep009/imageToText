fetch('json/data.json')
    .then(res => res.json())
    .then((out) => {
        putData(out)
    })
    .catch(err => { console.error(err)});



function putData(data){
    data.forEach(
        function(dataX, index){
            let x = index;
            dataX.forEach(
                function(dataY, index){
                    let y = index;
                    let newSpan = document.createElement("span");
                    newSpan.style.top = y+"%";
                    newSpan.style.left = x+"%";
                    newSpan.style.color = data[x][y][0];
                    newSpan.innerHTML = data[x][y][1];
                    document.querySelector('#textImg').appendChild(newSpan);
                }
            );
        }
    );
    document.querySelectorAll('#textImg > span').forEach(el => {
        TweenMax.to(el, 5, {css:{top:getRandomNum(0,100)+"%", left:getRandomNum(0,100)+"%"}}).reverse(0);
    });
}

function getRandomNum(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}