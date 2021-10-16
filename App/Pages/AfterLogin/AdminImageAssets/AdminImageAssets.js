'use strict';
define([appLocation.userPostLogin], function (app) {

    app.controller('userAfterLoginAdminImageAssets', function ($scope, $http, $rootScope, $location) {
        $('title').html("edit page"); //TODO: change the title so cann't be tracked in log
        initAdminImageAsset();
        $scope.SearchBoxText = "";
        function initAdminImageAsset() {

            startBlockUI('wait..', 3);

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/AdminImageAssets',
                method: "GET",
                headers: headers
            }).success(function (data, status, headers, config) {
                stopBlockUI();
                for (var i = 0; i < data.payload.results.length; i++) {
                    data.payload.results[i].imageUrl = gifBasePath + data.payload.results[i].imageUrl;
                }
                $scope.adminImageAssets = data.payload;
            }).error(function (data, status, headers, config) {
                stopBlockUI();
                if (status === statusCodes[401]) {
                    logoutUser();
                }
            });

        }

        $scope.openAdminEditGif = function (id) {
            //alert(id);
            $location.path("/imageassets/"+id);
        };

        $scope.keyPressed = function (keyEvent) {
            if (keyEvent.keyCode === 13) {
                $scope.SearchImageAsset();
            }
        };

        $scope.SearchImageAsset = function () {
            startBlockUI('wait..', 3);

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/AdminImageAssetsSearch?q=' + $scope.SearchBoxText,
                method: "GET",
                headers: headers
            }).success(function (data, status, headers, config) {
                stopBlockUI();
                for (var i = 0; i < data.payload.results.length; i++) {
                    data.payload.results[i].imageUrl = gifBasePath + data.payload.results[i].imageUrl;
                }
                $scope.adminImageAssets = data.payload;
            }).error(function (data, status, headers, config) {
                stopBlockUI();
                if (status === statusCodes[401]) {
                    logoutUser();
                }
            });
        };
        
    });
    
});

