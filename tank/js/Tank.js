function Tank(id, type, x, y, GameStatus, color){


    /**
     * 탱크 방향 선
     * @type {number}
     */
    Tank.DEF_UP = 0;
    Tank.DEF_DOWN = 1;
    Tank.DEF_LEFT = 2;
    Tank.DEF_RIGHT = 3;
    Tank.DEF_SHOT = 4;

    Tank.DEF_TANK_SIZE = 20;
    Tank.DEF_FRONT_SIZE = 5;
    Tank.DEF_MOVE_MAX_X = 20;
    Tank.DEF_MOVE_MAX_Y = 20;

    var tank = {};

    tank.GameStatus = GameStatus;
    tank.myTankX = x; // 탱크 위치
    tank.myTankY = y;
    tank.type = type;
    tank.myTankIng = Tank.DEF_UP;
    tank.myHP = 100;
    tank.shotList = [];
    tank.color = color || 'yellow';

    /**
     * 탱크 HP
     * @param hp
     */
    tank.fnSetHP = function(hp){
        tank.myHP = hp;
    }

    /**
     * 탱크 그리기.
     * @param context
     */
    tank.fnDrawTank = function(context){

        var wX = tank.myTankX*Tank.DEF_TANK_SIZE
            , wY = tank.myTankY*Tank.DEF_TANK_SIZE
            ;

        context.fillStyle = tank.color;
        context.fillRect(wX, wY, Tank.DEF_TANK_SIZE, Tank.DEF_TANK_SIZE);

        context.fillStyle = 'red';
        if(tank.myTankIng == Tank.DEF_UP){
            context.fillRect(wX, wY, Tank.DEF_TANK_SIZE, Tank.DEF_FRONT_SIZE);
        } else if(tank.myTankIng == Tank.DEF_DOWN){
            context.fillRect(wX, wY+Tank.DEF_TANK_SIZE-Tank.DEF_FRONT_SIZE, Tank.DEF_TANK_SIZE, Tank.DEF_FRONT_SIZE);
        } else if(tank.myTankIng == Tank.DEF_LEFT){
            context.fillRect(wX, wY, Tank.DEF_FRONT_SIZE, Tank.DEF_TANK_SIZE);
        } else if(tank.myTankIng == Tank.DEF_RIGHT){
            context.fillRect(wX+Tank.DEF_TANK_SIZE-Tank.DEF_FRONT_SIZE, wY, Tank.DEF_FRONT_SIZE, Tank.DEF_TANK_SIZE);
        }

        $.each(tank.shotList, function(idx, val){
            val.fnDrawShot(context);
        });
    }

    /**
     * 탱크 움직이기
     * @param keyCode
     * @returns {boolean}
     */
    tank.fnKeyDown = function(keyCode){

        logger.debug(keyCode);

        switch(keyCode){
            // 위로
            case Tank.DEF_UP:
                tank.myTankIng = keyCode;
                tank.myTankY = (tank.myTankY <= 0)? 0 :  tank.myTankY-1;
                break;
            // Down
            case Tank.DEF_DOWN:
                tank.myTankIng = keyCode;
                tank.myTankY = (tank.myTankY >= Tank.DEF_MOVE_MAX_Y-1)? Tank.DEF_MOVE_MAX_Y-1 :  tank.myTankY+ 1;
                break;
            // Left
            case Tank.DEF_LEFT:
                tank.myTankIng = keyCode;
                tank.myTankX = (tank.myTankX <= 0)? 0 :  tank.myTankX-1;
                break;
            // Right
            case Tank.DEF_RIGHT:
                tank.myTankIng = keyCode;
                tank.myTankX = (tank.myTankX >= Tank.DEF_MOVE_MAX_X-1)? Tank.DEF_MOVE_MAX_X-1 :  tank.myTankX+1;
                break;
            // ESC
            case 27:
                logger.debug('ESC');
                break;

            // SPACE
            case Tank.DEF_SHOT:
                GameStatus.shotList.push(new Shot(tank, tank.myTankX, tank.myTankY, tank.myTankIng, tank.GameStatus));
                logger.debug(GameStatus.shotList.length);
                break
            default :
                return false;

        }

        return false;
    }

    /**
     * 탱크 자동
     */
    tank.fnTankAI = function(){
        var n = Math.floor((Math.random()*10)%5);

        var tPosition = GameStatus.myTank.fnGetPosition();

        switch(n){
            case Tank.DEF_DOWN :
                if(tank.myTankY > tPosition.y) {
                    tank.fnKeyDown(Tank.DEF_UP);
                }
                break;
            case Tank.DEF_UP:
                if(tank.myTankY < tPosition.y) {
                    tank.fnKeyDown(Tank.DEF_DOWN);
                }
                break;
            case Tank.DEF_LEFT :
                if(tank.myTankX < tPosition.x) {
                    tank.fnKeyDown(Tank.DEF_RIGHT);
                }
                break;
            case Tank.DEF_RIGHT :
                if(tank.myTankX > tPosition.x) {
                    tank.fnKeyDown(Tank.DEF_LEFT);
                }
                break;
            case Tank.DEF_SHOT :
                if(tank.myTankX == tPosition.x){
                    if(tank.myTankY > tPosition.y){
                        tank.myTankIng = Tank.DEF_UP;
                    } else if(tank.myTankY < tPosition.y){
                        tank.myTankIng = Tank.DEF_DOWN;
                    }
                    tank.fnKeyDown(Tank.DEF_SHOT);
                }
                else if(tank.myTankY == tPosition.y){
                    if(tank.myTankX > tPosition.x){
                        tank.myTankIng = Tank.DEF_LEFT;
                    } else if(tank.myTankX < tPosition.x){
                        tank.myTankIng = Tank.DEF_RIGHT;
                    }
                    tank.fnKeyDown(Tank.DEF_SHOT);

                }
                break;
        }
    }

    /**
     * 탱크 위치
     * @returns {{x: *, y: *, ing: *}}
     */
    tank.fnGetPosition = function(){
        return {
            x : tank.myTankX,
            y : tank.myTankY,
            ing : tank.myTankIng
        };
    }

    return tank;
}



