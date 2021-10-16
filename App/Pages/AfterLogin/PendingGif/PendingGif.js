'use strict';
define([appLocation.userPostLogin], function (app) {

    app.controller('userAfterLoginPendingGif', function ($scope, $http, $rootScope, $location) {
        $('title').html("edit page"); //TODO: change the title so cann't be tracked in log
        $scope.CurrentScope = "new";
        getGifWithStatus('new');

        function getGifWithStatus(gifstatus) {

            startBlockUI('wait..', 3);

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/GetUserGifWithStatus/' + gifstatus,
                method: "GET",
                headers: headers
            }).success(function (data, status, headers, config) {
                stopBlockUI();
                $scope.pendingGifs = data.payload;
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

        $scope.EditGifOption = function (id) {
            //alert(id);
            $location.path("/editgif/"+id);
        };
        
        $scope.DeleteGifOption = function (id) {            
            var r = confirm("Are you sure you want to delete it!");
            if (r === true) {
                startBlockUI('wait..', 3);

                var headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getCookie(CookieName.token)
                };

                $http({
                    url: '/api/DeleteGif/' + id,
                    method: "Delete",
                    headers: headers
                }).success(function (data, status, headers, config) {
                    stopBlockUI();                    
                    for (var i = 0; i < $scope.pendingGifs.length; i++) {
                        if ($scope.pendingGifs[i].id === id) {
                            $scope.pendingGifs.splice(i, 1);
                            console.log("item removed at pos: " + i);
                        }
                    }                    
                    
                }).error(function (data, status, headers, config) {
                    stopBlockUI();
                    if (status === statusCodes[401]) {
                        logoutUser();
                    }
                });
            }             
        };
    });
    
});

