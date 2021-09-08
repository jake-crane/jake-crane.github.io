$(function () {
    var $height = $('#height');
    var $width = $('#width');

    $height.keypress(function(){
        $('.selected').css('height', $height.val() + 'px');
    });

    $width.keypress(function(){
        $('.selected').css('width', $width.val() + 'px');
    });

});