(function () {
    'use strict';

    angular
        .module('app.administrator')
        .controller('IndexCloseController', IndexCloseController);

    /* @ngInject */
    function IndexCloseController(dataservice, logger, ngDialog) {
        var vm = this;
        var currentMonth = moment().format('YYYY-MM-DD');
        vm.title = 'Indecsi';
        vm.consumptions = {};
        vm.monthsList = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
        vm.displayMonth = vm.monthsList[moment(currentMonth).month()];
        vm.changeMonth = changeMonth;
        vm.closeMonth = closeMonth;
        vm.editModal = editModal;

        getAllIndex(currentMonth);

        function getAllIndex(month){
            dataservice.admin.getAllIndex(month)
                .then(function (res) {
                    _.forEach(res.consumption, function (item) {
                        if (item.month) {
                            item.monthNumber = moment(item.month).month();
                        }
                    });
                    vm.consumptions = res.consumption;
                })
                .catch(function (err){
                    logger.error(err);
                });
        }

        function changeMonth(value){
            currentMonth = moment(currentMonth).add(parseInt(value),'month').format('YYYY-MM-DD');
            vm.displayMonth = vm.monthsList[moment(currentMonth).month()];
            getAllIndex(currentMonth);
        }

        function closeMonth(){
            var dialog = ngDialog.open({
                template: 'app/administratorModule/indexClose/closeMonth.html',
                data: {month: currentMonth, displayMonth: vm.displayMonth},
                controller: function ($scope, dataservice, logger) {

                    $scope.closeMonth = closeMonth;

                    function closeMonth(){
                        var reqObj= {month:$scope.ngDialogData.month};

                        dataservice.admin.closeMonth(reqObj)
                            .then(function(res){
                                logger.success('Closed!');
                                $scope.closeThisDialog();
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
            });

            dialog.closePromise.then(function () {
                getAllIndex(currentMonth);
            });
        }

        function editModal(con){
            var dialog = ngDialog.open({
                template: 'app/ownerModule/index/editIndex.html',
                data:{id: con.user_id, con: con},
                controller: function ($scope, dataservice, logger) {
                    var id= $scope.ngDialogData.id;
                    $scope.index = $scope.ngDialogData.con;
                    var conId = $scope.index.id;
                    $scope.index.new = {
                        month: new Date($scope.index.month),
                        index: parseInt($scope.index.index),
                        consumer: parseInt($scope.index.consumer.id)
                    };

                    $scope.saveIndex = saveIndex;

                    function saveIndex(index) {
                        var obj= {consumption: {
                            month: moment(index.month),
                            index: parseInt(index.index),
                            consumer: parseInt($scope.index.consumer.id)
                        }};
                        dataservice.owners.putIndex(id, conId, obj)
                            .then(function (res) {
                                logger.success('Saved!');
                                $scope.closeThisDialog();
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
            });

            dialog.closePromise.then(function () {
                getAllIndex(currentMonth);
            });
        }



    }
})();
