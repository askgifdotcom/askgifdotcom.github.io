'use strict';
define([appLocation.userPostLogin], function (app) {

    app.controller('userAfterLoginAdminApproveBlog', function ($scope, $http, $rootScope, $routeParams, $window, $location) {
        $('title').html("edit page"); //TODO: change the title so cann't be tracked in log
        $scope.searchOption = 'contains';
        $scope.imageUploading = false;
        $scope.imageUploaded = false;
        console.log($routeParams.id);

        $scope.GifData = {
            id:'',
            gifUrl: '',
            title: '',
            titleHindi: '',
            tags: [],
            newTags: [],
            position: 'bottom-right',
            background: 'white-black'
        };
        initEditGif();

        function initEditGif() {

            startBlockUI('wait..', 3);

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/GetBlog/' + $routeParams.id,
                method: "GET",
                headers: headers
            }).success(function (data, status, headers, config) {
                stopBlockUI();
                if (data.payload.subState === null || data.payload.subState.length === 0) {
                    initEditGifModel(data.payload);
                }
                else {
                    showToastMessage("Error", "Sorry this gif is already started processing. it can't be changed.");
                    $location.path("/adminapprovedgifstatus");
                }
            }).error(function (data, status, headers, config) {
                stopBlockUI();
                if (status === statusCodes[401]) {
                    logoutUser();
                }
            });

        }

        function initEditGifModel(gifData) {

            if (gifData === undefined) {
                return;
            }

            $scope.GifData.id = gifData.id;
            $scope.GifData.gifUrl = gifData.gifUrl;
            $scope.GifData.title = gifData.title;
            $scope.GifData.titleHindi = gifData.titleHindi;
            $scope.GifData.tags = gifData.tags;
            $scope.GifData.newTags = gifData.newTags;
            $scope.GifData.tinyMCE1 = gifData.tinyMCE1;

            if (gifData.position !== null && gifData.position !== "") {
                $scope.GifData.position = gifData.position;
            }            

            if (gifData.background !== null && gifData.background !== "") {
                $scope.GifData.background = gifData.background;
            }               

            $scope.GifData.tagstr = gifData.tags.join();
            $scope.imageUploaded = true;

            tagify.settings.whitelist.splice(0, gifData.tags.length, ...gifData.tags)
            tagify.addTags(gifData.tags);
        }

        // The DOM element you wish to replace with Tagify
        var input = document.querySelector('input[name=basicAdminApproveGif]');

        // initialize Tagify on the above input node reference
        new Tagify(input)

        var inputElm = document.querySelector('input[name=inputAdminApproveGif]'),
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

        $scope.$on('editgif', function () {
            console.log("broadcasted editgif");
            initEditGifModel();
        });

        if ($rootScope.UserData !== undefined && $rootScope.UserData !== null) {
            initEditGifModel();
        }
        
        
        $scope.addTag = function () {            
            var regexp = /^[a-zA-Z0-9--]+$/;            
            if ($scope.GifData.newTagEnglish.search(regexp) === -1)
            {
                showToastMessage("Error", "Only Alphanumeric and hyphen (-) allowed.");
            }
            else
            {
                //make ajax call.
                if ($.inArray($scope.GifData.newTagEnglish, tagify.settings.whitelist) === -1) {
                    startBlockUI('wait..', 3);

                    var headers = {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + getCookie(CookieName.token)
                    };

                    $http({
                        url: '/api/AdminAddNewBlogTag',
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

        $scope.selectWatermarkPosition = function (position) {
            $scope.GifData.position = position;
        };

        $scope.selectWatermarkBackground = function (background) {
            $scope.GifData.background = background;
        };

        $scope.updateSearchOption = function (option) {
            $scope.searchOption = option;
        };

        initAutocompleteWhiteList();

        function initAutocompleteWhiteList() {

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/GetAllBlogTags',
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

        $scope.addWatermarkGifFile = function () {
            startBlockUI('wait..', 3);

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/AdminAddWatermark',
                method: "PUT",
                data: JSON.stringify($scope.GifData),
                headers: headers
            }).success(function (data, status, headers, config) {
                stopBlockUI();
                $scope.GifData.imageUrl = data.payload.imageUrl;
                $scope.GifData.hdImageUrl = data.payload.hdImageUrl;
                $scope.GifData.gifUrl = data.payload.gifUrl;
            }).error(function (data, status, headers, config) {
                stopBlockUI();
                if (status === statusCodes[401]) {
                    logoutUser();
                }
            });
        };

        //$scope.addFileToGithub = function () {
        //    startBlockUI('wait..', 3);

        //    var headers = {
        //        'Content-Type': 'application/json',
        //        'Authorization': 'Bearer ' + getCookie(CookieName.token)
        //    };

        //    $http({
        //        url: '/api/AdminAddFileToGithub',
        //        method: "PUT",
        //        data: JSON.stringify($scope.GifData),
        //        headers: headers
        //    }).success(function (data, status, headers, config) {
        //        stopBlockUI();
        //        $scope.GifData.gifUrl = data.payload.gifUrl;
        //    }).error(function (data, status, headers, config) {
        //        stopBlockUI();
        //        if (status === statusCodes[401]) {
        //            logoutUser();
        //        }
        //    });
        //};

        $scope.updateGif = function () {

            if (!$scope.imageUploaded) {
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
                url: '/api/AdminUpdateBlog',
                method: "POST",
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

        $scope.approveGif = function () {

            if (!$scope.imageUploaded) {
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
                url: '/api/AdminApproveBlogAsset',
                method: "POST",
                data: JSON.stringify($scope.GifData),
                headers: headers
            }).success(function (data, status, headers, config) {
                stopBlockUI();

                showToastMessage("Success", "Successfully Updated User Information.");
                //$window.location.href = '#/adminapprovedgifstatus';
            }).error(function (data, status, headers, config) {
                stopBlockUI();
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

