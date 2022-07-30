/**
 * Bread n' Butter
 * Flip effect
 *
 * Provided by the nice folks
 * @ codrops. Love em.
 */
var Page = (function() {

	var $container = $( '#bb-container' ),
		$bookBlock = $( '#bb-bookblock' ),
		$body	   = $( 'body'),
		$dropdown  = $( '#controls nav'),
		$items = $bookBlock.children(),
		itemsCount = $items.length,
		current = 0,
		bb = $( '#bb-bookblock' ).bookblock( {
			speed : 800,
			perspective : 2000,
			shadowSides	: 0.8,
			shadowFlip	: 0.4,
       orientation : 'vertical',
			onEndFlip : function(old, page, isLimit) {
				
				current = page;
				// update TOC current
				updateTOC();
				// updateNavigation
				updateNavigation( isLimit );
				// initialize jScrollPane on the content div for the new item
				setJSP( 'init' );
				// destroy jScrollPane on the content div for the old item
				setJSP( 'destroy', old );

			}
		} ),
		$navNext = $( '#bb-nav-next' ),
		$navPrev = $( '#bb-nav-prev' ).hide(),
		$menuItems = $body.find( '#menu-cat > li' ),
		$tblcontents = $( '#tblcontents' ),
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
		supportTransitions = Modernizr.csstransitions;

	function init() {

		// initialize jScrollPane on the content div of the first item
		setJSP( 'init' );
		initEvents();

	}
	
	function initEvents() {

		// add navigation events
		$navNext.on( 'click', function() {
			bb.next();
			return false;
		} );

		$navPrev.on( 'click', function() {
			bb.prev();
			return false;
		} );
		
		// add swipe events
		$items.on( {
			'swipeleft'		: function( event ) {
				if( $container.data( 'opened' ) ) {
					return false;
				}
				bb.next();
				return false;
			},
			'swiperight'	: function( event ) {
				if( $container.data( 'opened' ) ) {
					return false;
				}
				bb.prev();
				return false;
			}
		} );

		// show table of contents
		$tblcontents.on( 'click', toggleTOC );

		// click a menu item
		$menuItems.on( 'click', function() {

			var $el = $( this ),
				idx = $el.index(),
				jump = function() {
					bb.jump( idx + 1 );
				};
			
			current !== idx ? closeTOC( jump ) : closeTOC();

			return false;
			
		} );

		// reinit jScrollPane on window resize
		$( window ).on( 'debouncedresize', function() {
			// reinitialise jScrollPane on the content div
			setJSP( 'reinit' );
		} );

	}

	function setJSP( action, idx ) {
		
		var idx = idx === undefined ? current : idx,
			$content = $items.eq( idx ).children( 'div.content' ),
			apiJSP = $content.data( 'jsp' );
		
		if( action === 'init' && apiJSP === undefined ) {
			$content.jScrollPane({verticalGutter : 0, hideFocus : true });
		}
		else if( action === 'reinit' && apiJSP !== undefined ) {
			apiJSP.reinitialise();
		}
		else if( action === 'destroy' && apiJSP !== undefined ) {
			apiJSP.destroy();
		}

	}

	function updateTOC() {
		$menuItems.removeClass( 'active' ).eq( current ).addClass( 'active' );
	}

	function updateNavigation( isLastPage ) {
		
		if( current === 0 ) {
			$navNext.show();
			$navPrev.hide();
		}
		else if( isLastPage ) {
			$navNext.hide();
			$navPrev.show();
		}
		else {
			$navNext.show();
			$navPrev.show();
		}

	}

	function toggleTOC() {
		var opened = $body.data( 'opened' );
		opened ? closeTOC() : openTOC();
	}

	function openTOC() {
		$navNext.hide();
		$navPrev.hide();
		$body.addClass( 'menu-push-right' ).data( 'opened', true );
	}

	function closeTOC( callback ) {

		updateNavigation( current === itemsCount - 1 );
		$body.removeClass( 'menu-push-right' ).data( 'opened', false );
		$dropdown.removeClass( 'open' ).data( 'opened', false );
		if( callback ) {
			if( supportTransitions ) {
				$body.on( transEndEventName, function() {
					$( this ).off( transEndEventName );
					callback.call();
				} );
			}
			else {
				callback.call();
			}
		}

	}
	// add keyboard events
	$( document ).keydown( function(e) {
		var keyCode = e.keyCode || e.which,
			arrow = {
				left : 37,
				right : 39
			};
		switch (keyCode) {
			case arrow.left:
				bb.prev();
			break;
			case arrow.right:
				bb.next();
			break;
		}
	} );

	return { init : init };

})();
/////////////////////////////////
// START WITH FLIP EFFECT 	
/////////////////////////////////
	Page.init();

/////////////////////////////////
// BACKROUND COLOR
/////////////////////////////////
$(document).ready(function(){
  var colors = ["#BF3636","#23A5D9","#3866F2", "A9CF54"];                
  var rand = Math.floor(Math.random()*colors.length);           
  $('#header').css("background-color", colors[rand]);
  $( '#menu-cat li.active a' ).css("background-color", colors[rand]);
});
/////////////////////////////////
// ENABLE BOOTSTRAP TOOLTIPS
/////////////////////////////////	
$("[rel='tooltip']").tooltip({
  'selector': '',
  'placement': 'bottom',
  'container':'body'
 });
/////////////////////////////////
// FADE IN TIPS
/////////////////////////////////
setTimeout(function(){ jQuery("#init-overlay").fadeOut(); }, 10000);