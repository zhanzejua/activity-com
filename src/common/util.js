import Vue from 'vue';
let global = typeof window != 'undefined' ? window : (function() {return this})() || {};
let _isNative = global.callNative ? true : false;
export default {
	getQueryString: function(name) {
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	},
	isAndroid: function() {
		let agent = navigator.userAgent;
		let flag = false;
		if(agent.indexOf('Android') > -1 || agent.indexOf('Linux') > -1) {
			flag = true;
		}
		return flag;
	},
	isIOS: function() {
		let agent = navigator.userAgent;
		let flag = false;
		if(!!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
			flag = true;
		}
		return flag;
	},
	isNative: function() {
		return _isNative;
	},
	isObject: function(obj) {
		return obj !== null && typeof obj === 'object'
	},
	genZIndex: function() {
		return ZINDEX += 2;
	},
	createComponentProxy: function(S, data) {
		//为了可以让修改data时界面得到响应
		let vm = new Vue({
			data
		});
		vm.$destroy();

		S._Ctor = null;
		let Stub = Vue.extend(S);
		let Proxy = function(options) {
			let propsData = options.propsData = Vue.util.extend(options.propsData || {}, data);
			let vm = new Stub(options);
			let ufp = vm._updateFromParent;
			vm._updateFromParent = function() {
				arguments[0] = Vue.util.extend(arguments[0] || {}, propsData);
				ufp && ufp.apply(this, arguments);
			}
			return vm;
		}
		Vue.util.extend(Proxy, Stub);
		return Proxy;
	},
	// 客户端接口
	/*登录接口*/
	login: function() {
		if(this.isAndroid()) {
			callNative.login();
		} else if(this.isIOS()) {
			window.webkit.messageHandlers.login.postMessage(null)
		}
	},
	/*登录回调接口*/
	/*userInfo: function(token, avator, name) {
		alert('userInfo:'+token)
		// this.$store.commit('setToken', token);
		// this.$store.commit('setUserInfo', {avator: avator, name: name});
	},*/
	/*formatDate: function(format, date) {
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
	        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	    }

	    for (var k in o) {
	        if (new RegExp("(" + k + ")").test(format)) {
	            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
	                : ("00" + o[k]).substr(("" + o[k]).length));
	        }
	    }
	    return format;
	},*/
}
