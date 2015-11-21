(function () {
    'use strict';

    angular
        .module('app.administrator')
        .controller('NewsController', NewsController);

    /* @ngInject */
    function NewsController() {
        var vm = this;
        vm.title = 'Anunt';
        vm.submitNews = submitNews;

        function submitNews(){
            console.log(vm.news);
        }

    }
})();
