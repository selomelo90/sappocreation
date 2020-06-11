/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/ag/Z00_HelloWorld4/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});