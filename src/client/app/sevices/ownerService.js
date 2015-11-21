(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('ownerService', ownerService);

    /* @ngInject */
    function ownerService($http, exception, config) {
        var service = {
            addReport: addReport,
            addIndex: addIndex,
            getIndex: getIndex,
            getConsumers: getConsumers,
            getNews: getNews
        };

        return service;

        function addReport(reportObj) {
            return $http.post(config.apiUrl + '/reports', reportObj)
                .then(success)
                .catch(fail);

        }

        function getIndex(){
            return $http.get(config.apiUrl + '/index')
                .then(success)
                .catch(fail);
        }

        function addIndex(indexObj) {
            return $http.post(config.apiUrl + '/index', indexObj)
                .then(success)
                .catch(fail);
        }

        function getConsumers(){
            return $http.get(config.apiUrl + '/index/consumers')
                .then(success)
                .catch(fail);
        }

        function getNews(){
            return $http.get(config.apiUrl + '/news')
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
