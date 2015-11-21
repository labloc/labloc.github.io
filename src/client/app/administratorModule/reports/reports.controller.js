(function () {
    'use strict';

    angular
        .module('app.administrator')
        .controller('ReportsController', ReportsController);

    /* @ngInject */
    function ReportsController(dataservice) {
        var vm = this;
        vm.title = 'Sesizari';
        vm.reports = {};

        activate();

        function activate() {
            getReports();
        }

        function getReports() {
            dataservice.admin.getReports()
                .then(function (res) {
                    vm.reports = res.reports;
                });
        }

    }
})();
