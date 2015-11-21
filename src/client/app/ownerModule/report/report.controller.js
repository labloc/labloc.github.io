(function () {
    'use strict';

    angular
        .module('app.owner')
        .controller('oReportController', ReportController);

    /* @ngInject */
    function ReportController() {
        var vm = this;
        vm.title = 'Sesizari';
        vm.report = {};
        vm.submitReport = submitReport;

        function submitReport(){
            console.log(vm.report);
        }
    }
})();
