(function () {
    'use strict';

    angular
        .module('app.owner')
        .controller('oIndexController', IndexController);

    /* @ngInject */
    function IndexController() {
        var vm = this;
        vm.title = 'Index';

    }
})();
