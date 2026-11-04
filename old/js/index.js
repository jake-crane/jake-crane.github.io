$(function () {
    const sideNavLiSelector = '.sidenav h3,.sidenav > div > ul > li';
    const $liveExampleLinks = $('#liveExamples').find('a');
    const $previewContainer = $('#previewContainer');
    const $iframe = $('#preview');
    const $topNavBarLinks = $('.navbar-fixed-top').find('a');
    const $home = $('#home');
    const $contact = $('#contact');
    const $headerList = $('#headerList');
    const $homeLink = $('#homeLink');
    const $contactLink = $('#contactLink');
    const $navBarToggle = $('button.navbar-toggle');
    const $contentPanes = $($home).add($contact);

    function toggleContent($elementToShow) {
        $contentPanes.addClass('jakeHidden');
        $elementToShow.removeClass('jakeHidden');
    }

    function transition($elementToShow) {
        if ($navBarToggle.is(':visible'))
            $navBarToggle.click();
        const tl = new TimelineMax({repeat: 0});
        tl.to($contentPanes, .5, {x: '100%', clearProps: "all", onComplete: toggleContent.bind(this, $elementToShow)});
        tl.from($elementToShow, .5, {x: '100%'});
    }

    $homeLink.click(function () {
        transition($home);
    });

    $contactLink.click(function () {
        transition($contact);
    });

    $headerList.children().click(function () {
        const $this = $(this);
        const $siblings = $this.siblings();
        $this.addClass('active');
        $siblings.removeClass('active');

    });

    hideIframe(0);

    $previewContainer.resizable();

    function hideIframe(duration) {
        TweenMax.to($previewContainer, duration, {opacity: 0, scale: 0});
    }

    $liveExampleLinks.click(function () {
        const $this = $(this);
        $this.attr('target', $iframe.is(':visible') ? 'preview' : '');
        hideIframe(.5);
        $liveExampleLinks.removeClass('selectedPreview');
        $this.addClass('selectedPreview');
    });

    $iframe.load(function () {
        TweenMax.to($previewContainer, 1, {opacity: 1, scale: 1});
    });
    TweenMax.staggerFrom(sideNavLiSelector, .5, {x: -300, rotation: 90, scale: 2}, 0.1);
    TweenMax.staggerFrom($topNavBarLinks, 2, {x: 800, ease: Bounce.easeOut}, 0.1);
});
