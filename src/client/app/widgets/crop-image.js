(function cropImageController() {
    'use strict';

    angular
        .module('app.widgets')
        .controller('CropImageController', cropController);

    cropController.$inject = ['$scope', '$timeout', 'logger'];
    /* @ngInject */
    function cropController($scope, $timeout, logger) {
        $scope.myImage = '';
        $scope.myCroppedImage = null;
        $scope.saveCroppedImage = saveImage;
        var fileInput = null;
        $scope.errorType = null;

        $timeout(function modalLoaded() {
            fileInput = angular.element(document.querySelector('#fileInput'));
            fileInput.on('change', handleFileSelect);

            angular.element('.cropArea').bind('click', function unnamed(e) {
                e.preventDefault();
                angular.element('#fileInput').click();
            });
        }, 1000);

        var handleFileSelect = function handle(evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function load(evt) {
                checkImageExtension();
                $scope.$apply(function apply($scope) {
                    $scope.myImage = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };

        function saveImage() {
            if (fileInput.val()) {
                $scope.closeThisDialog($scope.myCroppedImage);
            } else {
                $scope.errorType = true;
                logger.error('Please select an image');
            }
        }

        function checkImageExtension() {
            if (!/(\.png|\.bmp|\.gif|\.jpg|\.jpeg)$/i.test(fileInput.val())) {
                logger.error('Invalid image file type.');
                $scope.errorType = true;
                fileInput.val('');
                $scope.myImage = '';
                $scope.myCroppedImage = null;
                return false;
            } else {
                angular.element('.cropArea').unbind();
                $scope.errorType = null;
            }
        }

    }
})();
