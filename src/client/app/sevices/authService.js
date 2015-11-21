(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('authService', authService);

    /* @ngInject */
    function authService($cookies, $rootScope, $http, config) {
        var service = {
            login: login,
            setCredentials: setCredentials,
            clearCredentials: clearCredentials
        };

        return service;

        function login(username, password, callback) {
            setHeader(username, password);

            return $http.get(config.apiUrl)
                .then(function (res) {
                    console.log(res);
                    return;
                    var user = res.data.result[1];
                    setCredentials(user);
                    callback(user);
                })
                .catch(function () {
                    clearCredentials();
                });

        }

        function setHeader(username, password) {
            if (username && password) {
                var authData = window.btoa(username + ':' + password);
                $cookies.put('loggedIn', authData);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + authData;
            }
        }

        function clearCredentials() {
            $cookies.remove('user');
            $cookies.remove('loggedIn');
            $rootScope.loggedUser = null;
            $http.defaults.headers.common.Authorization = 'Basic ';
        }

        function setCredentials(user) {
            if (user) {
                $cookies.putObject('user',user);
                $rootScope.loggedUser = user;
            }
        }
    }
})();
