(function () {
    'use strict';

    angular
        .module('app.administrator')
        .controller('ReportsController', ReportsController);

    /* @ngInject */
    function ReportsController() {
        var vm = this;
        vm.title = 'Sesizari';
        vm.report = {};
        vm.submitReport = submitReport;

        function submitReport(){
            debugger;
            console.log(vm.report);
        }

    }
})();
