(function () {
    'use strict';

    angular
        .module('app.administrator')
        .controller('NewsController', NewsController);

    /* @ngInject */
    function NewsController(dataservice, logger) {
        var vm = this;
        vm.title = 'Anunt';
        vm.submitNews = submitNews;

        function submitNews(){
            var reqObj = {news: vm.news};

            dataservice.admin.addNews(reqObj)
                .then(function(res){
                    vm.news = {};
                    logger.success('Salavat!');
                })
                .catch(function (err) {
                    if( err.data){
                        logger.error(err.data[0]);
                    } else {
                        logger.error(err);
                    }
                });
        }

    }
})();
