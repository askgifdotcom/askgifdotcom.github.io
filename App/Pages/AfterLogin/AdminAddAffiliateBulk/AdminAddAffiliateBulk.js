'use strict';
define([appLocation.userPostLogin], function (app) {

    app.controller('userAfterLoginAdminAddAffiliateBulk', function ($scope, $http, $window, $rootScope) {
        $('title').html("edit page"); //TODO: change the title so cann't be tracked in log
        $scope.searchOption = 'contains';
        $scope.imageUploading = false;
        $scope.imageUploaded = false;
        $scope.translatingTitle = false;
        $scope.TinyMCE1 = "";
        $scope.TinyMCE2 = "";        

        $('select').on('change', function () {
            //alert(this.value);
            $scope.AffiliateData.category = this.value;
            $.cookie('affiliate-category', this.value, { expires: 365, path: '/' });
        });
        

        $scope.AffiliateData = {
            str: '',            
            category: 'Apparel-&-Accessories'
        };

        if ($.cookie('affiliate-category') != null || $.cookie('affiliate-category') != undefined) {
            $scope.AffiliateData.category = $.cookie('affiliate-category');
            document.getElementById('affiliate-category').value = $scope.AffiliateData.category;
        }

        //$scope.AffiliateData.TextAndImage = "<iframe style=\"width: 120px; height: 240px; \" marginwidth=\"0\" marginheight=\"0\" scrolling=\"no\" frameborder=\"0\" src=\"//ws-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=IN&source=ac&ref=tf_til&ad_type=product_link&tracking_id=askgif-21&marketplace=amazon&amp;region=IN&placement=0143452673&asins=0143452673&linkId=bb83c1cb2560907208ee37624854de53&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff\"></iframe>";
        //$scope.AffiliateData.TextOnly = "<a target=\"_blank\" href=\"https://www.amazon.in/gp/product/0143452673/ref=as_li_tl?ie=UTF8&camp=3638&creative=24630&creativeASIN=0143452673&linkCode=as2&tag=askgif-21&linkId=f9422517229e097b5bfeb1fcb3714d36\">Karma: A Yogi's Guide to Crafting Your Destiny</a>";
        //$scope.AffiliateData.TextOnlyShortLink = "https://amzn.to/3dyOmcO";
        //$scope.AffiliateData.ImageOnly = "<a target=\"_blank\"  href=\"https://www.amazon.in/gp/product/0143452673/ref=as_li_tl?ie=UTF8&camp=3638&creative=24630&creativeASIN=0143452673&linkCode=as2&tag=askgif-21&linkId=628d07e6b0382f6094e07b7e2b39a647\"><img border=\"0\" src=\"//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=IN&ASIN=0143452673&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=askgif-21\" ></a>";
        $scope.saveUiConfig = function () {
            updateUiConfig();
        };

        $scope.updateSearchOption = function (option) {
            $scope.searchOption = option;
        };               

        $scope.submitGif = function () {            

            //if ($scope.GifData.gifUrl === null || $scope.GifData.gifUrl === '' || $scope.GifData.gifUrl === undefined) {
            //    showToastMessage("Error", "You must upload gif before submitting it.");
            //    return;
            //};

            //if ($scope.GifData.title === '') {
            //    showToastMessage("Error", "Title is mandatory.");
            //    return;
            //};

            //if ($scope.GifData.tags.length === 0) {
            //    showToastMessage("Error", "At least one tag is mandatory.");
            //    return;
            //};

            startBlockUI('wait..', 3);

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/SubmitAffiliateBulk',
                method: "POST",
                data: JSON.stringify($scope.AffiliateData),
                headers: headers
            }).success(function (data, status, headers, config) {
                stopBlockUI();                                             
                
                //$window.location.reload();  
                if (data.status == 200) {
                    showToastMessage("Success", data.message);
                    //$window.location.href = '#/adminpendingblog';
                }
                else {
                    showToastMessage("Error", "All Fields are Mandatory.");
                }

            }).error(function (data, status, headers, config) {
                stopBlockUI();
                showToastMessage("Error", "Error Occured.");
                if (status === statusCodes[401]) {
                    logoutUser();
                }
            });

        };

        $scope.submitSearchGif = function () {

            
            startBlockUI('wait..', 3);

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/SubmitAffiliateSearchBulk',
                method: "POST",
                data: JSON.stringify($scope.AffiliateData),
                headers: headers
            }).success(function (data, status, headers, config) {
                stopBlockUI();

                //$window.location.reload();  
                if (data.status == 200) {
                    showToastMessage("Success", data.message);
                    //$window.location.href = '#/adminpendingblog';
                }
                else {
                    showToastMessage("Error", "All Fields are Mandatory.");
                }

            }).error(function (data, status, headers, config) {
                stopBlockUI();
                showToastMessage("Error", "Error Occured.");
                if (status === statusCodes[401]) {
                    logoutUser();
                }
            });

        };

        $scope.addTag = function () {
            var regexp = /^[a-zA-Z0-9--]+$/;
            if ($scope.AffiliateData.newTagEnglish.search(regexp) === -1) {
                showToastMessage("Error", "Only Alphanumeric and hyphen (-) allowed.");
            }
            else {
                //make ajax call.
                if ($.inArray($scope.AffiliateData.newTagEnglish, tagify.settings.whitelist) === -1) {
                    startBlockUI('wait..', 3);

                    var headers = {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + getCookie(CookieName.token)
                    };

                    $http({
                        url: '/api/AdminAddNewAffiliateTag',
                        method: "POST",
                        data: JSON.stringify($scope.AffiliateData),
                        headers: headers
                    }).success(function (data, status, headers, config) {
                        stopBlockUI();
                        showToastMessage("Success", "Successfully Added AffiliateTag.");
                        tagify.settings.whitelist.push($scope.AffiliateData.newTagEnglish);
                        tagify.addTags($scope.AffiliateData.newTagEnglish);
                        $scope.AffiliateData.tags.push($scope.AffiliateData.newTagEnglish);
                        $scope.AffiliateData.newTagEnglish = '';
                        $scope.AffiliateData.newTagHindi = '';
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

            if ($scope.AffiliateData.newTagEnglish === '') {
                return;
            };
            $scope.AffiliateData.newTagEnglish = $scope.AffiliateData.newTagEnglish.replace(/\s+/g, '-').toLowerCase();
            if ($.inArray($scope.AffiliateData.newTagEnglish, tagify.settings.whitelist) !== -1) {
                showToastMessage("Error", "This tag already exists.");
                return;
            }

            $scope.translatingTitle = true;
            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/Translate?q=' + $scope.AffiliateData.newTagEnglish,
                method: "GET",
                headers: headers
            }).success(function (data, status, headers, config) {
                $scope.AffiliateData.newTagEnglish = $scope.AffiliateData.newTagEnglish.replace(/\s+/g, '-').toLowerCase();
                $scope.AffiliateData.newTagHindi = data.replace(/\s+/g, '-');
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

