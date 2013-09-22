


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


    var mapImage = [
        [10, 120, 'water'],
        [20, 120, 'water'],
        [30, 120, 'water'],
        [40, 120, 'water'],
        [10, 130, 'water'],
        [20, 130, 'water'],
        [30, 130, 'water'],
        [40, 130, 'water'],

        [10, 200, 'brick'],
        [20, 200, 'brick'],
        [30, 200, 'brick'],
        [40, 200, 'brick']
    ];


    $.each(mapImage, function(idx, val){
        fnDrawImage(context, val[0], val[1], val[2]);
    });


}