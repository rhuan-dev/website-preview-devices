(function ($) {
    $.fn.getBgImage = function (callback) {
        const height = 0;
        const path = $(this).css('background-image').replace('url', '').replace('(', '').replace(')', '').replace('"', '').replace('"', '');
        const tempImg = $('<img />');
        tempImg.hide(); //hide image
        tempImg.bind('load', callback);
        $('body').append(tempImg); // add to DOM before </body>
        tempImg.attr('src', path);
        $('#tempImg').remove(); //remove from DOM
    };

    // iphone
    $("body").getBgImage(function () {
        let $bodyHeight = $(this).height();
        $('body').css('height', $(this).height());
    });

    // iphone
    $(".iphone-mockup .image").getBgImage(function () {
        $('.iphone-mockup .image').css('height', $(this).height());
    });

    $(".ipad-mockup .image").getBgImage(function () {
        $('.ipad-mockup .image').css('height', $(this).height());
    });

    $(".ipad-mockup-horizontal .image").getBgImage(function () {
        $('.ipad-mockup-horizontal .image').css('height', $(this).height());
    });

    $('[data-mobile]').click(function () {
        TweenMax.to(['.ipad-mockup', '.ipad-mockup-horizontal'], .6, {
            autoAlpha: 0, x: -50, display: 'none', onComplete: function () {
                TweenMax.set('body', {className: '+=hide', height: 'auto'});
                TweenMax.to('.iphone-mockup', .6, {autoAlpha: 1, x: 0, display: 'flex'});
            }
        });
    });

    $('[data-tablet]').click(function () {
        TweenMax.to(['.iphone-mockup', '.ipad-mockup-horizontal'], .6, {
            autoAlpha: 0, x: -50, display: 'none', onComplete: function () {
                TweenMax.set('body', {className: '+=hide', height: 'auto'});
                TweenMax.to('.ipad-mockup', .6, {autoAlpha: 1, x: 0, display: 'flex'});
            }
        });
    });

    $('[data-tablet-horizontal]').click(function () {
        TweenMax.to(['.iphone-mockup', '.ipad-mockup'], .6, {
            autoAlpha: 0, x: -50, display: 'none', onComplete: function () {
                TweenMax.set('body', {className: '+=hide', height: 'auto'});
                TweenMax.to('.ipad-mockup-horizontal', .6, {autoAlpha: 1, x: 0, display: 'flex'});
            }
        });
    });

    $('[data-desktop]').click(function () {
        TweenMax.to(['.iphone-mockup', '.ipad-mockup', '.ipad-mockup-horizontal'], .6, {
            autoAlpha: 0, x: -50, display: 'none', onComplete: function () {
                TweenMax.set('body', {className: '-=hide'});
                $("body").getBgImage(function () {
                    let $bodyHeight = $(this).height();
                    $('body').css('height', $(this).height());
                });
            }
        });
    });
})(jQuery);