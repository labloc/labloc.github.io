(function () {
    'use strict';

    angular
        .module('app.owner')
        .controller('oNewsController', NewsController);

    /* @ngInject */
    function NewsController(dataservice) {
        var vm = this;
        vm.title = 'Anunturi';
        vm.news = [];

        getNews();

        function getNews(){
            dataservice.owners.getNews()
                .then(function (res) {
                    vm.news = res.news;
                });
        }

    }
})();
