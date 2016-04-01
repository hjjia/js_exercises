/**
 * Created by Administrator on 2016/3/31.
 */
var AI = function () {

}
AI.Direction = {
    TOP:1,
    BOTTOM:2,
    LEFT:3,
    RIGHT:4,
    LEFT_TOP:5,
    LEFT_BOTTOM:6,
    RIGHT_TOP:7,
    RIGHT_BOTTOM:8
}

// 第一步
AI.getFirstPoint = function(x,y){
    var black     = new Point(x,y)
    var white     = new Point()
    var direction = 0
    var dirHelp   = 0
    var len       = chessBoardArr.length - 1
    /*
    * 随机获取方向
    * 1 左上角 2 左下角 3 右上角 4 右下角 5 顶部 6 底部  7 左边  8 右边
    */
    if(x == 0 && y == 0){ // 左上角 只能在 1 右边、2 下边、3 右下

        dirHelp =Math.floor( Math.random() * 3 +1)

        switch (dirHelp){
            case 1: // 右边
                direction = this.Direction.RIGHT
                break;
            case 2: // 下边
                direction = this.Direction.BOTTOM
                break;
            case 3: // 右下边
                direction = this.Direction.RIGHT_BOTTOM
                break;
        }
    }
    else if(x == 0 && y == len){ // 右上角 只能在 1 左边、2 下边、3 左下

        dirHelp =Math.floor( Math.random() * 3 +1)

        switch (dirHelp){
            case 1: // 左边
                direction = this.Direction.LEFT
                break;
            case 2: // 下边
                direction = this.Direction.BOTTOM
                break;
            case 3: // 左下边
                direction = this.Direction.LEFT_BOTTOM
                break;
        }
    }
    else if(y == 0 && x == len){ // 左下角 只能在 1 上边、2 右边、3 右上

        dirHelp =Math.floor( Math.random() * 3 +1)

        switch (dirHelp){
            case 1: // 上边
                direction = this.Direction.TOP
                break;
            case 2: // 右边
                direction = this.Direction.RIGHT
                break;
            case 3: // 右上
                direction = this.Direction.RIGHT_TOP
                break;
        }
    }
    else if(y == len && x == len){ // 右下角 只能在 1 上边、2 左边、3 左上

        dirHelp =Math.floor( Math.random() * 3 +1)

        switch (dirHelp){
            case 1: // 上边
                direction = this.Direction.TOP
                break;
            case 2: // 左边
                direction = this.Direction.LEFT
                break;
            case 3: // 左上
                direction = this.Direction.LEFT_TOP
                break;
        }
    }
    else if(x == 0 && y > 0 && y < len){ // 顶部 只能在 1 下边、2 左边、3 左下 4 右边、5 右下
        dirHelp =Math.floor( Math.random() * 5 +1)

        switch (dirHelp){
            case 1: // 下边
                direction = this.Direction.BOTTOM
                break;
            case 2: // 左边
                direction = this.Direction.LEFT
                break;
            case 3: // 左下
                direction = this.Direction.LEFT_BOTTOM
                break;
            case 4: // 右边
                direction = this.Direction.RIGHT
                break;
            case 4: // 右下
                direction = this.Direction.RIGHT_BOTTOM
                break;
        }
    }
    else if(x == len && y > 0 && y < len){ // 底部 只能在 1 上边、2 左边、3 左上 4 右边、5 右上
        dirHelp =Math.floor( Math.random() * 5 +1)

        switch (dirHelp){
            case 1: // 上边
                direction = this.Direction.TOP
                break;
            case 2: // 左边
                direction = this.Direction.LEFT
                break;
            case 3: // 左上
                direction = this.Direction.LEFT_TOP
                break;
            case 4: // 右边
                direction = this.Direction.RIGHT
                break;
            case 4: // 右上
                direction = this.Direction.RIGHT_TOP
                break;
        }
    }
    else if(y == 0 && x > 0 && x < len){ // 左边 只能在 1 上边、2 下边、3 右边 4 右下、5 右上
        dirHelp =Math.floor( Math.random() * 5 +1)

        switch (dirHelp){
            case 1: // 上边
                direction = this.Direction.TOP
                break;
            case 2: // 下边
                direction = this.Direction.BOTTOM
                break;
            case 3: // 右边
                direction = this.Direction.RIGHT
                break;
            case 4: // 右下
                direction = this.Direction.RIGHT_BOTTOM
                break;
            case 4: // 右上
                direction = this.Direction.RIGHT_TOP
                break;
        }
    }
    else if(y == len && x > 0 && x < len){ // 右边 只能在 1 上边、2 下边、3 左边 4 左上、5 左下
        dirHelp =Math.floor( Math.random() * 5 +1)

        switch (dirHelp){
            case 1: // 上边
                direction = this.Direction.TOP
                break;
            case 2: // 下边
                direction = this.Direction.BOTTOM
                break;
            case 3: // 右边
                direction = this.Direction.LEFT
                break;
            case 4: // 左上
                direction = this.Direction.LEFT_TOP
                break;
            case 4: // 左下
                direction = this.Direction.LEFT_BOTTOM
                break;
        }
    }
    else{
        direction = Math.floor( Math.random() * 8 +1)
        //console.log("  zhongjian  "+ direction)
    }

    white = new Point(this.getPosition(direction,x,y).x,this.getPosition(direction,x,y).y)
    return white;

}

