(function () {
    'use strict';

    angular
        .module('app.owner')
        .controller('oIndexController', IndexController);

    /* @ngInject */
    function IndexController() {
        var vm = this;
        vm.title = 'Index';

        vm.addIndex = addIndex;
        vm.consumers = [];
        vm.monthsList = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
        vm.saveIndex = saveIndex;

        function addIndex(){

        }

        function saveIndex(index){
            console.log(index);
        }

    }
})();
