/*
    此插件textarea的高度是 height:100%; 继承父元素的高度 ==> 父元素只有一个 position:relative; 用于定位textarea
    页面中加载完毕又添加了pre标签，pre标签是以块元素存在的并且不可见，但是占用空间，
    不像display:none;什么空间也不占。
    所以textarea父元素的高度是通过pre撑开的(在textarea里面写入文字，文字会被添加到pre底下的span标签里，以此来撑开pre的高度)

    要改变textarea初始化时的高度，只需改变pre的padding值即可，页面加载时pre里面添加<br />标签是为了让pre标签初始时有个高度
 */
;(function ($) {

    // 构造函数
    function FT(elem) {
        this.$textarea = $(elem);

        this._init();
    }

    FT.prototype = {
        _init: function () {
            var _this = this;

            // 为文本区域镜像插入包装器elem＆pre / span
            this.$textarea.wrap('<div class="flex-text-wrap" />').before('<pre class="pre"><span /><br /></pre>');

            this.$span = this.$textarea.prev().find('span');

            // Add input event listeners 添加输入事件侦听器
            // * input for modern browsers  输入现代浏览器
            // * propertychange for IE 7 & 8    IE 7＆8的属性更改
            // * keyup for IE >= 9: catches keyboard-triggered undos/cuts/deletes
            //键值为IE> = 9：捕获键盘触发的undos /剪切/删除
            // * change for IE >= 9: catches mouse-triggered undos/cuts/deletions (when textarea loses focus)
            //更改IE> = 9：捕获鼠标触发的undos /切割/删除（当textarea失去焦点时）
            this.$textarea.on('input propertychange keyup change', function () {
                _this._mirror();
            });

            // jQuery val() strips carriage return chars by default (see http://api.jquery.com/val/)
            //jQuery val（）将默认拖放回车符（请参阅http://api.jquery.com/val/）
            // This causes issues in IE7, but a valHook can be used to preserve these chars
            //这会导致IE7中的问题，但是valHook可以用于保留这些字符
            $.valHooks.textarea = {
                get: function (elem) {
                    return elem.value.replace(/\r?\n/g, "\r\n");
                }
            };

            // Mirror contents once on init   初始化镜像内容一次
            this._mirror();
        }

        // Mirror pre/span & textarea contents   镜像pre / span＆textarea内容
        ,_mirror: function () {
            this.$span.text(this.$textarea.val());
        }
    };

    // jQuery plugin wrapper   jQuery插件封装
    $.fn.flexText = function () {
        return this.each(function () {
            // Check if already instantiated on this elem   检查是否已经在此elem上实例化了
            if (!$.data(this, 'flexText')) {
                // Instantiate & store elem + string   实例化并存储elem +字符串
                $.data(this, 'flexText', new FT(this));
            }
        });
    };

})(jQuery);