// 根据方向得到棋子的位置
AI.getPosition = function(direction,x,y){

    var point = this

    switch (direction){
        case this.Direction.TOP: // 1
            point.x = x - 1;
            point.y = y;
            break;
        case this.Direction.BOTTOM: // 2
            point.x = x + 1;
            point.y = y;
            break;
        case this.Direction.LEFT: // 3
            point.x = x;
            point.y = y - 1;
            break;
        case this.Direction.RIGHT: // 4
            point.x = x;
            point.y = y + 1;
            break;
        case this.Direction.LEFT_TOP: // 5
            point.x = x - 1;
            point.y = y - 1;
            break;
        case this.Direction.LEFT_BOTTOM: // 6
            point.x = x + 1;
            point.y = y - 1;
            break;
        case this.Direction.RIGHT_TOP: // 7
            point.x = x - 1;
            point.y = y + 1;
            break;
        case this.Direction.RIGHT_BOTTOM: // 8
            point.x = x + 1;
            point.y = y + 1;
            break;
    }

    return point;
}

// 连子数
AI.getChessNum = function (x,y) {
    var point     = this
    point.len     = chessBoardArr.length
    point.type    = chessBoardArr[x][y]

    // 用来确定八个方向最后一颗棋子之后的位置
    point.tNum    = 1  // 上
    point.bNum    = 1  // 下
    point.lNum    = 1  // 左
    point.rNum    = 1  // 右
    point.ltNum   = 1  // 左上
    point.lbNum   = 1  // 左下
    point.rtNum   = 1  // 右上
    point.rbNum   = 1  // 右下

    // 两端是否可以放棋子 默认不可以
    point.isSpace_TOP          = false  // 上
    point.isSpace_BOTTOM       = false  // 下
    point.isSpace_LEFT         = false  // 左
    point.isSpace_RIGHT        = false  // 右
    point.isSpace_LEFT_TOP     = false  // 左上
    point.isSpace_LEFT_BOTTOM  = false  // 左下
    point.isSpace_RIGHT_TOP    = false  // 右上
    point.isSpace_RIGHT_BOTTOM = false  // 右下

    point.tbNum   = 1 // 上下
    point.lrNum   = 1 // 左右
    point.ltrbNum = 1 // 左上右下
    point.lbrtNum = 1 // 左下右上

    point.win     = false

    // 从八个方向来判断连续的数量 1 top 2 bottom 3 left 4 right 5 left_top 6 left_bottom 7 right_top 8 right_bottom
    // 1 上下
    for(var i = x - 1,j = y; i >= 0;i--){
        if(chessBoardArr[i][j] != point.type) {
            if(chessBoardArr[i][j] == 0){
                point.isSpace_TOP = true;
            }
            break;
        }
        point.tNum += 1
        point.tbNum += 1;
    }
    for(var i = x + 1,j = y; i < point.len;i++){
        if(chessBoardArr[i][j] != point.type){
            if(chessBoardArr[i][j] == 0){
                point.isSpace_BOTTOM = true;
            }
            break;
        }
        point.bNum += 1;
        point.tbNum += 1;
    }
    // 1 左右
    for(var i = x,j = y -1 ; j >= 0;j--){
        if(chessBoardArr[i][j] != point.type) {
            if(chessBoardArr[i][j] == 0){
                point.isSpace_LEFT = true;
            }
            break;
        }
        point.lNum += 1;
        point.lrNum += 1;

    }
    for(var i = x,j = y + 1; j < point.len;j++){
        if(chessBoardArr[i][j] != point.type){
            if(chessBoardArr[i][j] == 0){
                point.isSpace_RIGHT = true;
            }
            break;
        }
        point.rNum += 1;
        point.lrNum += 1;
        //console.log('lrNum you ' + point.lrNum)
    }
    // 1 左上 右下
    for(var i = x - 1,j = y - 1; i >= 0 && j >= 0;i--,j--){
        if(chessBoardArr[i][j] != point.type){
            if(chessBoardArr[i][j] == 0){
                point.isSpace_LEFT_TOP = true;
            }
            break;
        }
        point.ltNum += 1;
        point.ltrbNum += 1;
    }
    for(var i = x + 1,j = y + 1; i < point.len && j < point.len;i++,j++){
        if(chessBoardArr[i][j] != point.type) {
            if(chessBoardArr[i][j] == 0){
                point.isSpace_RIGHT_BOTTOM = true;
            }
            break;
        }
        point.rbNum += 1;
        point.ltrbNum += 1;
    }
    // 1 左下 右上
    for(var i = x + 1,j = y - 1; i < point.len && j >= 0;i++,j--){
        if(chessBoardArr[i][j] != point.type) {
            if(chessBoardArr[i][j] == 0){
                point.isSpace_LEFT_BOTTOM = true;
            }
            break;
        }
        point.lbNum += 1;
        point.lbrtNum += 1;
    }
    for(var i = x - 1,j = y + 1; i >= 0 && j < point.len;i--,j++){
        if(chessBoardArr[i][j] != point.type) {
            if(chessBoardArr[i][j] == 0){
                point.isSpace_RIGHT_TOP = true;
            }
            break;
        }
        point.rtNum += 1;
        point.lbrtNum += 1;
    }

    if(point.tbNum == 5 || point.lrNum == 5 || point.ltrbNum == 5 || point.lbrtNum == 5 ){
        point.win = true
    }
    return point;
}

