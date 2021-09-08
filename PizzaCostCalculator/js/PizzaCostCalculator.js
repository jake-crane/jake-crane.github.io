$(function () {
    var $smallInches = $('#smallInches').keypress(refresh);
    var $mediumInches = $('#mediumInches').keypress(refresh);
    var $largeInches = $('#largeInches').keypress(refresh);
    var $xlInches = $('#xlInches').keypress(refresh);

    var $smallPrice = $('#smallPrice').keypress(refresh);
    var $mediumPrice = $('#mediumPrice').keypress(refresh);
    var $largePrice = $('#largePrice').keypress(refresh);
    var $xlPrice = $('#xlPrice').keypress(refresh);

    var $smallPPSI = $('#smallPPSI');
    var $mediumPPSI = $('#mediumPPSI');
    var $largePPSI = $('#largePPSI');
    var $xlPPSI = $('#xlPPSI');

    function calculatePPSI(diameterInches, price) {
        var radius = diameterInches / 2;
        var area = Math.PI * (radius * radius);
        var result =  parseFloat(price / area).toFixed(3);
        return result;
    }

    function refresh(e) {
        if (e && e.which === 13)
            $(this).blur();
        $smallPPSI.text(calculatePPSI($smallInches.val(), $smallPrice.val()));
        $mediumPPSI.text(calculatePPSI($mediumInches.val(), $mediumPrice.val()));
        $largePPSI.text(calculatePPSI($largeInches.val(), $largePrice.val()));
        $xlPPSI.text(calculatePPSI($xlInches.val(), $xlPrice.val()))
    }

    refresh();
});