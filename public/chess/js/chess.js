/**
 * Created by Administrator on 2016/3/31.
 */
    var me    = true
    var chessBoardArr = []  // 棋盘交叉点
    for(var i = 0;i < 15;i++){
        chessBoardArr[i] = []
        for(var j = 0;j < 15;j++){
            chessBoardArr[i][j] = 0
        }
    }

    AI.init()

    var chess = document.getElementById('chess')
    var ctx   = chess.getContext('2d')

    ctx.strokeStyle = '#bfbfbf'

    // 画水印
    var logo = new Image()
    logo.src = '../public/chess/images/whiteBg.png'
    logo.onload = function () {
        ctx.drawImage(logo,0,0,450,450)
        drawChessBoard()

        //drawChessMan(7,7)
        //drawChessMan(0,0)
        //drawChessMan(AI.getFirstPoint(12,12).x,AI.getFirstPoint(12,12).y)

        me = !me
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
        var chessX = e.offsetX
        var chessY = e.offsetY

        var i = Math.floor(chessX / 30)
        var j = Math.floor(chessY / 30)

        // 画棋子
        drawChessMan(i,j)
    }

    var drawChessMan = function (x, y) {

        // 没有棋子才能落子
        if(chessBoardArr[x][y] == 0){
            oneStep(x,y,me)
            if(me){ //黑子
                chessBoardArr[x][y] = 1
            }else{
                chessBoardArr[x][y] = 2
            }
            if(AI.isWin(x,y)){
                var type = chessBoardArr[x][y]
                if(type == 1){
                    alert("黑棋胜 游戏结束")
                    clearCanvasChess()
                }
                else{
                    alert("白棋胜 游戏结束")
                    clearCanvasChess()
                }
            }
            me = !me;
        }

    }

    var clearCanvasChess = function () {
        window.location.reload()
    }



