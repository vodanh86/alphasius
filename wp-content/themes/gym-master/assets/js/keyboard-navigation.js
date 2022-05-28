/**
 * File keyboard-navigation.js.
 *
 * Handles to support keyboar navigation
 */
$ = jQuery
jQuery(document).ready(function () {

//keyboard navigation for mean menu
    var myEvents = {
        click: function(e) {
            if ( jQuery(this).hasClass('menu-item-has-children') ) {
                jQuery(this).find('.mean-expand').addClass('mean-clicked').text('-');
            }
            jQuery(this).siblings('li').find('.mean-expand').removeClass('mean-clicked').text('+');
            jQuery(this).children('.sub-menu').show().end().siblings('li').find('ul').hide();

        },

        keydown: function(e) {
            e.stopPropagation();

            if (e.keyCode == 9) {


                if (!e.shiftKey &&
                    ( jQuery('.mean-bar li').index( jQuery(this) ) == ( jQuery('.mean-bar li').length-1 ) ) ){
                    jQuery('.meanclose').trigger('click');
                }  else if( jQuery('.mean-bar li').index( jQuery(this) ) == 0 ) {
                    $('.meanclose').removeClass('onfocus');
                }
                else if (e.shiftKey && jQuery('.mean-bar li').index(jQuery(this)) === 0)
                    jQuery('.mean-bar ul:first > li:last').focus().blur();
            }
        },

        keyup: function(e) {
            e.stopPropagation();
            if (e.keyCode == 9) {
                if (myEvents.cancelKeyup) myEvents.cancelKeyup = false;
                else myEvents.click.apply(this, arguments);
            }
        }
    }

    jQuery(document)
        .on('click', 'li', myEvents.click)
        .on('keydown', 'li', myEvents.keydown)
        .on('keyup', 'li', myEvents.keyup);

    jQuery('.mean-bar li').each(function(i) { this.tabIndex = i; });

    // search toggle on focus out event
    jQuery( '.header-search-input form' ).on( 'focusout', function () {
        var $elem = jQuery(this);
        // let the browser set focus on the newly clicked elem before check
        setTimeout(function () {
            if ( ! $elem.find( ':focus' ).length ) {
                jQuery( '.header-search-icon' ).trigger( 'click' );
                $( '.header-search-icon' ).focus();
            }
        }, 0);
    });

});
