
/*定义一个全局变量*/
window.itcast = {};/*存储  我们将要封装的  事件方法*/
/*设置 属性 定义一个  transitionEnd 一个事件绑定方法*/
itcast.transitionEnd  = function(dom,callback){
    // /*过渡结束事件的绑定*/    对象  函数
    /*
     * 1.谁需要绑定  transitionEnd
     * 2.需要处理的函数
     * */
    if(dom && typeof dom === 'object'){//如果DOM对象是object类型，就执行  typeof检测变量
        dom.addEventListener('transitionEnd',function(){
            /* if(callback){
             callback();
             }*/
            callback && callback();
        //false 不执行   //true 执行
        });

        dom.addEventListener('webkitTransitionEnd',function(){
            callback && callback();
        });
    }

}
