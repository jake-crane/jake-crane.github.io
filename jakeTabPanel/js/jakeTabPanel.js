(function () {
    $.widget("jake.tabPanel", {
        options: {},
        _create: function () {
            this.$tabPanels = this.element.find('[tabHeader]');
            this.element.empty();
            this.$ul = $('<ul></ul>');
            for (var i = 0; i < this.$tabPanels.length; i++) {
                var tab = $('<li><a href="#">' + this.$tabPanels.eq(i).attr('tabHeader') + '</a></li>');
                this.$ul.append(tab);
            }
            this.$lis = this.$ul.children();
            this.$lis.eq(0).addClass('active');
            this.$tabPanels.hide();
            this.$tabPanels.eq(0).show();
            this.element.append(this.$ul);
            this.element.append(this.$tabPanels);
            this._bindUIActions();
        },
        _destroy: function () {
            this.$tabPanels.show();
            this.element.empty();
            this.element.append(this.$tabPanels);
        },
        _bindUIActions: function () {
            var self = this;
            this.$lis.on('click', function () {
                self.$lis.removeClass('active');
                self.$tabPanels.hide();
                var $this = $(this);
                self.$tabPanels.eq($this.index()).show();
                $this.addClass('active');
            });
        }
    });
})(jQuery);