export default {
	getUrlParam(name) {
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	},
	// formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
	formatDate(date, format) {
	    var o = {
	        'M+': date.getMonth() + 1,
	        'd+': date.getDate(),
	        'h+': date.getHours(),
	        'm+': date.getMinutes(),
	        's+': date.getSeconds(),
	        'q+': Math.floor((date.getMonth() + 3) / 3),
	        'S': date.getMilliseconds()
	    };
	    if (/(y+)/.test(format)) {
            // $n保存了第n个捕获的匹配组
	    	console.log(RegExp)
	    	console.log(RegExp.$0)  //undefined,不存在$0
	    	console.log(RegExp.$1)  //yyyy
	    	console.log(RegExp.$2)  //空的
	        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	    }
	    for (var k in o) {
	        if (new RegExp("(" + k + ")").test(format)) {
	            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
	                : ("00" + o[k]).substr(("" + o[k]).length));
	        }
	    }
	    return format;
	},
	setCookie(name, value) {
        var Days = 1;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
	},
    getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return (unescape(arr[2]));
        else
            return null;
    },
    //删除cookies
    delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },
    setStorage(id, val) {
        var key = 'zzj_data'
        var storage = localStorage[key];
        if (!storage) {
            var obj = {};
            obj[id] = val;
            localStorage[key] = JSON.stringify(obj);
        } else {
            storage = JSON.parse(storage);
            storage[id] = val;
            localStorage[key] = JSON.stringify(storage);
        }
    },
    getStorage(id) {
        var key = 'zzj_data';
        var storage = localStorage[key];
        if (storage) {
            storage = JSON.parse(storage);
            for (var k in storage) {
                if (k == id) {
                    return storage[k];
                }
            }
        }
        return false;
    },
    isAndroidOrIos() {
        let ua  = navigator.userAgent.toLowerCase();
        if(ua.match(/android/)) {
            alert('android')
        } else if(ua.match(/iphone|ipod|ipad/)) {
            alert('ios')
        }
    },
    installApp() {
        let url = {};
        let ua = navigator.userAgent.toLowerCase();
        if(ua.match(/android/i)){
            url = {
                open: '...://splash',
                store: 'market://search?q=app名称'
            };
        }
        if(ua.match(/iphone|ipod|ipad/)){
            url = {
                open: '...://splash',
                store: 'https://itunes.apple.com/cn/app/wei-xin/id'+'appId'
            };
        }
        let winScreenWidth = window.screen.width;
        if(/MicroMessenger/gi.test(navigator.userAgent) && ua.match(/android/i)) {
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=渠道包名';
        } else if(winScreenWidth < 800){
            let iframe = document.createElement('iframe');
            let timer = null;
            let isInstalled = false;
            document.body.appendChild(iframe);
            iframe.src = url.open;
            // iframe.style.display = 'none';
            iframe.onload = function(e){
                var e = e || window.event;
                e.preventDefault();
                isInstalled = true
            }
            iframe.onerror = function() {
                isInstalled = false;
            }
            timer = setTimeout(function() {
                document.body.removeChild(iframe);
                if(!isInstalled){
                    window.location.href = url.store;
                }
            }, 400);
        } else {
            window.location.href = '下载链接apk'
        }
    },
    hasArrRepeat(arr) {
        //一、不适合[1,2,3,11],因为1重复了
        /*let arrToStr = arr.join(',')+',';
        for(let i = 0; i < arr.length; i++) {
            console.log(arrToStr.replace(arr[i]+',', ''))
            if(arrToStr.replace(arr[i]+',', '').indexOf(arr[i]+',') > -1) {
                alert('重复了'+arr[i])
                return
            }
        }*/
        // 二、排序方法
        /*let sortArr = arr.sort();
        for(let i = 1; i < arr.length; i++) {
            if(arr[i] == arr[i-1]) {
                alert('重复了' + arr[i]);
                return
            }
        }*/
        // 三、对象消除
        let hash = {};
        for(let i in arr) {
            if(hash[arr[i]]) {
                return true;
            }
            hash[arr[i]] = true
        }
        return false
    }
}
