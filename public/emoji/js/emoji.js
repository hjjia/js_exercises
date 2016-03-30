/**
 * Created by Administrator on 2016/3/30.
 */
$.fn.emoji = function (options) {
    var defaults = {
        divid : "#js-emoji", // 表单ID
        textid : "#js-emoji-text" // 文本框ID
    };

    var options = $.extend(defaults,options);
    var $btn    = $(this);//取得触发事件的ID
    var $textid = $(options.textid)

    //创建表情框
    var emoji = '';
    for(var i = 0; i < 60;i++){  //通过循环创建60个表情，可扩展

        emoji +='<li><a class="link"><img src="../public/emoji/images/face/'+( i + 1)+'.gif" face="<emt>'+(i+1)+'</emt>"></a></li>';
    };

    $(options.divid).append('<div class="popover" id="js-emoji-popover"><div class="close">x</div><div class="popover-inner"><h3 class="title">常用表情</h3><ul class="list-inline">'+emoji+' </ul></div></div>');

    var $emojiP    = $('#js-emoji-popover')
    var $emoji_img = $emojiP.find('li img')

    $emojiP.css("display",'none');//创建完成后先将其隐藏

    // 插入表情
    $btn.on('click', function () {
        if($emojiP.is(":hidden")){
            $emojiP.show(300)
            $(this).addClass('active')
        }else{
            $emojiP.hide(300)
            $(this).removeClass('active')
        }
    })

    // 点击具体的表情
    $emoji_img.on('click', function () {
        $emojiP.hide(300)
        $textid.insertContent($(this).attr('face'))
        $btn.removeClass('active')
    })

    // 点击隐藏表情列表
    $emojiP.find('.close').on('click', function () {
        $emojiP.hide(300)
        $btn.removeClass('active')
    })

    // 光标移开时 隐藏表情列表
    $emojiP.on('mouseleave', function () {
        $emojiP.hide(300)
        $btn.removeClass('active')
    })
}

$.fn.extend({
    insertContent : function(myValue, t) {
        var $t = $(this)[0];
        if (document.selection) {
            this.focus();
            var sel = document.selection.createRange();
            sel.text = myValue;
            this.focus();
            sel.moveStart('character', -l);
            var wee = sel.text.length;
            if (arguments.length == 2) {
                var l = $t.value.length;
                sel.moveEnd("character", wee + t);
                t <= 0 ? sel.moveStart("character", wee - 2 * t	- myValue.length) : sel.moveStart("character", wee - t - myValue.length);
                sel.select();
            }
        } else if ($t.selectionStart || $t.selectionStart == '0') {
            var startPos = $t.selectionStart;
            var endPos = $t.selectionEnd;
            var scrollTop = $t.scrollTop;
            $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos,$t.value.length);
            this.focus();
            $t.selectionStart = startPos + myValue.length;
            $t.selectionEnd = startPos + myValue.length;
            $t.scrollTop = scrollTop;
            if (arguments.length == 2) {
                $t.setSelectionRange(startPos - t,$t.selectionEnd + t);
                this.focus();
            }
        } else {
            this.value += myValue;
            this.focus();
        }
    }
})

$.fn.extend({
    replaceface : function(faces){
        for(var i = 0; i < 60;i++){
            faces = faces.replace('<emt>'+ (i+1) +'</emt>','<img src="../public/emoji/images/face/'+(i+1)+'.gif">');
        }
        return faces;
    }
})
