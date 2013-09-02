function Tank(id, type, x, y, gameStatus){


    /**
     * 탱크 방향 선
     * @type {number}
     */
    Tank.DEF_UP = 0;
    Tank.DEF_DOWN = 1;
    Tank.DEF_LEFT = 2;
    Tank.DEF_RIGHT = 3;
    Tank.DEF_SHOT = 9;

    Tank.DEF_TANK_SIZE = 20;
    Tank.DEF_FRONT_SIZE = 5;
    Tank.DEF_MOVE_MAX_X = 20;
    Tank.DEF_MOVE_MAX_Y = 20;

    var tank = {};

    tank.gameStatus = gameStatus;
    tank.myTankX = x; // 탱크 위치
    tank.myTankY = y;
    tank.type = type;
    tank.myTankIng = Tank.DEF_UP;
    tank.myHP = 100;
    tank.shotList = [];

    tank.fnSetHP = function(hp){
        tank.myHP = hp;
    }

    tank.fnDrawTank = function(context){

        var wX = tank.myTankX*Tank.DEF_TANK_SIZE
            , wY = tank.myTankY*Tank.DEF_TANK_SIZE
            ;

        context.fillStyle = 'yellow';
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

    tank.fnKeyDown = function(keyCode){


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
                gameStatus.shotList.push(new Shot(tank, tank.myTankX, tank.myTankY, tank.myTankIng, tank.gameStatus));
                logger.debug(gameStatus.shotList.length);
                break
            default :
                return false;

        }

        return false;
    }

    tank.fnTankAI = function(){
        var n = Math.floor((Math.random()*10)%5);
        tank.fnKeyDown(n);
    }

    tank.fnGetPosition = function(){
        return {
            x : tank.myTankX,
            y : tank.myTankY,
            ing : tank.myTankIng
        };
    }

    return tank;
}



