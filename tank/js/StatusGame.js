

function StatusGame(GameStatus){


    var statusGame = {};
    var context = GameStatus.context;
    var aiLoop = 0;

    statusGame.run = function(){

        if(aiLoop++ > DEF.AI_CAP) {
            aiLoop = 0;

            fnTankAI();
            fnPlayShot();
        }

        fnDraw();
        fnDrawShot()
    }

    /**
     * 전체 그리기
     */
    function fnDraw(){

        fnDrawBackGround();
        fnMapLoad(context);
        GameStatus.myTank.fnDrawTank(context);
        $.each(GameStatus.redTank, function(idx, val){
            val.fnDrawTank(context);
        });
    }

    /**
     * 배경 그리기
     *
     */
    function fnDrawBackGround(){
        var i, j;

        context.fillStyle = 'black';
        context.fillRect(0, 0, GameStatus.height, GameStatus.width);
    }

    function fnTankAI(){
        $.each(GameStatus.redTank, function(idx, val){
            val.fnTankAI();
        });
    }

    function fnPlayShot(){
        var copyArray = [];
        $.each(GameStatus.shotList, function(idx, val){
            if(val.fnPlayShot()){
                copyArray.push(val);
            } else {
                val = null;
            }
        });
        GameStatus.shotList = copyArray;
    }

    function fnDrawShot(){
        //logger.debug(shotList.length);
        $.each(GameStatus.shotList, function(idx, val){
            val.fnDrawShot(context);
        });
    }

    /**
     * Key Down.
     * @param event
     * @returns {boolean}
     */
    statusGame.fnKeyDown = function(event){

        var keyCode = MOVE.UP;

        switch(event.keyCode){
            // 위로
            case 87:
            case 38:
                keyCode = MOVE.UP;
                break;
            // Down
            case 40:
                keyCode = MOVE.DOWN;
                break;
            // Left
            case 37:
                keyCode = MOVE.LEFT;
                break;
            // Right
            case 39:
                keyCode = MOVE.RIGHT;
                break;
            // ESC
            case 27:
                logger.debug('ESC');
                keyCode = keyCode;
                break;

            // SPACE
            case 32:
                logger.debug('SPACE');
                keyCode = MOVE.SHOT;
                break;
            default :
                return false;
        }

        GameStatus.myTank.fnKeyDown(keyCode);
        return false;
    }

    return statusGame;
};
