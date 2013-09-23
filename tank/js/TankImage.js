


var img_map = {
    tank : {
        color : '#ee82ee',
        hp : 5
    },
    water : {
        color : '#00bfff',
        hp : -1
    },
    brick : {
        color : '#eeeee0',
        hp : -1
    }

}


function fnDrawImage(context, x, y, mapName){

    if(!mapName) return;

    var img = img_map[mapName];

    context.beginPath();
    context.fillStyle = img['color'];
    context.fillRect(x*DEF.CAP_SIZE, y*DEF.CAP_SIZE, DEF.CAP_SIZE, DEF.CAP_SIZE);
    context.closePath();
}


function fnMapLoad(context){


//    var mapImage = [
//        [10, 120, 'water'],
//        [20, 120, 'water'],
//        [30, 120, 'water'],
//        [40, 120, 'water'],
//        [10, 130, 'water'],
//        [20, 130, 'water'],
//        [30, 130, 'water'],
//        [40, 130, 'water'],
//
//        [10, 200, 'brick'],
//        [20, 200, 'brick'],
//        [30, 200, 'brick'],
//        [40, 200, 'brick']
//    ];

    var map= [[3,19,'water'],[4,19,'water'],[5,19,'water'],[6,19,'water'],[7,19,'water'],[8,19,'water'],[9,19,'water'],[10,19,'water'],[11,19,'water'],[12,19,'water'],[13,19,'water'],[14,19,'water'],[15,19,'water'],[16,19,'water'],[16,23,'brick'],[17,23,'brick'],[18,23,'brick'],[19,23,'brick'],[20,23,'brick'],[21,23,'brick'],[22,23,'brick'],[23,23,'brick'],[24,23,'brick'],[25,23,'brick'],[26,23,'brick'],[28,23,'brick'],[27,23,'brick']]




    $.each(map, function(idx, val){
        fnDrawImage(context, val[0], val[1], val[2]);
    });


}