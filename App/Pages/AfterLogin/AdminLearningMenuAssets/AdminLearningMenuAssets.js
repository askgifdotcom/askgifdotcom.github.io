'use strict';
define([appLocation.userPostLogin], function (app) {

    app.controller('userAfterLoginAdminLearningMenuAssets', function ($scope, $http, $rootScope, $location, $filter) {
        $('title').html("edit page"); //TODO: change the title so cann't be tracked in log
        $scope.menuType = "root";
        initAdminImageAsset();
        $scope.learningMenus = {};
        $scope.SearchBoxText = "";
        
        function initAdminImageAsset() {

            startBlockUI('wait..', 3);

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/LearningMenuAssets/' + $scope.menuType,
                method: "GET",
                headers: headers
            }).success(function (data, status, headers, config) {
                stopBlockUI();
                
                $scope.learningMenus = data.payload;
                $scope.allowedLearningMenuTypes = data.allowedLearningMenuTypes;
            }).error(function (data, status, headers, config) {
                stopBlockUI();
                if (status === statusCodes[401]) {
                    logoutUser();
                }
            });

        }

        $scope.updateMenu = function (slug) {
            var menu = $filter('filter')($scope.learningMenus, { slug: slug })[0];
            console.log("updating : " + slug);
            console.log(menu);
            $scope.updateSingleMenuLable(slug, menu);
            console.log("success");
        };

        $scope.updateSingleMenuLable = function (slug, menu) {
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
                url: '/api/LearningMenuAssets/'+slug,
                method: "PUT",
                data: JSON.stringify(menu),
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

        $scope.addMenuLable = function () {
            $scope.newMenu = {
                slug: 'newSlug',
                lable: 'newLable',
                navIconFa: 'fas fa-laptop-code',
                href: '#',
                child: "",
                type: $scope.menuType,
                isNew: true 
            };

            $scope.learningMenus.push($scope.newMenu);
        };

        $scope.keyPressed = function (keyEvent) {
            if (keyEvent.keyCode === 13) {
                $scope.SearchImageAsset();
            }
        };

        $scope.updateMenuAsset = function (menuType) {
            $scope.menuType = menuType;
            initAdminImageAsset();
        };
        
    });
    
});

