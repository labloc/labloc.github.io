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
            clearCredentials: clearCredentials,
            setAuthHeader: setAuthHeader
        };

        return service;

        function login(username, password, callback) {
            setHeader(username, password);

            $http.get(config.apiUrl + '/login')
                .then(function (res) {
                    var user = res.data;
                    console.log(user);
                    setCredentials(user);
                    callback(user);
                })
                .catch(function (e) {
                    clearCredentials();
                });

        }

        function setHeader(username, password) {
            if (username && password) {
                var authData = window.btoa(username + ':' + password);
                $cookies.put('loggedIn', authData);
                setAuthHeader(authData);
            }
        }

        function setAuthHeader(authData){
            $http.defaults.headers.common.Authorization = 'Basic '+ authData;
            $http.defaults.headers.common['Accept'] = 'application/json';
        }

        function clearCredentials() {
            $cookies.remove('user');
            $cookies.remove('loggedIn');
            $rootScope.loggedUser = null;
            delete $http.defaults.headers.common.Authorization;
        }

        function setCredentials(userObj) {
            var user = {
                id: userObj.id,
                username: userObj.username,
                name: userObj.name,
                email: userObj.email,
                roles: userObj.roles,
                address: userObj.entrance + ' '+ userObj.block + ' '+userObj.floor + ' '+ userObj.apartment
            }

            if (user) {
                if(user.roles.indexOf('ROLE_ADMIN') !== -1){
                    user.role = 'administrator';
                } else {
                    user.role = 'owner';
                }

                $cookies.putObject('user',user);
                $rootScope.loggedUser = user;
            }
        }
    }
})();
