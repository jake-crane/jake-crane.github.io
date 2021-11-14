(function () {
	'use strict';

	function escapeHTML(s) {
		return s.replace(/&/g, '&amp;')
			.replace(/"/g, '&quot;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	}

	window.addEventListener("load", function () {
		var template = document.getElementById('html-template');
		var code = document.getElementById('html-code');
		code.innerHTML = escapeHTML(template.innerHTML);
		Prism.highlightElement(code);
	});

})();