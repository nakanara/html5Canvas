ShotList = [];


function Shot(tank, x, y, shoting, gameStatus){

    Shot.DEF_SHOT_W = 4;
    Shot.DEF_SHOT_H = 4;
    Shot.DEF_UP = 0;
    Shot.DEF_DOWN = 1;
    Shot.DEF_LEFT = 2;
    Shot.DEF_RIGHT = 3;
    Shot.DEF_SHOT_MOVE_SIZE = 20;


    var shot = {};

    shot.gameStatus = gameStatus;
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

    shot.fnPlayShot = function(){

        switch (shot.shoting){
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

        return shot.fnCheckShot();
    }

    shot.fnDrawShot = function(context){
        context.fillStyle = 'red';
        context.fillRect(shot.shotX*Shot.DEF_SHOT_MOVE_SIZE + (Shot.DEF_SHOT_MOVE_SIZE/2)-(Shot.DEF_SHOT_W/2)
            , shot.shotY*Shot.DEF_SHOT_MOVE_SIZE + (Shot.DEF_SHOT_MOVE_SIZE/2)-(Shot.DEF_SHOT_H/2)
            , Shot.DEF_SHOT_H, Shot.DEF_SHOT_H)

    }

    shot.fnCheckShot = function(){

        if(shot.shotX < 0 || shot.shotX > 20) {
            return false;
        }

        if(shot.shotY < 0 || shot.shotY > 20){
            return false;
        }
        return true;




    }

    shot.fnPlayShot();


    return shot;

}