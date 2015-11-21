(function() {
    'use strict';

    angular
        .module('app.owner')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'owner-news',
                config: {
                    url: '/owner/news',
                    templateUrl: 'app/ownerModule/news/news.html',
                    controller: 'oNewsController',
                    controllerAs: 'vm',
                    title: 'Anunturi',
                    settings: {
                        nav: 1,
                        type:'owner',
                        content: '<i class="mdi-communication-forum"></i> Anunturi'
                    }
                }
            },
            {
                state: 'owner-index',
                config: {
                    url: '/owner/index',
                    templateUrl: 'app/ownerModule/index/index.html',
                    controller: 'oIndexController',
                    controllerAs: 'vm',
                    title: 'Index',
                    settings: {
                        nav: 2,
                        type:'owner',
                        content: '<i class="mdi-image-tune"></i> Index'
                    }
                }
            },
            {
                state: 'owner',
                config: {
                    url: '/owner/report',
                    templateUrl: 'app/ownerModule/report/report.html',
                    controller: 'oReportController',
                    controllerAs: 'vm',
                    title: 'Sesizari',
                    settings: {
                        nav: 3,
                        type:'owner',
                        content: '<i class="mdi-av-playlist-add"></i> Sesizari'
                    }
                }
            }
        ];
    }
})();
