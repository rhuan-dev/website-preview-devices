(function ($) {
    /*
     * Structure to mockup
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
            tablet: false
        }, options);

        return this.each(function () {
            // create image and apply height to selectorContent
            const tmpImg = new Image();
            tmpImg.src = $urlImage;
            $(tmpImg).one('load', function () {
                let heightImage = tmpImg.height;

                if(settings.tablet == true) {
                    heightImage = heightImage * 0.7;
                }

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
    $('.tablet').makeMockup({
        tablet: true
    });
    $('.mobile').makeMockup();

    // buttons
    $('[data-desktop]').click(function () {
        if(!$(this).hasClass('active')) {
            TweenMax.set('[data-device]', {className: '-=active'});
            TweenMax.set($(this), {className: '+=active'});
            TweenMax.to(['.tablet', '.tablet-horizontal', '.mobile'], .4, {autoAlpha: 0, x: -100, display: 'none', onComplete: function () {
                $('.desktop').makeMockup({
                    selectorContent: $('body'),
                    complete: function() {
                        TweenMax.set('body', {height: 'auto', className: '-=hide'});
                    }
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