'use strict';
define([appLocation.userPostLogin], function (app) {

    app.controller('userAfterLoginAdminPendingBlog', function ($scope, $http, $rootScope, $location) {
        $('title').html("edit page"); //TODO: change the title so cann't be tracked in log
        initAdminPendingGif();

        function initAdminPendingGif() {

            startBlockUI('wait..', 3);

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/GetAdminBlog',
                method: "GET",
                headers: headers
            }).success(function (data, status, headers, config) {
                stopBlockUI();
                $scope.adminPendingGifs = data.payload;
                for (var i = 0; i < $scope.adminPendingGifs.length; i++) {
                    $scope.adminPendingGifs[i].dateModifiedTimeAgo = moment($scope.adminPendingGifs[i].dateModified).fromNow();
                }
            }).error(function (data, status, headers, config) {
                stopBlockUI();
                if (status === statusCodes[401]) {
                    logoutUser();
                }
            });

        }

        $scope.openAdminEditGif = function (id) {
            //alert(id);
            $location.path("/adminapproveblog/"+id);
        };
        
        
    });
    
});

