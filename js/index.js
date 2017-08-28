/*
* @Author: Administrator
* @Date:   2017-06-22 15:10:09
* @Last Modified by:   Administrator
* @Last Modified time: 2017-06-23 11:40:57
*/

'use strict';
window.onload = function(){
	//轮播效果
	banner();
	//搜索区域颜色变化
	search();
	//倒计时
	daojishi();
	
}
//移动端轮播图
function banner(){
	/*1、自动滚动起来(定时器+过渡transition + 位移transform：translate)

		*/

		//1、先获取 .jd_banner
		var banner = document.querySelector(".jd_banner");
		// console.log(banner);
		//2、再获取 banner的可见宽度
		var w = banner.offsetWidth;
		//3、再获取 banner下的第一个 ul，保存在 imageBox中
		var imageBox = banner.children[0];
		//4、再获取 banner下的第二个 ul，保存在 pointBox中
		var pointBox = banner.children[1];
		//4、再获取 pointBox下的所有 li，保存在 points中
		var points = pointBox.querySelectorAll("li");
		// console.log(points);
	/*添加 过渡方法*/ 
		var addTranstion = function(){
			imageBox.style.transition = "all .8s";//.8s表示0.8秒
			imageBox.style.webkitTransition = "all .8s";//兼容写法
		}
	/*删除 过渡方法*/ 
		var remTransition = function(){
			imageBox.style.transition = "";
			imageBox.style.webkitTransition = "";//兼容写法
		}
	/*添加 x轴方向位移 方法*/ 
		var setTranslate = function(translateX){
			imageBox.style.transform = "translateX("+translateX+"px)";
			imageBox.style.webkitTransform = "translateX("+translateX+"px)";
		}
	/*定时器 自动滚动起来*/
		var index = 1;//记录滚动的次数
		//定义定时器 timer
		var timer = setInterval(function(){
			//滚动次数+1
			index++;
			/*调用之前定义的 过渡和位移方法*/
			//过渡
			addTranstion();
			//位移
			setTranslate(-w*index);
		},3000);
	/*绑定一个过渡结束事件*/
		itcast.transitionEnd(imageBox,function(){
			if(index >= 9){
				index = 1;
				/*调用删除过渡*/
				remTransition();
				/*调用位移方法*/
				setTranslate(-index*w);
			}else if(index <= 0){
				index = 8;
				/*删除过渡*/
				remTransition();
				/*调用位移方法*/
				setTranslate(-index*w);
			}
			//index 1-8
			//points 0-7
			setPoint();
		});
	/*点随之滚动起来 (改变当前元素li的样式)*/
		function setPoint(){
			//先把所有点的样式 清掉
			for(var i=0;i<points.length;i++){
				points[i].className = "";
			}
			points[index-1].className = "now";
		}

	/*图片滑动事件*/
		var startX = 0;//当前触摸时 X轴 的坐标值
		var moveX = 0; //手移动时 X轴 的实时坐标
		var distanceX = 0;//moveX - startX 的值  滑动距离
		var ismove = false;//表示是否正在移动   true表示正在移动

		imageBox.addEventListener("touchstart",function(e){
			//1.清除定时器
			clearInterval(timer);
			//2.获得当前触摸的X轴的坐标
			startX = e.touches[0].clientX;
		});

		imageBox.addEventListener("touchmove",function(e){
			//1.设置ismove 为 true
			ismove = true;
			//2.移动时 x轴的实时坐标
			moveX = e.touches[0].clientX;
			//3.滑动距离
			distanceX = moveX - startX;//右滑动-正 ，左滑动-负
			/*计算 在滑动时图片需要滚动的 实际距离*/
			var currX = -w*index + distanceX;
			//删除过渡事件
			remTransition();
			//调用位移事件
			setTranslate(currX);
		});

		imageBox.addEventListener("touchend",function(e){
			/*
			 Math.abs(); 获取 绝对值
			 当滑动的距离超过 1/3 的屏幕宽度，就换到下一张或上一张
			 */
			if(ismove&& Math.abs(distanceX) > w/3){
				//如果移动的距离是正 - 右
				if(distanceX>0){
					index--;//向右滑动 上一张
				}else{
					index++;//向左滑动 下一张
				}
				addTranstion();
				setTranslate(-index*w);
			}else{
				/*滑动距离小于 1/3 图片被吸附过去，定位回去*/
				addTranstion();
				setTranslate(-index*w);
			}
			//重置初始变量
			startX = 0;
			moveX = 0;
			distanceX = 0;
			ismove = false;
			//重新启动定时器
			clearInterval(timer);
			timer = setInterval(function(){
				index++;
				addTranstion();
				setTranslate(-w*index);
			},3000);
		});
}
/*搜索区域颜色变化*/
function search(){
	/*
		1.透明度随着页面的滚动 逐渐变得不透明
		2.当滚动的距离超过 轮播图的高度 透明度保持不变
	*/
		//1.获取 .jd_header_box 保存在searchBox中
		var searchBox = document.querySelector(".jd_header_box");
		//2.获取 .jd_banner 的可见高度
		var h = document.querySelector(".jd_banner").offsetHeight;
		console.log(h);
	/*监听window的滚动事件*/
		window.onscroll = function(){
		/*不断地获取scrollTop 向上滚动的距离*/
			var top = document.body.scrollTop;
			console.log(top);
			//设置透明度
			var opacity = 0;
			//如果滚动的距离 top < h
			if(top<h){
				//透明度是随着 页面的滚动而降低的
				opacity = top/h;
			}else{
				//当超过 轮播图的时候 ，透明度为1
				opacity = 0.9;
			}
			//把透明度属性设置上去
			searchBox.style.backgroundColor = "rgba(201,21,35,"+opacity+")";
		}
}
/*倒计时*/
function daojishi(){
 //    var time_la = new Date('2017/07/01 00:00:00').getTime();//结束时间
 //    var time_st =new Date().getTime();//现在时间
 //    // console.log(time_st);
 //    // console.log(time_la);
	// var cha =time_la -time_st;
 //    // console.log(cha);//相距多少毫秒
 //    var s =Math.floor(cha/1000%60);//秒数取余
 //    // console.log(s);
 //    var m =Math.floor(cha/1000/60%60);//分钟取余
 //    // console.log(m);
 //    var h =Math.floor(cha/1000/60/60%24);//小时取余
 //     // console.log(h);

 //    document.querySelector(".sk_time span:first-child").innerHTML  = parseInt(h/10);
 //    document.querySelector(".sk_time span:nth-child(2)").innerHTML = h%10;//时
 //    document.querySelector(".sk_time span:nth-child(4)").innerHTML = parseInt(m/10);
 //    document.querySelector(".sk_time span:nth-child(5)").innerHTML = m%10;//分
 //    document.querySelector(".sk_time span:nth-child(7)").innerHTML = parseInt(s/10);
 //    document.querySelector(".sk_time span:nth-child(8)").innerHTML = s%10;//秒
 	
 	//设置需要倒计时的时间
 	var time = 2*60*60;
 	//初始化定时器
 	var timer = null;
 	//找到 .sk_time下的所有span
 	var spans = document.querySelectorAll(".sk_time span");
 	//设置定时器
 	timer = setInterval(function(){
 		if(time <= 0){
 			clearInterval(timer);
 			return false;
 		}
 		time --;
 		/*取时间 h m s*/
 		var h = Math.floor(time/3600);
 		var m = Math.floor(time%3600/60);
 		var s = Math.floor(time%60);
 		spans[0].innerHTML = Math.floor(h/10);
 		spans[1].innerHTML = h%10;

 		spans[3].innerHTML = Math.floor(m/10);
 		spans[4].innerHTML = m%10;

 		spans[6].innerHTML = Math.floor(s/10);
 		spans[7].innerHTML = s%10;

 	},1000);
}