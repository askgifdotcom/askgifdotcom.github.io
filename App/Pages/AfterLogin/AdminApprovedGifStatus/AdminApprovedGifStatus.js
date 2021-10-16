'use strict';
define([appLocation.userPostLogin], function (app) {

    app.controller('userAfterLoginAdminApprovedGifStatus', function ($scope, $http, $rootScope, $location) {
        $('title').html("edit page"); //TODO: change the title so cann't be tracked in log
        getGifWithStatus('accepted');
        $scope.CurrentScope = "accepted";
        
        function getGifWithStatus(gifstatus) {

            startBlockUI('wait..', 3);

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/GetAdminGifWithStatus/' + gifstatus,
                method: "GET",
                headers: headers
            }).success(function (data, status, headers, config) {
                stopBlockUI();
                $scope.adminApprovedGifs = data.payload;
                for (var i = 0; i < $scope.adminApprovedGifs.length; i++) {
                    $scope.adminApprovedGifs[i].dateModifiedTimeAgo = moment($scope.adminApprovedGifs[i].dateModified).fromNow();
                }

                $scope.CurrentScope = gifstatus;
            }).error(function (data, status, headers, config) {
                stopBlockUI();
                if (status === statusCodes[401]) {
                    logoutUser();
                }
            });

        }

        $scope.getGifWithStatus = function (status) {
            getGifWithStatus(status);            
        };

        $scope.openAdminEditGif = function (id) {
            if ($scope.CurrentScope === "accepted") {
                $location.path("/adminapprovegif/" + id);
            }
            else {
                showToastMessage("Error", "Only Accepted Gifs can be edited.");
            }
            //$location.path("/adminapprovegif/"+id);
        };
        
        
    });
    
});

