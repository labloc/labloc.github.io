(function () {
    'use strict';

    angular
        .module('app.administrator')
        .controller('OwnersController', OwnersController);

    /* @ngInject */
    function OwnersController(ngDialog, dataservice) {
        var vm = this;
        vm.title = 'Locatari';
        vm.addOwnerModal = openModal;
        vm.owners = {};

        getOwners();

        function getOwners(){
            dataservice.admin.getUsers().then(function (res){
                vm.owners = res.user;
            });
        }


        function openModal() {
            var dialog = ngDialog.open({
                template: 'app/administratorModule/owners/addOwner.html',
                /* @ngInject */
                controller: function ($scope, dataservice, logger) {
                    $scope.owner = {};
                    $scope.addOwner = addOwner;

                    function addOwner(){
                        var reqObj = {fos_user_registration_form: $scope.owner};

                        dataservice.admin.addUser(reqObj)
                            .then(function(res){
                                $scope.owner = {};
                                logger.success('Salavat!');
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
                getOwners();
            });
        }

    }
})();
