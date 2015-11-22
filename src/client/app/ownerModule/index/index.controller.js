(function () {
    'use strict';

    angular
        .module('app.owner')
        .controller('oIndexController', IndexController);

    /* @ngInject */
    function IndexController($cookies, ngDialog, dataservice) {
        var vm = this;
        var id = $cookies.getObject('user').id;
        vm.consumptions = [];
        vm.title = 'Index';

        vm.addNewModal = addNewModal;
        vm.getIndexHistory = getIndexHistory;
        vm.consumers = [];
        vm.monthsList = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];

        getConsumers();

        function addNewModal() {
            var dialog = ngDialog.open({
                template: 'app/ownerModule/index/addIndex.html',
                data:{id: id, consumers: vm.consumers},
                controller: function ($scope, dataservice, logger) {
                    $scope.index = {};
                    $scope.addIndex = addIndex;
                    var id= $scope.ngDialogData.id;

                    function addIndex(index) {
                        var reqObj = _.reduce(index.consume, function(result, item, key){
                            if(item){
                                result.push({
                                    month: moment(index.date).format('YYYY-MM-DD'),
                                    index: parseInt(item),
                                    consumer: parseInt(key)
                                });
                            }
                            return result;
                        },[]);

                        _.forEach(reqObj, function (item){
                            var request = {consumption: item};
                            makeRequest(request);
                        });

                        $scope.closeThisDialog();

                    }

                    function makeRequest(obj){
                        dataservice.owners.addIndex(id, obj)
                            .then(function (res) {
                                logger.success('Saved!');
                            })
                            .catch(function (err) {
                                logger.error(err);
                            });
                    }
                }
            });

            dialog.closePromise.then(function () {
                getIndexHistory();
            });
        }

        function getConsumers() {
            dataservice.owners.getConsumers()
                .then(function (res) {
                    vm.consumers = res.consumer;
                    getIndexHistory();
                });
        }

        function getIndexHistory() {
            dataservice.owners.getIndex(id)
                .then(function (res) {
                    _.forEach(res.consumption, function (item) {
                        if (item.month) {
                            item.monthNumber = moment(item.month).month();
                        }
                    });
                    vm.consumptions = res.consumption;
                });

        }

    }
})();
