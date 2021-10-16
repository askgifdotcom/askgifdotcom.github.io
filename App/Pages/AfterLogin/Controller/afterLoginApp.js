
'use strict';
define([appLocation.userPostLogin], function (app) {

    app.config(function ($routeProvider) {

        $routeProvider.when("/", { templateUrl: "../../App/Pages/AfterLogin/Index/Index.html" }).
            when("/edit", { templateUrl: "../../App/Pages/AfterLogin/EditPage/EditPage.html" }).
            when("/uiconfig", { templateUrl: "../../App/Pages/AfterLogin/UiConfig/UiConfig.html" }).            
            when("/addgif", { templateUrl: "../../App/Pages/AfterLogin/AddGif/AddGif.html" }).
            when("/editgif/:id", { templateUrl: "../../App/Pages/AfterLogin/EditGif/EditGif.html" }).
            when("/adminpendinggif", { templateUrl: "../../App/Pages/AfterLogin/AdminPendingGif/AdminPendingGif.html" }).
            when("/adminapprovedgifstatus", { templateUrl: "../../App/Pages/AfterLogin/AdminApprovedGifStatus/AdminApprovedGifStatus.html" }).
            when("/adminapprovegif/:id", { templateUrl: "../../App/Pages/AfterLogin/AdminApproveGif/AdminApproveGif.html" }).
            when("/adminapproveblog/:id", { templateUrl: "../../App/Pages/AfterLogin/AdminApproveBlog/AdminApproveBlog.html" }).
            when("/adminaddblog", { templateUrl: "../../App/Pages/AfterLogin/AdminAddBlog/AdminAddBlog.html" }).
            when("/imageassets", { templateUrl: "../../App/Pages/AfterLogin/AdminImageAssets/AdminImageAssets.html" }).
            when("/imageassets/:id", { templateUrl: "../../App/Pages/AfterLogin/AdminImageAssetsEdit/AdminImageAssetsEdit.html" }).
            when("/pendinggif", { templateUrl: "../../App/Pages/AfterLogin/PendingGif/PendingGif.html" }). 
            when("/adminpendingblog", { templateUrl: "../../App/Pages/AfterLogin/AdminPendingBlog/AdminPendingBlog.html" }).
            when("/adminaddaffiliate", { templateUrl: "../../App/Pages/AfterLogin/AdminAddAffiliate/AdminAddAffiliate.html" }).
            when("/adminaddaffiliatebulk", { templateUrl: "../../App/Pages/AfterLogin/AdminAddAffiliateBulk/AdminAddAffiliateBulk.html" }).
            when("/learningmenu", { templateUrl: "../../App/Pages/AfterLogin/AdminLearningMenuAssets/AdminLearningMenuAssets.html" }).
            when("/geetcodeedit", { templateUrl: "../../App/Pages/AfterLogin/AdminGeetCodeAssets/AdminGeetCodeAssets.html" }).
            when("/geetcodeedit/:page", { templateUrl: "../../App/Pages/AfterLogin/AdminGeetCodeAssets/AdminGeetCodeAssets.html" }).
            when("/questionassets/:id", { templateUrl: "../../App/Pages/AfterLogin/AdminGeetCodeAssetsEdit/AdminGeetCodeAssetsEdit.html" }).
            otherwise({ templateUrl: "../../Resource/templates/AfterLogin/contentView/404.html" });

    });

    app.run(function ($rootScope, $location, $window) { //Insert in the function definition the dependencies you need.

        $rootScope.$on("$locationChangeStart", function (event, next, current) {
            
            //console.log(next);
            gaWeb("BeforeLogin-Page Visited", "Page Visited", next);
            var path = next.split('#');
            var contextPath = path[1]; 
            $rootScope.contextPath = contextPath;
            gaPageView(path, 'title');
            if (contextPath === "/signup" || contextPath === "/signup/user") {
                $rootScope.showSignUpButton = false;
                $rootScope.showLabelAlreadyRegistered = true;
            }
            else {
                $rootScope.showSignUpButton = true;
                $rootScope.showLabelAlreadyRegistered = false;
            }
            $window.scrollTo(0, 0);
        });
    });
    app.controller('UserPostLoginMasterPageController', function ($scope, $location, $http, $rootScope) {

        _.defer(function () { $scope.$apply(); });
        $(document).ajaxStop($.unblockUI);     

        // Create Quotes Array
        var quotes = [];

        // The List of Quotes!

        quotes.push({ "content": "People say nothing is impossible, but I do nothing every day.", "cite": "- A. A. Milne" });
        quotes.push({ "content": "Better to remain silent and be thought a fool than to speak out and remove all doubt", "cite": "- Abraham Lincoln" });
        quotes.push({ "content": "The best thing about the future is that it comes one day at a time", "cite": "- Abraham Lincoln" });
        quotes.push({ "content": "Light travels faster than sound. This is why some people appear bright until you hear them speak.", "cite": "- Alan Dundes" });

        var randomNumber = Math.floor(Math.random() * quotes.length);

        // Alter the Current (Default) Quote Text with a Random Quote
        $('#status blockquote').text(quotes[randomNumber]['content']);

        // Alter the Current (Default) Cite Text with a Random Quote
        $('#status cite').text(quotes[randomNumber]['cite']);

        $rootScope.IsMobileDevice = (mobileDevice || isAndroidDevice) ? true : false;
        $rootScope.logoImage = { url: logoImage };        

        initDashboard();        

        function initDashboard() {

            //startBlockUI('wait..', 3);

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)                
            };

            $http({
                url: '/api/UserProfile',
                method: "GET",                
                headers: headers
            }).success(function (data, status, headers, config) {

                if (data === "Some Error Occured!!! Please retry after sometime.") {
                    logoutUser();
                }

                //stopBlockUI();
                // will first fade out the loading animation
                jQuery("#status").fadeOut();
                // will fade out the whole DIV that covers the website.
                jQuery("#preloader").delay(1000).fadeOut("medium");

                $rootScope.UserData = data.payload;                  
                initUiConfig();
            }).error(function (data, status, headers, config) {
                stopBlockUI();
                logoutUser();
                //if (status === statusCodes[401]) {
                //    logoutUser();
                //}
            });

        }

        function initUiConfig() {
            
            if ($rootScope.UserData.uiConfig.no_border_checkbox) {
                $('.main-header').addClass('border-bottom-0');
            } else {
                $('.main-header').removeClass('border-bottom-0');
            }

            if ($rootScope.UserData.uiConfig.text_sm_body_checkbox) {
                $('body').addClass('text-sm');
                $rootScope.UserData.uiConfig.text_sm_body_checkbox = true;
            } else {
                $('body').removeClass('text-sm');
                $rootScope.UserData.uiConfig.text_sm_body_checkbox = false;
            }

            if ($rootScope.UserData.uiConfig.text_sm_header_checkbox) {
                $('.main-header').addClass('text-sm');
                $rootScope.UserData.uiConfig.text_sm_header_checkbox = true;
            } else {
                $('.main-header').removeClass('text-sm');
                $rootScope.UserData.uiConfig.text_sm_header_checkbox = false;
            }

            if ($rootScope.UserData.uiConfig.text_sm_sidebar_checkbox) {
                $('.nav-sidebar').addClass('text-sm');
                $rootScope.UserData.uiConfig.text_sm_sidebar_checkbox = true;
            } else {
                $('.nav-sidebar').removeClass('text-sm');
                $rootScope.UserData.uiConfig.text_sm_sidebar_checkbox = false;
            }

            if ($rootScope.UserData.uiConfig.text_sm_footer_checkbox) {
                $('.main-footer').addClass('text-sm');
                $rootScope.UserData.uiConfig.text_sm_footer_checkbox = true;
            } else {
                $('.main-footer').removeClass('text-sm');
                $rootScope.UserData.uiConfig.text_sm_footer_checkbox = false;
            }

            if ($rootScope.UserData.uiConfig.flat_sidebar_checkbox) {
                $('.nav-sidebar').addClass('nav-flat');
                $rootScope.UserData.uiConfig.flat_sidebar_checkbox = true;
            } else {
                $('.nav-sidebar').removeClass('nav-flat');
                $rootScope.UserData.uiConfig.flat_sidebar_checkbox = false;
            }

            if ($rootScope.UserData.uiConfig.legacy_sidebar_checkbox) {
                $('.nav-sidebar').addClass('nav-legacy');
                $rootScope.UserData.uiConfig.legacy_sidebar_checkbox = true;
            } else {
                $('.nav-sidebar').removeClass('nav-legacy');
                $rootScope.UserData.uiConfig.legacy_sidebar_checkbox = false;
            }

            if ($rootScope.UserData.uiConfig.compact_sidebar_checkbox) {
                $('.nav-sidebar').addClass('nav-compact');
                $rootScope.UserData.uiConfig.compact_sidebar_checkbox = true;
            } else {
                $('.nav-sidebar').removeClass('nav-compact');
                $rootScope.UserData.uiConfig.compact_sidebar_checkbox = false;
            }

            if ($rootScope.UserData.uiConfig.child_indent_sidebar_checkbox) {
                $('.nav-sidebar').addClass('nav-child-indent');
                $rootScope.UserData.uiConfig.child_indent_sidebar_checkbox = true;
            } else {
                $('.nav-sidebar').removeClass('nav-child-indent');
                $rootScope.UserData.uiConfig.child_indent_sidebar_checkbox = false;
            }

            if ($rootScope.UserData.uiConfig.no_expand_sidebar_checkbox) {
                $('.main-sidebar').addClass('sidebar-no-expand');
                $rootScope.UserData.uiConfig.no_expand_sidebar_checkbox = true;
            } else {
                $('.main-sidebar').removeClass('sidebar-no-expand');
                $rootScope.UserData.uiConfig.no_expand_sidebar_checkbox = false;
            }

            if ($rootScope.UserData.uiConfig.text_sm_brand_checkbox) {
                $('.brand-link').addClass('text-sm');
                $rootScope.UserData.uiConfig.text_sm_brand_checkbox = true;
            } else {
                $('.brand-link').removeClass('text-sm');
                $rootScope.UserData.uiConfig.text_sm_brand_checkbox = false;
            }

            //Navbar Variants
            var color = $rootScope.UserData.uiConfig.navbar_Variants;
            var $main_header = $('.main-header');
            $main_header.removeClass('navbar-dark').removeClass('navbar-light');
            navbar_all_colors.map(function (color) {
                $main_header.removeClass(color);
            });
            if (navbar_dark_skins.indexOf(color) > -1) {
                $main_header.addClass('navbar-dark');
            } else {
                $main_header.addClass('navbar-light');
            }
            $main_header.addClass(color);

            //Accent Color Variants            
            var accent_class = $rootScope.UserData.uiConfig.accent_Color_Variants;
            var $body = $('body')
            accent_colors.map(function (skin) {
                $body.removeClass(skin);
            });
            $body.addClass(accent_class);

            //Light Sidebar
            if ($rootScope.UserData.uiConfig.light_Sidebar_Variants !== '') {                
                var sidebar_class = $rootScope.UserData.uiConfig.light_Sidebar_Variants;
                var $sidebar = $('.main-sidebar');
                sidebar_skins.map(function (skin) {
                    $sidebar.removeClass(skin);
                });

                $sidebar.addClass(sidebar_class);                
            };

            //Dark Sidebar
            if ($rootScope.UserData.uiConfig.dark_Sidebar_Variants !== '') {                
                sidebar_class = $rootScope.UserData.uiConfig.dark_Sidebar_Variants;
                $sidebar = $('.main-sidebar')
                sidebar_skins.map(function (skin) {
                    $sidebar.removeClass(skin)
                });
                $sidebar.addClass(sidebar_class);
            }

            //Logo Variants
            color = $rootScope.UserData.uiConfig.brand_Logo_Variants;
            var $logo = $('.brand-link')
            logo_skins.map(function (skin) {
                $logo.removeClass(skin)
            });
            $logo.addClass(color);

        };

        $scope.forUser = function () {
            startBlockUI('wait..', 3);

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/UserProfile/ForUser',
                method: "GET",
                headers: headers
            }).success(function (data, status, headers, config) {
                stopBlockUI();
                showToastMessage("Success", data.payload);
            }).error(function (data, status, headers, config) {
                stopBlockUI();
                if (status === 403) {
                    showToastMessage("Error", "Sorry you are UnAuthorized to access this.");
                }                
            });            
        };

        $scope.forModerator = function () {
            startBlockUI('wait..', 3);

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/UserProfile/ForModerator',
                method: "GET",
                headers: headers
            }).success(function (data, status, headers, config) {
                stopBlockUI();
                showToastMessage("Success", data.payload);
            }).error(function (data, status, headers, config) {
                stopBlockUI();
                if (status === 403) {
                    showToastMessage("Error", "Sorry you are UnAuthorized to access this.");
                }   
            });
        };

        $scope.forAdmin = function () {
            startBlockUI('wait..', 3);

            var headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie(CookieName.token)
            };

            $http({
                url: '/api/UserProfile/ForAdmin',
                method: "GET",
                headers: headers
            }).success(function (data, status, headers, config) {
                stopBlockUI();
                showToastMessage("Success", data.payload);
            }).error(function (data, status, headers, config) {
                stopBlockUI();
                if (status === 403) {
                    showToastMessage("Error", "Sorry you are UnAuthorized to access this.");
                }   
            });
        };

        $scope.logout = function () {
            logoutUser();
        }
        
    });
    
});
