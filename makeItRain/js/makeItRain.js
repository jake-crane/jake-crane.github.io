(function ($) {
    $(function () {
        var $money = $('<span class="money"/>');
        var documentHeight = $(document).height();
        var documentWidth = $(document).width();
        var defaults = {
            minSize: 10,
            maxSize: 20,
            millis: 500
        };

        var interval = setInterval(function () {
            var startPositionLeft = Math.random() * documentWidth - 100;
            var startOpacity = 0.5 + Math.random();
            var size = defaults.minSize + Math.random() * defaults.maxSize;
            var endPositionTop = documentHeight - 40;
            var endPositionLeft = startPositionLeft - 100 + Math.random() * 200;
            var fallDuration = documentHeight * 10 + Math.random() * 5000;

            var $newMoney = $money.clone();
            $newMoney.css(
                {
                    left: startPositionLeft,
                    opacity: startOpacity,
                    'font-size': size
                }
            );
            $newMoney.animate(
                {
                    top: endPositionTop,
                    left: endPositionLeft,
                    opacity: 0.2
                },
                fallDuration,
                'linear',
                function () {
                    $(this).remove()
                }
            );
            $newMoney.appendTo('body');
        }, defaults.millis);
    });
})(jQuery);