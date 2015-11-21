(function() {
    'use strict';

    angular
        .module('app.administrator')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'administrator',
                config: {
                    url: '/admin/owners',
                    templateUrl: 'app/administratorModule/owners/owners.html',
                    controller: 'OwnersController',
                    controllerAs: 'vm',
                    title: 'Locatari',
                    settings: {
                        nav: 1,
                        type:'administrator',
                        content: '<i class="mdi-social-domain"></i> Locatari'
                    }
                }
            },
            {
                state: 'administrator-news',
                config: {
                    url: '/admin/news',
                    templateUrl: 'app/administratorModule/news/news.html',
                    controller: 'NewsController',
                    controllerAs: 'vm',
                    title: 'Anunt',
                    settings: {
                        nav: 2,
                        type:'administrator',
                        content: '<i class="mdi-editor-insert-comment"></i> Anunt'
                    }
                }
            },
            {
                state: 'administrator-reports',
                config: {
                    url: '/admin/reports',
                    templateUrl: 'app/administratorModule/reports/reports.html',
                    controller: 'ReportsController',
                    controllerAs: 'vm',
                    title: 'Sesizari',
                    settings: {
                        nav: 3,
                        type:'administrator',
                        content: '<i class="mdi-action-description"></i> Sesizari'
                    }
                }
            }
        ];
    }
})();
