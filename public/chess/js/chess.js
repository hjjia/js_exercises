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

    var chess = document.getElementById('chess')
    var ctx   = chess.getContext('2d')

    ctx.strokeStyle = '#bfbfbf'

    // 画水印
    var logo = new Image()
    logo.src = '../public/chess/images/whiteBg.png'
    logo.onload = function () {
        ctx.drawImage(logo,0,0,450,450)
        drawChessBoard()

        oneStep(0,0,true)
        oneStep(1,1,false)
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

        // 没有棋子才能落子
        if(chessBoardArr[i][j] == 0){
            oneStep(i,j,me)
            if(me){ //黑子
                chessBoardArr[i][j] = 1
            }else{
                chessBoardArr[i][j] =2
            }
            me = !me;
        }

    }


