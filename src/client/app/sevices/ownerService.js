(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('ownerService', ownerService);

    /* @ngInject */
    function ownerService($http, exception, config) {
        var service = {
            addReport: addReport
        };

        return service;

        function addReport(reportObj) {
            return $http.post(config.apiUrl + '/reports', reportObj)
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
