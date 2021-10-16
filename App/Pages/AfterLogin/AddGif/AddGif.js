'use strict';
define([appLocation.userPostLogin], function (app) {

    app.controller('userAfterLoginAddGif', function ($scope, $http, $window, $rootScope) {
        $('title').html("edit page"); //TODO: change the title so cann't be tracked in log
        $scope.searchOption = 'contains';
        $scope.imageUploading = false;
        $scope.imageUploaded = false;
        $scope.translatingTitle = false;
        $scope.GifData = {
            gifUrl:'',
            title: '',
            titleHindi: '',
            tags: [],
            newTags: [],
        };

        $scope.saveUiConfig = function () {
            updateUiConfig();
        };

        $scope.updateSearchOption = function (option) {
            $scope.searchOption = option;
        };

        $scope.uploadGifFile = function () {
            var file = $scope.myFile;
            $scope.imageUploading = true;
            var fileFormData = new FormData();
            fileFormData.append('file', file);

            $http.post("/upload/gifFile", fileFormData, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }

            }).success(function (response) {
                $scope.GifData.gifUrl = response.link;
                $scope.imageUploading = false;
                $scope.imageUploaded = true;
            }).error(function (response) {
                $scope.imageUploading = false;
                console.log(response);
            });
        };

        $scope.translateToHindi = function () {
            if ($scope.GifData.title === '') {                
                return;
            };
            $scope.translatingTitle = true;
            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/Translate?q=' + $scope.GifData.title,
                method: "GET",
                headers: headers
            }).success(function (data, status, headers, config) {
                $scope.GifData.titleHindi = data;
                $scope.translatingTitle = false;
            }).error(function (data, status, headers, config) {
                $scope.translatingTitle = false;
                if (status === statusCodes[401]) {
                    logoutUser();
                }
            });
        };

        $scope.submitGif = function () {

            if ($scope.GifData.gifUrl === null || $scope.GifData.gifUrl === '' || $scope.GifData.gifUrl === undefined) {
                showToastMessage("Error", "You must upload gif before submitting it.");
                return;
            };

            if ($scope.GifData.title === '') {
                showToastMessage("Error", "Title is mandatory.");
                return;
            };

            if ($scope.GifData.tags.length === 0) {
                showToastMessage("Error", "At least one tag is mandatory.");
                return;
            };

            startBlockUI('wait..', 3);

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/SubmitGif',
                method: "POST",
                data: JSON.stringify($scope.GifData),
                headers: headers
            }).success(function (data, status, headers, config) {
                stopBlockUI();                                             
                showToastMessage("Success", "Successfully Updated User Information.");
                //$window.location.reload();  
                $window.location.href = '#/pendinggif';
            }).error(function (data, status, headers, config) {
                stopBlockUI();
                if (status === statusCodes[401]) {
                    logoutUser();
                }
            });

        };
        
        // The DOM element you wish to replace with Tagify
        var input = document.querySelector('input[name=basic]');

        // initialize Tagify on the above input node reference
        new Tagify(input)

        var inputElm = document.querySelector('input[name=input]'),
            whitelist = [];
        
        // initialize Tagify on the above input node reference
        var tagify = new Tagify(inputElm, {
            enforceWhitelist: true,
            whitelist: inputElm.value.trim().split(/\s*,\s*/), // Array of values. stackoverflow.com/a/43375571/104380
            dropdown: {
                classname: "color-blue",
                enabled: 2,              // show the dropdown immediately on focus
                maxItems: 10,
                position: "text",         // place the dropdown near the typed text
                closeOnSelect: false,          // keep the dropdown open after selecting a suggestion
                highlightFirst: true
            }
        })



        // "remove all tags" button event listener
        document.querySelector('.tags--removeAllBtn')
            .addEventListener('click', tagify.removeAllTags.bind(tagify))

        // Chainable event listeners
        tagify.on('add', onAddTag)
            .on('remove', onRemoveTag)
            //.on('input', onInput)
            .on('edit', onTagEdit)
            .on('invalid', onInvalidTag)
            .on('click', onTagClick)
            .on('focus', onTagifyFocusBlur)
            .on('blur', onTagifyFocusBlur)
            .on('dropdown:hide dropdown:show', e => console.log(e.type))
            .on('dropdown:select', onDropdownSelect)
        
        // tag added callback
        function onAddTag(e) {
            console.log("onAddTag: ", e.detail);
            console.log("original input value: ", inputElm.value);            
            tagify.off('add', onAddTag) // exmaple of removing a custom Tagify event
        }

        // tag remvoed callback
        function onRemoveTag(e) {
            console.log("onRemoveTag:", e.detail, "tagify instance value:", tagify.value);
            var index = $scope.GifData.tags.indexOf(e.detail.data.value);
            $scope.GifData.tags.splice(index, 1);             
            console.log("$scope.GifData.tags value: ", $scope.GifData.tags);
        }
        
        // on character(s) added/removed (user is typing/deleting)
        function onInput(e) {
            
            if (e.detail.value.length < 2) {
                return;
            }            

            console.log("onInput: ", e.detail);
            tagify.settings.whitelist.length = 0; // reset current whitelist
            tagify.loading(true).dropdown.hide.call(tagify) // show the loader animation

            var val_text = $("#searchbox-dropdown option:selected").val();
            console.log(val_text);

            fetch('/api/searchTag?q=' + e.detail.value + '&searchOption=' + $scope.searchOption)
                .then(RES => RES.json())
                .then(function (whitelist) {
                    // update inwhitelist Array in-place
                    tagify.settings.whitelist.splice(0, whitelist.length, ...whitelist)
                    tagify.loading(false).dropdown.show.call(tagify, e.detail.value); // render the suggestions dropdown                    
                })
        }

        function onTagEdit(e) {
            console.log("onTagEdit: ", e.detail);
        }

        // invalid tag added callback
        function onInvalidTag(e) {
            console.log("onInvalidTag: ", e.detail);
        }

        // invalid tag added callback
        function onTagClick(e) {
            console.log(e.detail);
            console.log("onTagClick: ", e.detail);
        }

        function onTagifyFocusBlur(e) {
            console.log(e.type, "event fired")
        }

        function onDropdownSelect(e) {
            $scope.GifData.tags.push(e.detail.data.value);
            console.log("$scope.GifData.tags value: ", $scope.GifData.tags);
            console.log("onDropdownSelect: ", e.detail)
        }

        initAutocompleteWhiteList();

        function initAutocompleteWhiteList() {

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/GetAllGifTags',
                method: "GET",
                headers: headers
            }).success(function (data, status, headers, config) {
                tagify.settings.whitelist.splice(0, data.length, ...data)
            }).error(function (data, status, headers, config) {
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

