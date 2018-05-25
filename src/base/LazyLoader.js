const lazyImageMap = {};
var lazyImageArray = [];
const TIME_OUT = 64;
const LOADING = 'LOADING';
const LOADED = 'LOADED';

var LazyImageLoader = {
    inited: false,
    _onLoadHandler: function(img) {
        lazyImageMap[img.src] = true;
        img.dataset['status'] = LOADED;
    },
    _onErrorHandler: function(img) {
        img.target.src = '../components/assets/lazy-default-bg.png'
    },
    detect: function(img) {
        if(!img) return;
        lazyImageArray.push(img);
        if(!LazyImageLoader.inited) {
            function check() {
                var winHeight = window.innerHeight;
                var winWidth = window.innerWidth;
                lazyImageArray = lazyImageArray.filter(function(img) {
                    if(img.dataset['status'] == LOADED || img.dataset['status'] == LOADING) {
                        return false;
                    } else {
                        return true;
                    }
                });
                lazyImageArray.forEach(function(img) {
                    if(img.dataset['status']) return;
                    var rect = img.getBoundingClientRect();
                    var top = rect.top;
                    var right = rect.right;
                    var left = rect.left;
                    var bottom = rect.bottom;
                    if((top|right|left|bottom) == 0) {
                        img.dataset['status'] = LOADED;
                        return;
                    }
                    if(((top > 0 && top < winHeight) || (bottom > 0 && bottom <= winHeight))
                        && ((left > 0 && left <= winWidth) || (right > 0 && right <= winWidth))) {
                        img.onload = LazyImageLoader._onLoadHandler(img);
                        img.onerror = LazyImageLoader._onErrorHandler;
                    }
                });
                setTimeout(check, TIME_OUT);
            }
            setTimeout(check, TIME_OUT);
            LazyImageLoader.inited = true;
        }
    }
}