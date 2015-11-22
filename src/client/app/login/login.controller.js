(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController(authService, $cookies, $state, $rootScope) {
        var vm = this;
        var user = $cookies.getObject('user');

        vm.title = 'Login';
        vm.login = login;

        routeUser(user);

        function login() {
            authService.login(vm.username, vm.password, function (res){
                if (res){
                    routeUser($rootScope.loggedUser);
                }
            });
        }

        function routeUser(user) {

            if(_.isUndefined(user)) return;

            if (user.role === 'administrator') {
                $state.go('administrator');
            } else {
                $state.go('owner');
            }
        }
    }
})();
