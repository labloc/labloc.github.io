(function () {
    'use strict';

    angular
        .module('app.administrator')
        .controller('OwnersController', OwnersController);

    /* @ngInject */
    function OwnersController() {
        var vm = this;
        vm.title = 'Locatari';

    }
})();
