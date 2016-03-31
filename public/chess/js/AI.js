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
    var type = 0
    type = chessBoardArr[x][y]

    // 从八个方向来判断连续的数量 1 top 2 bottom 3 left 4 right 5 left_top 6 left_bottom 7 right_top 8 right_bottom
    // 1 top
    for(var i = x - 1; i >= 0;i--){

    }

}

// 判断是输赢
AI.isWin = function(x,y){

    var len     = chessBoardArr.length
    var type    = chessBoardArr[x][y]
    var tbNum   = 1 // 上下
    var lrNum   = 1 // 左右
    var ltrbNum = 1 // 左上右下
    var lbrtNum = 1 // 左下右上

    var win = false

    // 从八个方向来判断连续的数量 1 top 2 bottom 3 left 4 right 5 left_top 6 left_bottom 7 right_top 8 right_bottom
    // 1 上下
    for(var i = x - 1,j = y; i >= 0;i--){
        if(chessBoardArr[i][j] == type) tbNum += 1;
    }
    for(var i = x + 1,j = y; i < len;i++){
        if(chessBoardArr[i][j] == type) tbNum += 1;
    }
    // 1 左右
    for(var i = x,j = y -1 ; j >= 0;j--){
        if(chessBoardArr[i][j] == type) lrNum += 1;
        console.log('lrNum zuo ' + lrNum)

    }
    for(var i = x,j = y + 1; j < len;j++){
        if(chessBoardArr[i][j] == type) lrNum += 1;
        console.log('lrNum you ' + lrNum)
    }
    // 1 左上 右下
    for(var i = x - 1,j = y - 1; i >= 0 && j >= 0;i--,j--){
        if(chessBoardArr[i][j] == type) ltrbNum += 1;
    }
    for(var i = x + 1,j = y + 1; i < len && j < len;i++,j++){
        if(chessBoardArr[i][j] == type) ltrbNum += 1;
    }
    // 1 左下 右上
    for(var i = x + 1,j = y - 1; i < len && j >= 0;i++,j--){
        if(chessBoardArr[i][j] == type) lbrtNum += 1;
    }
    for(var i = x - 1,j = y + 1; i >= 0 && j < len;i--,j++){
        if(chessBoardArr[i][j] == type) lbrtNum += 1;
    }

    if(tbNum == 5 || lrNum == 5 || ltrbNum == 5 || lbrtNum == 5 ){
        win = true
    }
    return win;
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