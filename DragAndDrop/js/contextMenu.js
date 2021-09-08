$(function () {
    $.contextMenu({
        selector: '.draggable',
        callback: function (key, options) {
            if (key === 'delete') {
                drag.deleteElement.apply(this);
            } else {

                var m = "clicked: " + key;
                window.console && console.log(m) || alert(m);
            }
        },
        items: {
            "edit": {name: "Edit", icon: "edit"},
            "cut": {name: "Cut", icon: "cut"},
            copy: {name: "Copy", icon: "copy"},
            "paste": {name: "Paste", icon: "paste"},
            "delete": {name: "Delete", icon: "delete"},
            "sep1": "---------",
            "quit": {
                name: "Quit", icon: function () {
                    return 'context-menu-icon context-menu-icon-quit';
                }
            }
        }
    });
});