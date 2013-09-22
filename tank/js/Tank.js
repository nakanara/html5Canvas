function Tank(id, type, x, y, GameStatus, color){

    Tank.DEF_TANK_SIZE = 20;
    Tank.DEF_FRONT_SIZE = 5;

    var tank = {};

    tank.GameStatus = GameStatus;
    tank.myTankX = x; // 탱크 위치
    tank.myTankY = y;
    tank.type = type;
    tank.myTankIng = MOVE.UP;
    tank.myHP = 100;
    tank.shotList = [];
    tank.color = color || 'yellow';
    tank.shutflag = false;

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

        var wX = tank.myTankX* DEF.CAP_SIZE
            , wY = tank.myTankY* DEF.CAP_SIZE
            ;

        context.fillStyle = tank.color;
        context.fillRect(wX, wY, Tank.DEF_TANK_SIZE, Tank.DEF_TANK_SIZE);

        context.fillStyle = 'red';
        if(tank.myTankIng == MOVE.UP){
            context.fillRect(wX, wY, Tank.DEF_TANK_SIZE, Tank.DEF_FRONT_SIZE);
        } else if(tank.myTankIng == MOVE.DOWN){
            context.fillRect(wX, wY+Tank.DEF_TANK_SIZE-Tank.DEF_FRONT_SIZE, Tank.DEF_TANK_SIZE, Tank.DEF_FRONT_SIZE);
        } else if(tank.myTankIng == MOVE.LEFT){
            context.fillRect(wX, wY, Tank.DEF_FRONT_SIZE, Tank.DEF_TANK_SIZE);
        } else if(tank.myTankIng == MOVE.RIGHT){
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

        switch(keyCode){
            // 위로
            case MOVE.UP:
                tank.myTankIng = keyCode;
                tank.myTankY = (tank.myTankY <= 0)? 0 :  tank.myTankY-1;
                break;
            // Down
            case MOVE.DOWN:
                tank.myTankIng = keyCode;
                tank.myTankY = (tank.myTankY >= DEF.MAX_Y-2)? DEF.MAX_Y-2 :  tank.myTankY+ 1;
                break;
            // Left
            case MOVE.LEFT:
                tank.myTankIng = keyCode;
                tank.myTankX = (tank.myTankX <= 0)? 0 :  tank.myTankX-1;
                break;
            // Right
            case MOVE.RIGHT:
                tank.myTankIng = keyCode;
                tank.myTankX = (tank.myTankX >= DEF.MAX_X-2)? DEF.MAX_X-2 :  tank.myTankX+1;
                break;
            // ESC
            case 27:
                logger.debug('ESC');
                break;

            // SPACE
            case MOVE.SHOT:
                if(!tank.shutflag) {
                    GameStatus.shotList.push(new Shot(tank, tank.myTankX, tank.myTankY, tank.myTankIng, tank.GameStatus));
                    tank.shutflag=true;
                }
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
            case MOVE.DOWN :
                if(tank.myTankY > tPosition.y) {
                    tank.fnKeyDown(MOVE.UP);
                }
                break;
            case MOVE.UP:
                if(tank.myTankY < tPosition.y) {
                    tank.fnKeyDown(MOVE.DOWN);
                }
                break;
            case MOVE.LEFT :
                if(tank.myTankX < tPosition.x) {
                    tank.fnKeyDown(MOVE.RIGHT);
                }
                break;
            case MOVE.RIGHT :
                if(tank.myTankX > tPosition.x) {
                    tank.fnKeyDown(MOVE.LEFT);
                }
                break;
            case MOVE.SHOT :
                if(tank.myTankX == tPosition.x){
                    if(tank.myTankY > tPosition.y){
                        tank.myTankIng = MOVE.UP;
                    } else if(tank.myTankY < tPosition.y){
                        tank.myTankIng = MOVE.DOWN;
                    }
                    tank.fnKeyDown(MOVE.SHOT);
                }
                else if(tank.myTankY == tPosition.y){
                    if(tank.myTankX > tPosition.x){
                        tank.myTankIng = MOVE.LEFT;
                    } else if(tank.myTankX < tPosition.x){
                        tank.myTankIng = MOVE.RIGHT;
                    }
                    tank.fnKeyDown(MOVE.SHOT);

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



