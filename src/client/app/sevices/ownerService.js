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
            putIndex: putIndex,
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

        function getIndex(id){
            return $http.get(config.apiUrl + '/users/' + id +'/consumptions', {
                params: {
                    limit: 100,
                    offset: 0
                }
            })
                .then(success)
                .catch(fail);
        }

        function addIndex(id, indexObj) {
            return $http.post(config.apiUrl + '/users/' + id +'/consumptions', indexObj)
                .then(success)
                .catch(fail);
        }

        function putIndex(id, conId, reqObj) {
            return $http.put(config.apiUrl + '/users/' + id +'/consumptions/'+conId, reqObj)
                .then(success)
                .catch(fail);
        }

        function getConsumers(){
            return $http.get(config.apiUrl + '/consumer')
                .then(success)
                .catch(fail);
        }

        function getNews(){
            return $http.get(config.apiUrl + '/news', {
                params:{
                    sort: 'DESC'
                }
            })
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
