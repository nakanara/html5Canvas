var logger;

(function(){

    // 생성되지 않았다면 생성한다.
    if(!logger){
        logger = {};

        var LEVEL_DEBUG = 1
            ,LEVEL_INFO =  2
            ,LEVEL_ERROR = 10
            ,level= LEVEL_DEBUG;
        ;

        logger.debug = function(msg){
            print(LEVEL_DEBUG, msg);
        }

        logger.info = function(msg){
            print(LEVEL_INFO, msg);
        }

        logger.error = function(msg){
            print(LEVEL_ERROR, msg);
        }

        logger.setLevel = function(lv){
            if(lv.toUpperCase() == 'DEBUG'){
                level = LEVEL_DEBUG;
            } else if(lv.toUpperCase() == 'INFO'){
                level = LEVEL_INFO;
            } else if(lv.toUpperCase() == 'ERROR'){
                level = LEVEL_ERROR;
            } else {
                level = LEVEL_DEBUG;
            }
        }

        function print(lv, msg){

            if(level > lv) return;

            try{
                console.log(msg);
            }catch(e){}
        }
    }

})();