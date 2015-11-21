(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    /* @ngInject */
    function dataservice(loginService) {
        var service = {
            loginService: loginService
        };

        return service;

    }
})();
