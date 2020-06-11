sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (JSONModel, Controller, MessageBox) {
	"use strict";

	return Controller.extend("com.ag.Z00_HelloWorld4.controller.Main", {
		onInit: function () {

			var oModel = new JSONModel({
				"PersonelData": []
			});
			this.getView().setModel(oModel, "data");
		},
		onListele: function () {
			var oSAPModel = this.getView().getModel();
			var oModel = this.getView().getModel("data");
			var oPersonelData = [];
			var oTable = this.getView().byId("idPersonelTable");
			oTable.setBusy(true);
			oSAPModel.read("/PersonelSet", {
				success: function (oData, oResponse) {
					oData.results.forEach(function (value) {
						var oPersonel = {
							"Sicil": "123",
							"AdSoyad": value.Ad + " " + value.Soyad
						};
						oSAPModel.update("/PersonelSet('" + value + "')", oPersonel, {
							success: function () {
								sap.m.MessageBox.show("Updated successfully!", {
									icon: sap.m.MessageBox.Icon.SUCCESS,
									title: "Info!"
								});
							},
							error: function () {
								sap.m.MessageBox.show("Sorry,Can not Update the Product! Please try again later.", {
									icon: sap.m.MessageBox.Icon.ERROR,
									title: "Oops!"
								});
							}
						});

						oPersonelData.push(oPersonel);
					});
					oModel.setProperty("/PersonelData", oPersonelData);
					oTable.setBusy(false);
				},
				error: function (oError) {
					oTable.setBusy(false);
				}
			});

			var oCurrentDate = new Date();
			var sDate = "" + oCurrentDate;
			var oDateText = this.getView().byId("idDate");
			oDateText.setText(sDate);

		}
	});
});