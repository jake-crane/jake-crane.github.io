$(function () {
    var xOffset;
    var yOffset;
    var classes = {
        moving: 'moving',
        startingPosition: 'startingPosition',
        selected: 'selected'
    };

    function getHeight($element) {
        return parseInt($element.css('height').replace("px", ""));
    }

    function getWidth($element) {
        return parseInt($element.css('width').replace("px", ""));
    }

    function getTop($element) {
        return parseInt($element.css('top').replace("px", ""));
    }

    function getLeft($element) {
        return parseInt($element.css('left').replace("px", ""));
    }

    function setHeight($element, newHeight) {
        return $element.css('height', newHeight + 'px');
    }

    function setWidth($element, newWidth) {
        return $element.css('width', newWidth + 'px');
    }

    function setTop($element, newTop) {
        return $element.css('top', newTop + 'px');
    }

    function setLeft($element, newLeft) {
        return $element.css('left', newLeft + 'px');
    }

    function deleteElement(e) {
        $(this).remove();
        $('.deleteable').remove();
        $('.selected').remove();
        $('#width').val('');
        $('#height').val('');
    }

    function selectElement(e) {
        if (e.which == 3) //right click
            return;
        var $this = $(this);
        if ($this.hasClass(classes.selected)) {
            $this.removeClass(classes.selected);
            $('.deleteable').remove();
        } else {
            $this.addClass(classes.selected);
            var $height = $('#height');
            var $width = $('#width');
            $height.val($this.css('height').replace("px", ""));
            $width.val($this.css('width').replace("px", ""));
            var $deleteIcon = $('<span class="material-icons deleteable"></span>');
            $deleteIcon.click(deleteElement);
            setLeft($deleteIcon, (getLeft($this) + getWidth($this)) - 6);
            setTop($deleteIcon, (getTop($this) - getHeight($deleteIcon) / 2) - 6);
            $('.dragPanel').append($deleteIcon);
        }
    }

    function replaceOriginal($original) {
        var $clone = $original.clone();
        $clone.attr('style', '');
        $clone.mousedown(startDrag);
        $clone.mouseup(stopDrag);
        $clone.mousemove(drag);
        $('.dragPanel').append($clone);
    }

    function startDrag(e) {
        //e.preventDefault();
        if (e.which == 3) //right click
            return;
        $('.deleteable').remove();
        var $this = $(this);
        if ($this.hasClass(classes.startingPosition))
            replaceOriginal($this);
        $this.css('z-index', '1');
        $this.addClass(classes.moving);
        xOffset = e.clientX - $this.css('left').replace("px", "");
        yOffset = e.clientY - $this.css('top').replace("px", "");
        $draggables.off('click');
    }

    function handleKeyPress(e) {
        if (e.keyCode === 46)
            deleteElement(e);
    }

    function stopDrag(e) {
        var $this = $(this);
        $this.removeClass(classes.moving);
        $this.removeClass(classes.startingPosition);
        var $draggables = $('.draggable');
        $draggables.click(selectElement);
        $draggables.keypress(handleKeyPress);
        $draggables.keydown(handleKeyPress);
        $draggables.keyup(handleKeyPress);
    }

    function drag(e) {
        var $this = $(this);
        if ($this.hasClass(classes.moving)) {
            $this.css('left', (e.clientX - xOffset) + "px");
            $this.css('top', (e.clientY - yOffset) + "px");
        }
    }

    var $draggables = $('.draggable');
    $draggables.mousedown(startDrag);
    $draggables.mouseup(stopDrag);
    $draggables.mousemove(drag);

    window.drag = {
        deleteElement: deleteElement
    };

});

