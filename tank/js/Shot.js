
function Shot(tank, x, y, shoting){

    Shot.DEF_SHOT_W = 2;
    Shot.DEF_SHOT_H = 2;
    Shot.DEF_UP = 0;
    Shot.DEF_DOWN = 1;
    Shot.DEF_LEFT = 2;
    Shot.DEF_RIGHT = 3;
    Shot.DEF_SHOT_MOVE_SIZE = 20;


    var shot = {};

    shot.id = Math.random() * 10000;
    shot.tank = tank;
    shot.shotX = x;
    shot.shotY = y;
    shot.shoting = shoting;


    /**
     * 현재 총 위치를 돌려준다.
     * @returns {{x: *, y: *}}
     */
    shot.fnGetPosition = function(){
        return {
            x : shot.shotX,
            y : shot.shotY
        };
    }


    shot.fnDrawShot = function(context){

        switch (shoting){
            case Shot.DEF_UP:
                shot.shotY -= 1;
                break;

            case Shot.DEF_DOWN:
                shot.shotY += 1;
                break;

            case Shot.DEF_LEFT:
                shot.shotX -= 1;
                break;

            case Shot.DEF_RIGHT:
                shot.shotX += 1;
                break;
        }

        context.fillStyle = 'blue';
        context.fillRect(shot.shotX*Shot.DEF_SHOT_MOVE_SIZE, shot.shotY*Shot.DEF_SHOT_MOVE_SIZE, Shot.DEF_SHOT_H, Shot.DEF_SHOT_H)

    }


    return shot;

}