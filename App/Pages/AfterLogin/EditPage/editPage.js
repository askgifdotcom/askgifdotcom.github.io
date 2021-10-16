'use strict';
define([appLocation.userPostLogin], function (app) {

    app.controller('UserAfterLoginEditPage', function ($scope, $http, $rootScope) {
        $('title').html("edit page"); //TODO: change the title so cann't be tracked in log
        $scope.imageUploading = false;
        $scope.imageUploaded = false;
        $scope.avatarList = [
            "https://i.imgur.com/p1e4fSY.png",
            "https://i.imgur.com/eT4kGGW.png",
            "https://i.imgur.com/wWkrTpP.png",
            "https://i.imgur.com/eb5PQEh.png",
            "https://i.imgur.com/1qJrmk0.png"
        ];

        $scope.updateAvatar = function (url) {
            $rootScope.UserData.userInfo.profilePic = url;        
            console.log(url);
        };

        $scope.uploadFile = function () {
            var file = $scope.myFile;
            $scope.imageUploading = true;
            var fileFormData = new FormData();
            fileFormData.append('file', file);

            $http.post("/upload/imgur", fileFormData, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }

            }).success(function (response) {
                $rootScope.UserData.userInfo.profilePic = response.link;
                $scope.imageUploading = false; 
                $scope.imageUploaded = true;
            }).error(function (response) {
                $scope.imageUploading = false;
                console.log(response);
            });
        };

        $scope.updateProfile = function () {
            updateProfile();
        };

        function updateProfile() {

            startBlockUI('wait..', 3);

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/UserProfile',
                method: "PUT",
                data: JSON.stringify($rootScope.UserData),
                headers: headers
            }).success(function (data, status, headers, config) {
                stopBlockUI();
                $rootScope.UserInfo = data.payload.userInfo;
                showToastMessage("Success", "Successfully Updated User Information.");
            }).error(function (data, status, headers, config) {
                stopBlockUI();
                if (status === statusCodes[401]) {
                    logoutUser();
                }
            });

        }
    });

    /*
     A directive to enable two way binding of file field
     */
    app.directive('demoFileModel', function ($parse) {
        return {
            restrict: 'A', //the directive can be used as an attribute only

            /*
             link is a function that defines functionality of directive
             scope: scope associated with the element
             element: element on which this directive used
             attrs: key value pair of element attributes
             */
            link: function (scope, element, attrs) {
                var model = $parse(attrs.demoFileModel),
                    modelSetter = model.assign; //define a setter for demoFileModel

                //Bind change event on the element
                element.bind('change', function () {
                    //Call apply on scope, it checks for value changes and reflect them on UI
                    scope.$apply(function () {
                        //set the model value
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    });

});

