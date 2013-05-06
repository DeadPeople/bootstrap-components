/*	this is to help hightlight target element with dark background.
options:
	title:			string				specify title of dialog.
	content:		element				specify content of dialog.
	position:		string				"left", "right", "top", "bottom". You can mix then up as "left,top" (it's same as "top,left")
	type:			string				"normal", "warning", "info", "error", "success"
	timeout:		number				default: 5000, hiden speed.
	region:			string				default: "", saming region notification will not keep out other notification in same region.

callback:			[function]			it will trigger event when user close this dialog by click the return button.
										return boolean of confirm, and false of alert and close button.
*/

// init function
$.extend({
	notify:function(options, callback){
		// get options
		var vars = $._bc.vars(options, callback);
		var _options = vars.options;
		var _callback = vars.callback;

		var _title = $._bc.get(_options, "title", "Notification");
		var _content = $._bc.get(_options, "content", "");
		var _position = $._bc.get(_options, "position", "right,top");
		var _type = $._bc.get(_options, "type", "normal");
		var _timeout = $._bc.get(_options, "timeout", 5000);
		var _region = $._bc.get(_options, "region", "");

		var $notification = $("<div class='alert notification-body'>");
		var $btn = $("<button type='button' class='close'>��</button>");

		if(_region != "") {
			$notification.attr("data-region", _region);
		}

		// alert position
		if(_position.indexOf("left") != -1) $notification.addClass("left");
		if(_position.indexOf("right") != -1) $notification.addClass("right");
		if(_position.indexOf("top") != -1) $notification.addClass("top");
		if(_position.indexOf("bottom") != -1) $notification.addClass("bottom");

		// alert color
		if(_type == "normal") $notification.addClass("alert-normal");
		if(_type == "error") $notification.addClass("alert-error");
		if(_type == "success") $notification.addClass("alert-success");
		if(_type == "info") $notification.addClass("alert-info");

		$notification.append($btn);

		if(_title == "") _title = "&nbsp;";
		if(typeof(_title) == 'string') _title = "<h5>" + _title + "</h5>";
		$notification.append(_title);
		if(_content != "") $notification.append(_content);

		// get the list of notification who are in the same region.
		var regions = $("div.notification-body");

		// append notification
		$("body").append($notification);

		var _myHeight = $notification.outerHeight();
		regions.each(function(){
			var _m_top = ($(this).offset().top + _myHeight) + "px";
			$(this).animate({
				top: _m_top,
			});
		});

		// fade in
		$notification.hide();
		$notification.fadeIn();

		// auto fade out
		if(_timeout > 0) {
			var _tt;
			function setAutoFadeOut() {
				_tt = window.setTimeout(function(){
					$btn.click();
				}, _timeout);
			}

			setAutoFadeOut();
			$notification.mouseenter(function(){
				window.clearTimeout(_tt);
			});
			$notification.mouseleave(function(){
				setAutoFadeOut();
			});
		}

		// fade out
		$btn.click(function(){
			$notification.fadeOut();
			window.setTimeout(function(){
				$notification.remove();
			}, 1000);
		});
	}
});