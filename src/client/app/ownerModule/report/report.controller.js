(function () {
    'use strict';

    angular
        .module('app.owner')
        .controller('oReportController', ReportController);

    /* @ngInject */
    function ReportController(ngDialog, dataservice, logger) {
        var vm = this;
        vm.title = 'Sesizari';
        vm.report = {};
        vm.categories = ['Reclamatie', 'Sugestie', 'Altele'];
        vm.submitReport = submitReport;
        vm.addPicture = addPicture;

        function submitReport(){
            var reqObj = {report: vm.report};

            dataservice.owners.addReport(reqObj)
                .then(function(res){
                    vm.report = {};
                    logger.success('Saved!');
                })
                .catch(function (err) {
                    if( err.data){
                        logger.error(err.data[0]);
                    } else {
                        logger.error(err);
                    }
                });
        }

        function addPicture() {
            ngDialog.open({
                template: 'app/widgets/crop-image.html',
                controller: 'CropImageController',
                preCloseCallback: function getValue(value) {
                    if (value && value.length > 50) {
                        vm.report.upload = value;
                    }
                }
            });
        }


    }
})();
