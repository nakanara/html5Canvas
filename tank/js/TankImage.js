
var tankImage = new Image();
tankImage.src = 'tank.png';

var img_map = {
    tank : [5, 225, 50, 50]
}

function fnGetImgMap(key){
    return img_map[key];
}


function fnDrawImage(context, imgMap){
    context.drawImage(tankImage, imgMap[0], imgMap[1], imgMap[2], imgMap[3]);
}

