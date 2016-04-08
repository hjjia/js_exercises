/**
 * Created by Administrator on 2016/4/1.
 */
var me    = true  // 黑子
var chessBoardArr = []  // 棋盘交叉点
var chess = document.getElementById('chess')
var ctx   = chess.getContext('2d')
var over  = false

// 赢法数组
var wins = []

// 赢法统计数组
var myWin       = []
var computerWin = []

for(var i = 0;i < 15;i++){
    chessBoardArr[i] = []
    for(var j = 0;j < 15;j++){
        chessBoardArr[i][j] = 0
    }
}

for(var i = 0;i<15;i++){
    wins[i] =[]
    for(var j = 0;j < 15;j++){
        wins[i][j] = []
    }
}

var count = 0 ;// 赢法数组的索引

// 横线赢法
for(var i = 0;i < 15;i++){
    for(var j = 0;j < 11;j++){
        for(var k = 0;k < 5;k++){
            wins[i][j+k][count] = true
        }
        count ++;
    }
}

// 竖线赢法
for(var i = 0;i < 15;i++){
    for(var j = 0;j < 11;j++){
        for(var k = 0;k < 5;k++){
            wins[j+k][i][count] = true
        }
        count ++;
    }
}

// 斜线赢法 左上右下
for(var i = 0;i < 11;i++){
    for(var j = 0;j < 11;j++){
        for(var k = 0;k < 5;k++){
            wins[i+k][j+k][count] = true
        }
        count ++;
    }
}
// 斜线赢法 左下右上
for(var i = 0;i <11 ;i++){
    for(var j = 14;j > 3;j--){
        for(var k = 0;k < 5;k++){
            wins[i+k][j-k][count] = true
        }
        count ++;
    }
}

console.log(wins)

// 初始化统计数组
for(var i = 0;i < count;i++){
    myWin[i]       = 0
    computerWin[i] = 0
}

ctx.strokeStyle = '#bfbfbf'

// 画水印  这里需要在画完图片之后在画棋盘  否则  背景图会覆盖棋盘
var logo = new Image()
logo.src = '../public/chess/images/whiteBg.png'
logo.onload = function () {
    ctx.drawImage(logo,0,0,450,450)
    drawChessBoard()  // 画棋盘

}
var drawChessBoard = function () {
    for(var i = 0; i < 15; i++){
        // 画横线
        ctx.moveTo(15 + i * 30,15)
        ctx.lineTo(15 + i * 30,435)
        ctx.stroke()

        // 画纵线
        ctx.moveTo(15,15 + i * 30)
        ctx.lineTo(435,15 + i * 30)
        ctx.stroke()
    }
}

// i,j 表示当前棋子的索引，me 表示黑棋或者白棋
var oneStep = function (i, j, me) {

    // 画棋子 画圆需要开始路径
    ctx.beginPath()
    ctx.arc(15 + i * 30,15 + j * 30,13,0,2 * Math.PI)
    ctx.closePath()
    //画棋子的渐变
    var gradient = ctx.createRadialGradient(15 + i * 30 - 2,15 + j * 30 - 2,13,15 + i * 30 - 2,15 + j * 30 - 2,0)

    if(me){ // 黑棋
        gradient.addColorStop(0,'#0a0a0a')
        gradient.addColorStop(1,'#636766')
    }else{ // 白棋
        gradient.addColorStop(0,'#d1d1d1')
        gradient.addColorStop(1,'#f9f9f9')
    }

    ctx.fillStyle = gradient
    ctx.fill()
}


chess.onclick = function (e) {

    if(over) return;

    if(!me) return;

    var chessX = e.offsetX
    var chessY = e.offsetY

    var i = Math.floor(chessX / 30) // 因为棋盘留白15px 棋子半径15px 所以在30px范围内的点都画棋子
    var j = Math.floor(chessY / 30)

    // 画棋子
    // 没有棋子才能落子
    if(chessBoardArr[i][j] == 0){
        oneStep(i,j,me)
        chessBoardArr[i][j] = 1
        for(var k = 0; k < count;k++){
            if(wins[i][j][k]){
                myWin[k] ++;
                computerWin[k] = 6;
                if(myWin[k] == 5){
                    alert('你赢了！')
                    over = true
                }
            }
        }
        if(!over){
            me = !me;
            computerAI()
        }
    }
}

var computerAI = function () {

    // 得分数组
    var myScore       = []
    var computerScore = []

    var max = 0 //用来保存最高分
    var u = 0,v = 0 ;//用来保存最高分的坐标

    for(var i = 0;i < 15;i++){
        myScore[i]       = []
        computerScore[i] = []
        for(var j = 0;j < 15;j++){
            myScore[i][j]       = 0
            computerScore[i][j] = 0
        }
    }

    // 遍历棋盘
    for(var i = 0;i < 15;i++){
        for(var j = 0;j < 15;j++){
            if(chessBoardArr[i][j] == 0){ // 如果没有棋子
                // 循环比遍历赢法数组，判断在这个点落子有价值
                for(var k = 0;k < count;k++){
                    if(wins[i][j][k]){
                        // 分值计算
                        if(myWin[k] == 1){
                            myScore[i][j] += 200
                        }
                        else if(myWin[k] == 2){
                            myScore[i][j] += 400
                        }
                        else if(myWin[k] == 3){
                            myScore[i][j] += 2000
                        }
                        else if(myWin[k] == 4){
                            myScore[i][j] += 10000
                        }

                        //电脑
                        if(computerWin[k] == 1){
                            computerScore[i][j] += 220
                        }
                        else if(computerWin[k] == 2){
                            computerScore[i][j] += 420
                        }
                        else if(computerWin[k] == 3){
                            computerScore[i][j] += 2100
                        }
                        else if(computerWin[k] == 4){
                            computerScore[i][j] += 20000
                        }
                    }
                } // 遍历赢法数组 e

                if(myScore[i][j] > max){
                    max = myScore[i][j]
                    u = i
                    v = j
                }
                else if(myScore[i][j] == max){
                    if(computerScore[i][j] > computerScore[u][v]){
                        u = i
                        v = j
                    }
                }

                if(computerScore[i][j] > max){
                    max = computerScore[i][j]
                    u = i
                    v = j
                }
                else if(computerScore[i][j] == max){
                    if(myScore[i][j] > myScore[u][v]){
                        u = i
                        v = j
                    }
                }
            }
        }
    } // 循环遍历 棋盘 e

    oneStep(u,v,false)
    chessBoardArr[u][v] = 2

    for(var k = 0; k < count;k++){
        if(wins[u][v][k]){
            computerWin[k] ++;
            myWin[k] = 6;
            if(computerWin[k] == 5){
                alert('电脑赢了！')
                over = true
            }
        }
    }
    if(!over){
        me = !me;
    }

}




