(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    /* @ngInject */
    function dataservice(loginService, ownerService, adminService) {
        var service = {
            loginService: loginService,
            owners: ownerService,
            admin: adminService
        };

        return service;

    }
})();
