(function ($) {
    /*
    plugin to mockup
    structure
    <div data-image="assets/images/previews/desktop.jpg" class="desktop">
        <div class="window-screen">
            <div class="inside-screen">
                <div class="content-screen"></div>
            </div>
        </div>
    </div>
     */
    $.fn.makeMockup = function (options) {
        const $this = $(this);
        const $urlImage = $this.attr('data-image');

        let settings = $.extend({
            image: $urlImage,
            selectorContent: $this.find('.content-screen'),
            complete: null,
        }, options);

        return this.each(function () {
            // create image and apply height to selectorContent
            const tmpImg = new Image();
            tmpImg.src = $urlImage;
            $(tmpImg).one('load', function () {
                let heightImage = tmpImg.height;

                settings.selectorContent.css({
                    'height': heightImage,
                    'background-image': 'url(' + settings.image + ')'
                });
            });

            if ($.isFunction(settings.complete)) {
                settings.complete.call(this);
            }
        });
    };

    // make devices
    $('.desktop').makeMockup({
        selectorContent: $('body')
    });
    $('.tablet-horizontal').makeMockup();
    $('.tablet').makeMockup();
    $('.mobile').makeMockup();

    // buttons
    $('[data-desktop]').click(function () {
        if(!$(this).hasClass('active')) {
            TweenMax.set('[data-device]', {className: '-=active'});
            TweenMax.set($(this), {className: '+=active'});
            TweenMax.to(['.tablet', '.tablet-horizontal', '.mobile'], .4, {autoAlpha: 0, x: -100, display: 'none', onComplete: function () {
                TweenMax.set('body', {height: 'auto', className: '-=hide'});
                $('.desktop').makeMockup({
                    selectorContent: $('body')
                });
            }});
        }
    });

    $('[data-tablet]').click(function () {
        if(!$(this).hasClass('active')) {
            TweenMax.set('[data-device]', {className: '-=active'});
            TweenMax.set($(this), {className: '+=active'});
            TweenMax.to(['.tablet-horizontal', '.mobile'], .4, {autoAlpha: 0, x: -100, display: 'none', onComplete: function () {
                TweenMax.set('body', {height: 'auto', className: '+=hide'});
                TweenMax.fromTo($('.tablet'), .6, {autoAlpha: 0, display: 'none', x: -100}, {autoAlpha: 1, display: 'flex', x: 0});
            }});
        }
    });

    $('[data-tablet-horizontal]').click(function () {
        if(!$(this).hasClass('active')) {
            TweenMax.set('[data-device]', {className: '-=active'});
            TweenMax.set($(this), {className: '+=active'});
            TweenMax.to(['.tablet', '.mobile'], .4, {autoAlpha: 0, x: -100, display: 'none', onComplete: function () {
                TweenMax.set('body', {height: 'auto', className: '+=hide'});
                TweenMax.fromTo($('.tablet-horizontal'), .6, {autoAlpha: 0, display: 'none', x: -100}, {autoAlpha: 1, display: 'flex', x: 0});
            }});
        }
    });

    $('[data-mobile]').click(function () {
        if(!$(this).hasClass('active')) {
            TweenMax.set('[data-device]', {className: '-=active'});
            TweenMax.set($(this), {className: '+=active'});
            TweenMax.to(['.tablet', '.tablet-horizontal'], .4, {autoAlpha: 0, x: -100, display: 'none', onComplete: function () {
                TweenMax.set('body', {height: 'auto', className: '+=hide'});
                TweenMax.fromTo($('.mobile'), .6, {autoAlpha: 0, display: 'none', x: -100}, {autoAlpha: 1, display: 'flex', x: 0});
            }});
        }
    });
})(jQuery);