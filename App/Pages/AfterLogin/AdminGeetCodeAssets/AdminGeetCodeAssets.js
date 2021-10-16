'use strict';
define([appLocation.userPostLogin], function (app) {

    app.controller('userAfterLoginAdminGeetCodeAssets', function ($scope, $http, $rootScope, $location, $routeParams) {
        $('title').html("edit page"); //TODO: change the title so cann't be tracked in log
        if ($routeParams.page == undefined) {
            $routeParams.page = 1;
        }

        console.log($routeParams.page);
        initAdminImageAsset();
        $scope.leetCodeQuestions = {};
        $scope.SearchBoxText = "";
        function initAdminImageAsset() {

            startBlockUI('wait..', 3);

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/AdminGeetCodeAssets?page='+$routeParams.page,
                method: "GET",
                headers: headers
            }).success(function (data, status, headers, config) {
                stopBlockUI();
                
                $scope.leetCodeQuestions = data.payload;
            }).error(function (data, status, headers, config) {
                stopBlockUI();
                if (status === statusCodes[401]) {
                    logoutUser();
                }
            });

        }

        $scope.updateMenuLable = function () {
            startBlockUI('wait..', 3);

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $scope.test = [
                {
                    "slug": "courses"                    
                }]

            $http({
                url: '/api/LearningMenuAssets',
                method: "PUT",
                data: JSON.stringify($scope.test),
                headers: headers
            }).success(function (data, status, headers, config) {
                stopBlockUI();
                if (data.status == 200) {
                    showToastMessage("Success", "Successfully Updated Menu.");
                }
                else {
                    showToastMessage("Error", "Not able to update.");
                }
                
                
            }).error(function (data, status, headers, config) {
                stopBlockUI();
                if (status === statusCodes[401]) {
                    logoutUser();
                }
            });
        };

        $scope.keyPressed = function (keyEvent) {
            if (keyEvent.keyCode === 13) {
                $scope.SearchImageAsset();
            }
        };

        $scope.openAdminEditQuestion = function (id) {
            //alert(id);
            $location.path("/questionassets/" + id);
        };

        $scope.SearchImageAsset = function () {
            startBlockUI('wait..', 3);

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/AdminGeetCodeAssetsSearch?q=' + $scope.SearchBoxText,
                method: "GET",
                headers: headers
            }).success(function (data, status, headers, config) {
                stopBlockUI();
                $scope.leetCodeQuestions = data.payload;
            }).error(function (data, status, headers, config) {
                stopBlockUI();
                if (status === statusCodes[401]) {
                    logoutUser();
                }
            });
        };
        
    });
    
});

