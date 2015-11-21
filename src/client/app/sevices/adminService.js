(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('adminService', adminService);

    /* @ngInject */
    function adminService($http, exception, config) {
        var service = {
            getReports: getReports,
            getUsers: getUsers,
            addUser: addUser
        };

        return service;

        function getReports() {
            return $http.get(config.apiUrl + '/reports')
                .then(success)
                .catch(fail);
        }

        function getUsers() {
            return $http.get(config.apiUrl + '/users')
                .then(success)
                .catch(fail);
        }

        function addUser(userObj) {
            return $http.post(config.apiUrl + '/users', userObj)
                .then(success)
                .catch(fail);
        }


        function success(response) {
            return response.data;
        }

        function fail(e) {
            return exception.catcher('XHR Failed')(e);
        }
    }
})();
