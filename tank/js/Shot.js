ShotList = [];


function Shot(tank, x, y, shoting, GameStatus){

    Shot.DEF_SHOT_W = 4;
    Shot.DEF_SHOT_H = 4;

    var shot = {};

    shot.GameStatus = GameStatus;
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
            case MOVE.UP:
                shot.shotY -= 1;
                break;

            case MOVE.DOWN:
                shot.shotY += 1;
                break;

            case MOVE.LEFT:
                shot.shotX -= 1;
                break;

            case MOVE.RIGHT:
                shot.shotX += 1;
                break;
        }

        return shot.fnCheckShot();
    }

    shot.fnDrawShot = function(context){
        context.fillStyle = 'red';
        context.fillRect(shot.shotX*DEF.CAP_SIZE + (DEF.CAP_SIZE/2)-(Shot.DEF_SHOT_W/2)
            , shot.shotY*DEF.CAP_SIZE + (DEF.CAP_SIZE/2)-(Shot.DEF_SHOT_H/2)
            , Shot.DEF_SHOT_H, Shot.DEF_SHOT_H)

    }

    shot.fnCheckShot = function(){

        // 벽 나감 체크.
        if(shot.shotX < 0 || shot.shotX > DEF.MAX_X) {
            return false;
        }

        if(shot.shotY < 0 || shot.shotY > DEF.MAX_Y){
            return false;
        }

        // 탱크 충돌 체크.
        // 나 일때. 적탱크
        if(shot.tank.type == 'self') {
            $.each(GameStatus.redTank, function(idx, val){
                var position = val.fnGetPosition();

                if(shot.shotX >= position.x
                    && shot.shotX <= (position.x )
                    && shot.shotY >= position.y
                    && shot.shotY <= (position.y )) {

                    GameStatus.state = GAME_STATE.GAME_WIN;
                    return false;
                }


            });


        } else { // 적 탱크일때
            var position = GameStatus.myTank.fnGetPosition();

            if(shot.shotX >= position.x
                && shot.shotX <= (position.x )
                && shot.shotY >= position.y
                && shot.shotY <= (position.y )) {

                GameStatus.state = GAME_STATE.GAME_OVER;
                return false;
            }

        }


        return true;




    }

    shot.fnPlayShot();


    return shot;

}