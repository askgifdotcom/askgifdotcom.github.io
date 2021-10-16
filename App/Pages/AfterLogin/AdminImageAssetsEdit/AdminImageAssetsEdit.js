'use strict';
define([appLocation.userPostLogin], function (app) {

    app.controller('userAfterLoginAdminImageAssetsEdit', function ($scope, $http, $rootScope, $routeParams) {
        $('title').html("edit page"); //TODO: change the title so cann't be tracked in log
        $scope.searchOption = 'contains';       
        console.log($routeParams.id);

        $scope.GifData = {
            id:'',
            gifUrl: '',
            title: '',
            titleHindi: '',
            tags: [],
            newTags: [],
        };

        initEditGif();
        
        var inputElm = document.querySelector('input[name=inputAdminImageAssetsEdit]'),
            whitelist = [];


        // initialize Tagify on the above input node reference
        var tagify = new Tagify(inputElm, {
            enforceWhitelist: true,
            whitelist: inputElm.value.trim().split(/\s*,\s*/) // Array of values. stackoverflow.com/a/43375571/104380
        })

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

        function initEditGif() {

            startBlockUI('wait..', 3);

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/AdminImageAssets/' + $routeParams.id,
                method: "GET",
                headers: headers
            }).success(function (data, status, headers, config) {
                stopBlockUI();
                
                $scope.GifData.id = data.payload.results[0].id;                
                $scope.GifData.title = data.payload.results[0].title;
                $scope.GifData.titleHindi = data.payload.results[0].titleHindi;
                $scope.GifData.imageUrl = data.payload.results[0].imageUrl;
                $scope.GifData.hdImageUrl = data.payload.results[0].hdImageUrl;
                $scope.GifData.gifUrl = data.payload.results[0].gifUrl;

                $scope.imageTags = [];
                for (var i = 0; i < data.payload.results[0].tags.length; i++) {
                    $scope.imageTags.push(data.payload.results[0].tags[i].name);
                }
                $scope.GifData.tags = $scope.imageTags;
                tagify.settings.whitelist.splice(0, $scope.GifData.tags.length, ...$scope.GifData.tags)
                tagify.addTags($scope.GifData.tags);  
            }).error(function (data, status, headers, config) {
                stopBlockUI();
                if (status === statusCodes[401]) {
                    logoutUser();
                }
            });

        }
        
        $scope.saveUiConfig = function () {
            updateUiConfig();
        };

        $scope.updateSearchOption = function (option) {
            $scope.searchOption = option;
        };

        

        $scope.submitGif = function () {
            
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
                url: '/api/AdminImageAssets',
                method: "PUT",
                data: JSON.stringify($scope.GifData),
                headers: headers
            }).success(function (data, status, headers, config) {
                stopBlockUI();
                
                showToastMessage("Success", "Successfully Updated User Information.");
            }).error(function (data, status, headers, config) {
                stopBlockUI();
                if (status === statusCodes[401]) {
                    logoutUser();
                }
            });

        };

        $scope.addTag = function () {
            var regexp = /^[a-zA-Z0-9--]+$/;
            if ($scope.GifData.newTagEnglish.search(regexp) === -1) {
                showToastMessage("Error", "Only Alphanumeric and hyphen (-) allowed.");
            }
            else {
                //make ajax call.
                if ($.inArray($scope.GifData.newTagEnglish, tagify.settings.whitelist) === -1) {
                    startBlockUI('wait..', 3);

                    var headers = {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + getCookie(CookieName.token)
                    };

                    $http({
                        url: '/api/AdminAddNewTag',
                        method: "POST",
                        data: JSON.stringify($scope.GifData),
                        headers: headers
                    }).success(function (data, status, headers, config) {
                        stopBlockUI();
                        showToastMessage("Success", "Successfully Added Tag.");
                        tagify.settings.whitelist.push($scope.GifData.newTagEnglish);
                        tagify.addTags($scope.GifData.newTagEnglish);
                        $scope.GifData.tags.push($scope.GifData.newTagEnglish);
                        $scope.GifData.newTagEnglish = '';
                        $scope.GifData.newTagHindi = '';
                    }).error(function (data, status, headers, config) {
                        stopBlockUI();
                        if (status === statusCodes[401]) {
                            logoutUser();
                        }
                    });
                }
                else {
                    showToastMessage("Error", "This tag already exists.");
                }
            }
        };

        $scope.translatingTitle = false;
        $scope.translateToHindi = function () {

            if ($scope.GifData.newTagEnglish === '') {
                return;
            };
            $scope.GifData.newTagEnglish = $scope.GifData.newTagEnglish.replace(/\s+/g, '-').toLowerCase();
            if ($.inArray($scope.GifData.newTagEnglish, tagify.settings.whitelist) !== -1) {
                showToastMessage("Error", "This tag already exists.");
                return;
            }

            $scope.translatingTitle = true;
            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/Translate?q=' + $scope.GifData.newTagEnglish,
                method: "GET",
                headers: headers
            }).success(function (data, status, headers, config) {
                $scope.GifData.newTagEnglish = $scope.GifData.newTagEnglish.replace(/\s+/g, '-').toLowerCase();
                $scope.GifData.newTagHindi = data.replace(/\s+/g, '-');
                $scope.translatingTitle = false;
            }).error(function (data, status, headers, config) {
                $scope.translatingTitle = false;
                if (status === statusCodes[401]) {
                    logoutUser();
                }
            });
        };

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

