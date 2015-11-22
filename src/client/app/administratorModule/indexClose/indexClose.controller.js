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
                            .catch(function (err){
                                logger.error(err);
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
