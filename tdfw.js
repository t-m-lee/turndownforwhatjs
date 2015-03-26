(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
(function() {
	var startTime = Date.now();
	var turndownAt = 20 * 1000;
	var numTurntAnimations = 10;
	var turntDown = false;
	var maxNodes = 1000;
	var animationCSS = {
		'tdfw_intro': 'tdfwIntro 1s infinite ease-in-out',
		'turntDown': function() {
			var key = ~~ ( Math.random() * numTurntAnimations);
			return 'turntDown' + key + ' 5s infinite ease-in-out'
		}
	};
	var firstAddition = true;
	
	function checkTime() {
		requestAnimationFrame(checkTime);
		if(Date.now() - startTime > turndownAt) {
			turntDown = !turntDown;
            startTime = Date.now();
			removeCurStyles();
			addCurStyles()	;
		}
	}
	
	function setupAnimations() {
		var numKeyFrames = 10;
		var introKeyFrames = '';
		var turntKeyFrames = [];
		var jitterAmount = 10;
        var i;
		for(i = 0; i < numTurntAnimations; i++) {
			turntKeyFrames[i] = ''
		}
		for(i = 0; i <= numKeyFrames; i++) {
			var pct = i / numKeyFrames * 100 + '%';

			var x = (Math.random() - 0.5) * jitterAmount;
			var y = (Math.random() - 0.5) * jitterAmount;
			x = ~~ x;
			y = ~~ y;
			var keyframe = '-webkit-transform: translate(' + x + 'px,' + y +'px); ';
			keyframe += 'transform: translate(' + x + 'px,' + y + 'px);';
			introKeyFrames += pct + ' { ' + keyframe + ' } ';
			for(var j = 0; j < numTurntAnimations; j++) {
				x = (Math.random() - 0.5) * jitterAmount;
				y = (Math.random() - 0.5) * jitterAmount;
				x = ~~ x;
				y = ~~ y;
				var rotationAmount = i / numKeyFrames * 360;
				rotationAmount = ~~ rotationAmount;
				var rotateDirection = String.fromCharCode(88 + ~~ (Math.random() * 2));
				keyframe = '-webkit-transform: translate(' + x + 'px,' + y +'px) rotate' + rotateDirection + '(' + rotationAmount + 'deg); ';
				keyframe += 'transform: translate(' + x + 'px,' + y + 'px) rotate' + rotateDirection + '(' + rotationAmount + 'deg); ';
				turntKeyFrames[j] += pct + ' { ' + keyframe + ' }'

			}

		}
		var introKeyFrameDef = '@-webkit-keyframes tdfwIntro { ' + introKeyFrames + ' } ';
		introKeyFrameDef += '@keyframes tdfwIntro { ' + introKeyFrames + ' } ';


		var allStyles = introKeyFrameDef;

		for(i = 0; i < turntKeyFrames.length; i++) {
			var kf = turntKeyFrames[i];
			allStyles += '@-webkit-keyframes turntDown' + i + ' { ' + kf + ' } ';
			allStyles += '@keyframes turntDown' + i + ' { ' + kf + ' } '
		}
		var style = document.createElement('style');
		style.textContent = allStyles;
		document.body.appendChild(style)
	}
	

	function addCurStyles() {

		var curClass = getCurClass();
		var nodes = Array.prototype.slice.call(document.querySelectorAll('img'));
		nodes = nodes.concat(Array.prototype.slice.call(document.querySelectorAll('div')));
		nodes = nodes.concat(Array.prototype.slice.call(document.querySelectorAll('span')));
		nodes = nodes.concat(Array.prototype.slice.call(document.querySelectorAll('a')));
		nodes = nodes.concat(Array.prototype.slice.call(document.querySelectorAll('section, header, footer, video, iframe, nav, article, h1, h2, h3, h4, h5, h6, footer, main, p, pre, blockquote, ol, ul, li, embed, object, canvas, svg, form, input, select, button')));

		var max = maxNodes < nodes.length ? maxNodes : nodes.length;

		for(var i = 0; i < max ; i++) {
			var node = nodes[i];
			
			node.classList.add(curClass);
			var delay = Math.round(Math.random() * 1000) / 1000 + 'ms';
			if(firstAddition) {
				delay = ~~ (Math.random() * 10) + 's'
			}
			var css = animationCSS[curClass];
			if(typeof css === 'function') {
				css = css()
			}
			node.style['webkitAnimation'] = css + ' ' + delay ;
			node.style['animation'] = css + ' ' + delay

		}
		firstAddition = false

	}
	function removeCurStyles() {
		var classes = allClasses();
		var nodes = document.querySelectorAll('*');
		for(var i = 0; i < nodes.length ; i++) {
			var node = nodes[i];
			for(var j = 0; j < classes.length; j++) {
				var cl = classes[j];
				node.classList.remove(cl);
				node.style['webkitAnimation'] = '';
				node.style['animation'] = ''

			}
		}
	}
	function allClasses() {
		return ['tdfw_intro', 'turntDown']
	}
	function getCurClass() {
		if(turntDown) {
			return 'turntDown'
		} else {
			return 'tdfw_intro'
		}

	}

	function init() {
		if(typeof window.tdfw________TDFW !== 'undefined') {
			return;
		}
		window.tdfw________TDFW = true;

		setupAnimations();
        requestAnimationFrame(checkTime);
        addCurStyles();
	}
	init()

})();