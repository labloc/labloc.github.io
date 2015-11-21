(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    /* @ngInject */
    function dataservice(loginService, ownerService) {
        var service = {
            loginService: loginService,
            owners: ownerService
        };

        return service;

    }
})();
