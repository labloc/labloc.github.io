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
            getAllIndex:getAllIndex,
            addUser: addUser,
            addNews: addNews,
            closeMonth: closeMonth
        };

        return service;

        function getReports() {
            return $http.get(config.apiUrl + '/reports',{
                params: {
                    limit: 100,
                    offset: 4
                }
            } )
                .then(success)
                .catch(fail);
        }

        function getAllIndex(month) {
            return $http.get(config.apiUrl + '/consumptions', {
                params: {
                    limit: 100,
                    offset: 0,
                    month: (month)?month:''
                }
            } )
                .then(success)
                .catch(fail);
        }

        function getUsers() {
            return $http.get(config.apiUrl + '/users', {
                params: {
                    limit: 100,
                    offset: 0
                }
            } )
                .then(success)
                .catch(fail);
        }

        function addUser(userObj) {
            return $http.post(config.apiUrl + '/users', userObj)
                .then(success)
                .catch(fail);
        }

        function closeMonth(month) {
            return $http.post(config.apiUrl + '/closemonths', month)
                .then(success)
                .catch(fail);
        }

        function addNews(newsObj) {
            return $http.post(config.apiUrl + '/news', newsObj)
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
