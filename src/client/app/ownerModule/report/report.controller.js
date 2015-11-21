(function () {
    'use strict';

    angular
        .module('app.owner')
        .controller('oReportController', ReportController);

    /* @ngInject */
    function ReportController(ngDialog) {
        var vm = this;
        vm.title = 'Sesizari';
        vm.report = {};
        vm.categories = ['Reclamatie', 'Sugestie', 'Altele'];
        vm.submitReport = submitReport;
        vm.addPicture = addPicture;

        function submitReport(){

            console.log(vm.report);
        }

        function addPicture() {
            ngDialog.open({
                template: 'app/widgets/crop-image.html',
                controller: 'CropImageController',
                preCloseCallback: function getValue(value) {
                    if (value && value.length > 50) {
                        vm.report.upload = value;
                    }
                }
            });
        }


    }
})();