// 下一步
AI.nextStep = function (/*prevType,*/nextType) { // prevType 上一步的颜色，nextType 接下来的颜色，
    var chessBoArrLen = chessBoardArr.length
    var dxNum = 0
    var dyNum = 0
    var nextPoint = new Point()
    var isPeace = false
    var isNextType = false

    for(var i = 0;i < chessBoArrLen;i++){
        for(var j = 0; j < chessBoArrLen;j++){
            // 先判断是否 有棋子 s
            if(chessBoardArr[i][j] != 0 ){
                var point = this.getChessNum(i,j)
                if(point.tbNum == 4 || point.lrNum == 4 || point.ltrbNum == 4 || point.lbrtNum == 4){ // 如果四个方向任一方向有四个 s
                    if(point.tbNum == 4 && (point.isSpace_TOP || point.isSpace_BOTTOM)){ // 如果是上下有四个
                        dxNum = point.isSpace_BOTTOM ? point.bNum : -point.tNum;
                        console.log('4ge top dxNum ' + dxNum + " dyNum " + dyNum)
                    }
                    else if(point.lrNum == 4 && (point.isSpace_LEFT || point.isSpace_RIGHT)){ // 如果是左右有四个
                        dyNum = point.isSpace_LEFT ? -point.lNum : point.rNum;
                        console.log('4ge left dxNum ' + dxNum + " dyNum " + dyNum)

                    }
                    else if(point.ltrbNum == 4 && (point.isSpace_LEFT_TOP || point.isSpace_RIGHT_BOTTOM)){ // 如果是左上右下有四个
                        dxNum = dyNum = point.isSpace_LEFT_TOP ? -point.ltNum : point.rbNum;
                        console.log('4ge left top dxNum ' + dxNum + " dyNum " + dyNum)

                    }
                    else if(point.lbrtNum == 4 && (point.isSpace_LEFT_BOTTOM || point.isSpace_RIGHT_TOP)){ // 如果是左下右上有四个
                        dxNum = point.isSpace_LEFT_BOTTOM ? point.lbNum : -point.rtNum;
                        dyNum = point.isSpace_LEFT_BOTTOM ? -point.lbNum : point.rtNum;
                        console.log('4ge left bottom dxNum ' + dxNum + " dyNum " + dyNum)

                    }


                } // 如果四个方向任一方向有四个 e
                else if(point.tbNum >= 3 || point.lrNum >= 3 || point.ltrbNum >= 3 || point.lbrtNum >= 3){ // 如果四个方向任一方向有三个 s
                    if(point.tbNum == 3 && (point.isSpace_TOP && point.isSpace_BOTTOM)){ // 如果是上下有三个
                        dxNum = (point.bNum == 0) ? -point.tNum : point.bNum ;
                        console.log('3ge top dxNum ' + dxNum + " dyNum " + dyNum)

                    }
                    else if(point.lrNum == 3 && (point.isSpace_LEFT && point.isSpace_RIGHT)){ // 如果是左右有三个
                        dyNum = (point.lNum == 0) ? point.rNum : -point.lNum ;
                        console.log('3ge left dxNum ' + dxNum + " dyNum " + dyNum)

                    }
                    else if(point.ltrbNum == 3 && (point.isSpace_LEFT_TOP && point.isSpace_RIGHT_BOTTOM)){ // 如果是左上右下有三个
                        dxNum = dyNum = (point.ltNum == 0) ? point.rbNum : -point.ltNum;
                        console.log('3ge left top dxNum ' + dxNum + " dyNum " + dyNum)
                    }
                    else if(point.lbrtNum == 3 && (point.isSpace_LEFT_BOTTOM && point.isSpace_RIGHT_TOP)){ // 如果是左下右上有三个
                        dxNum = (point.lbNum == 0) ? -point.rtNum : point.lbNum ;
                        dyNum = (point.lbNum == 0) ? point.rtNum : -point.lbNum ;
                        console.log('3ge left bottom dxNum ' + dxNum + " dyNum " + dyNum)

                    }

                } // 如果四个方向任一方向有三个 e
                else {
                    if(point.type == nextType && (point.isSpace_TOP || point.isSpace_BOTTOM || point.isSpace_LEFT || point.isSpace_RIGHT ||
                        point.isSpace_LEFT_TOP || point.isSpace_LEFT_BOTTOM || point.isSpace_RIGHT_TOP || point.isSpace_RIGHT_BOTTOM)){
                        if(point.isSpace_TOP || point.isSpace_BOTTOM){
                            dxNum = point.isSpace_TOP ? -point.tNum : point.bNum;
                            console.log('top point.tNum' + point.tNum+ ' point.bNum ' + point.bNum)
                        }
                        else if(point.isSpace_LEFT || point.isSpace_RIGHT){
                            dyNum = point.isSpace_LEFT ? -point.lNum : point.rNum;
                            console.log('left  point.lNum' + point.lNum+ ' point.rNum ' + point.rNum)
                        }
                        else if(point.isSpace_LEFT_TOP || point.isSpace_RIGHT_BOTTOM){
                            dxNum = dyNum = point.isSpace_LEFT_TOP ? -point.ltNum : point.rbNum;
                            console.log('left top point.ltNum' + point.ltNum+ ' point.rbNum ' + point.rbNum)
                        }
                        else if(point.isSpace_RIGHT_TOP || point.isSpace_LEFT_BOTTOM){
                            dxNum = point.isSpace_RIGHT_TOP ? point.rtNum : -point.lbNum;
                            dyNum = point.isSpace_RIGHT_TOP ? -point.rtNum : point.lbNum;
                            console.log('left bottom point.lbNum' + point.lbNum+ ' point.rtNum ' + point.rtNum)
                        }
                    }
                  /*  else{
                        console.log('bufuhe')
                    }*/
                }
                if(dxNum || dyNum){
                    nextPoint = new Point(i + dxNum,j + dyNum)
                    console.log(nextPoint)
                    console.log('dxNum ' + dxNum + " dyNum " + dyNum)
                    console.log('i ' + i + " j " + j + chessBoardArr[i][j])
                    return nextPoint;
                }
                if( i == chessBoArrLen - 1 && j ==  chessBoArrLen - 1){
                    console.log('bufuhe')
                }

            } // 有棋子 e

        }
    }
    return nextPoint;
}

// 判断是输赢
AI.isWin = function(x,y){
    return this.getChessNum(x,y).win;
}


AI.init = function () {
}


function Point(x,y){
    var point = this;
    point.x = 0
    point.y = 0
    if(arguments.length >= 1) point.x = x
    if(arguments.length >= 2) point.y = y
    return point;
}