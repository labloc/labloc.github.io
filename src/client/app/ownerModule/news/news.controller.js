(function () {
    'use strict';

    angular
        .module('app.owner')
        .controller('oNewsController', NewsController);

    /* @ngInject */
    function NewsController() {
        var vm = this;
        vm.title = 'Anunturi';

    }
})();
