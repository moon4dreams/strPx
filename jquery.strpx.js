/*! jQuery strPx v1.0 2013/01/31
* http://www.moon4dreams.com
* Copyright (c) 2013 USE MIT License*/


(function($){
  var map = [0, 5, 5, 8, 8, 13, 12, 3, 5, 5, 8, 9, 4, 6, 4, 4, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 3, 4, 9, 9, 9, 7, 15, 11, 10, 11, 11, 9, 9, 11, 11, 5, 6, 12, 9, 14, 12, 12, 9, 12, 10, 9, 9, 11, 11, 15, 11, 11, 9, 5, 4, 5, 8, 8, 5, 7, 8, 7, 8, 7, 4, 7, 7, 3, 4, 8, 3, 11, 7, 8, 8, 8, 5, 6, 4, 7, 7, 11, 7, 7, 6, 7, 3, 8, 9];

/**
 * 将字符串按像素显示
 * @param {Object} lineStr 需要测试的字符串
 * @param {Object} ellipsis 像素值限制 true or number
 */
$.fn.strpx = function(lineStr,ellipsis){
	if(!lineStr){
		if(ellipsis) {
			return lineStr;
		}else{
			return 0;
		}
	}
	
	var pxlimit = 0;
			
	if(ellipsis === true){			
		//! 必须为元素指定宽度
		pxlimit = this.innerWidth();			
	}else if($.isNumeric(ellipsis) && ellipsis < pxlimit){
		pxlimit = ellipsis;
	}
		
	var fontsize = 16;
	try{
		fontsize = parseInt(this.css('font-size').slice(0,-2));
	}catch(e){
		//$.error(e);
	}
	//字符串副本
	var tmpStr = new String(lineStr);
	//像素长度
	var pxlen = 0;
	
	var ct;
	
	for(var t = 0,lt = tmpStr.length; t < lt;t++){
		ct = tmpStr.charAt(t);			
		if(escape(ct).length > 4){
			pxlen += 16;
			//ascii 32-126
		}else if(ct.charCodeAt(0)>31 && ct.charCodeAt(0)<127){
			pxlen += map[ct.charCodeAt(0)-32];
		}
		//需要按像素截取字符串时，进行如下处理，先找到不计算空格比需要的像素值大的位置，然后加上递减尝试,直到找到合适的子字符串
		if(pxlimit >0 && pxlen*fontsize/16 > pxlimit){
			try{									
				var d = 1;	
				do{
					currentSub = tmpStr.substring(0,t-d);
					pxlen += getSpaceLength(currentSub);
					d += 1;					
				}while(pxlen*fontsize/16 > pxlimit);					
				return currentSub;
			}catch(e){
				return '';
			}				
		}
	}
	
	if(ellipsis){
		return lineStr;
	}else{
		pxlen += getSpaceLength(tmpStr);
		return parseInt(pxlen*fontsize/16);
	}
};

//获取空格显示的像素值
function getSpaceLength(str){
		var reg = /\S(\x20)+\S/gi;
		var substrings = str.match(reg)	;
		if(substrings){
			return substrings.length * 4;
		}else return 0;			
	}
	
})(jQuery);
