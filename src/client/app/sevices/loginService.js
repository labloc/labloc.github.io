(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('loginService', loginService);

    /* @ngInject */
    function loginService($http, $q, exception, config) {
        var service = {
            login: login
        };

        return service;

        function login() {
            return $http.get(config.apiUrl)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed')(e);
            }
        }
    }
})();
