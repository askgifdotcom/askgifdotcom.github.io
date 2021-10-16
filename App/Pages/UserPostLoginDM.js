/**
 * Dashboard # Single Page Application [SPA] Dependency Manager Configurator to be resolved via Require JS library.
 * @class PreLoginDM
 * @module PreLogin
 */
appRequire = require
    .config({
        waitSeconds: 200,
        shim: {            
            underscore: {
                exports: "_"
            },
            angular: {
                exports: "angular",
                deps: ["jquery"]
            },
            moment: {
                deps: ["jquery"]
            },            
            bootstrap: {
                deps: ["jquery"]
            },
            bootstrap_switch: {
                deps: ["jquery"]
            },
            jquery: {
                exports: "$"
            },                        
            jquery_cookie: {
                deps: ["jquery"]
            },
            beforeLoginAdminLTEApp: {
                deps: ["jquery"]
            },
            restangular: {
                deps: ["angular", "underscore"]
            },
            angular_cookies: {
                deps: ["angular"]
            },
            angular_route: {
                deps: ["angular", "jquery"]
            },
            angular_animate: {
                deps: ["angular", "jquery", "angular_route"]
            },
            sanitize: {
                deps: ["angular", "jquery"]
            },
            xeditable: {
                deps: ["angular", "jquery"]
            },
            jquery_toastmessage: {
                deps: ["jquery"]
            },
            toastMessage: {
                deps: ["jquery_toastmessage"]
            },            
            jquery_blockUI: {
                deps: ["jquery"]
            },
            configureBlockUI: {
                deps: ["jquery_blockUI"]
            },
            jquery_ui_min: {
                deps: ["jquery"]
            },
            jquery_ui_touch_punch_min: {
                deps: ["jquery", "jquery_ui_min"]
            },
            autocomplete: {
                deps: ["angular", "jquery", "jquery_ui_min"]
            },
            bannerscollection_zoominout: {
                deps: ["jquery", "jquery_ui_touch_punch_min", "jquery_ui_min"]
            },
            jquery_slimscroll: {
                deps: ["jquery"]
            },            
            jquery_sidr_min: {
                deps: ["jquery"]
            },            
            UserPostLoginApp: {
                deps: ["jquery", "angular", "restangular", "configureBlockUI", "toastMessage", "jquery_sidr_min", "beforeLoginAdminLTEApp", "pace_min"]
            },
            showMessageTemplate: {
                deps: ["jquery", "angular", "restangular", "configureBlockUI", "toastMessage"]
            },
            UserPostLoginIndex: {
                deps: ["jquery", "angular", "restangular", "configureBlockUI", "toastMessage"]
            },
            userAfterLoginEditPage: {
                deps: ["jquery", "angular", "restangular", "configureBlockUI", "toastMessage"]
            },
            userAfterLoginUiConfig: {
                deps: ["jquery", "angular", "restangular", "configureBlockUI", "toastMessage"]
            },
            userAfterLoginAddGif: {
                deps: ["jquery", "angular", "restangular", "configureBlockUI", "toastMessage"]
            },
            userAfterLoginPendingGif: {
                deps: ["jquery", "angular", "restangular", "configureBlockUI", "toastMessage", "xeditable"]
            },
            userAfterLoginEditGif: {
                deps: ["jquery", "angular", "restangular", "configureBlockUI", "toastMessage", "autocomplete"]
            },
            userAfterLoginAdminApproveGif: {
                deps: ["jquery", "angular", "restangular", "configureBlockUI", "toastMessage", "autocomplete"]
            },
            userAfterLoginAdminApproveBlog: {
                deps: ["jquery", "angular", "restangular", "configureBlockUI", "toastMessage", "autocomplete"]
            },
            userAfterLoginAdminPendingGif: {
                deps: ["jquery", "angular", "restangular", "configureBlockUI", "toastMessage", "moment"]
            },
            userAfterLoginAdminPendingBlog: {
                deps: ["jquery", "angular", "restangular", "configureBlockUI", "toastMessage", "moment"]
            },
            userAfterLoginAdminImageAssets: {
                deps: ["jquery", "angular", "restangular", "configureBlockUI", "toastMessage"]
            },
            userAfterLoginAdminImageAssetsEdit: {
                deps: ["jquery", "angular", "restangular", "configureBlockUI", "toastMessage"]
            },
            userAfterLoginAdminApprovedGifStatus: {
                deps: ["jquery", "angular", "restangular", "configureBlockUI", "toastMessage", "moment"]
            },
            userAfterLoginAdminAddBlog: {
                deps: ["jquery", "angular", "restangular", "configureBlockUI", "toastMessage", "moment"]
            },
            userAfterLoginAdminAddAffiliate: {
                deps: ["jquery", "angular", "restangular", "configureBlockUI", "toastMessage", "moment"]
            },
            userAfterLoginAdminAddAffiliateBulk: {
                deps: ["jquery", "angular", "restangular", "configureBlockUI", "toastMessage", "moment"]
            },
            userAfterLoginAdminLearningMenuAssets: {
                deps: ["jquery", "angular", "restangular", "configureBlockUI", "toastMessage", "xeditable"]
            },
            userAfterLoginAdminGeetCodeAssets: {
                deps: ["jquery", "angular", "restangular", "configureBlockUI", "toastMessage", "xeditable"]
            },
            userAfterLoginAdminGeetCodeAssetsEdit: {
                deps: ["jquery", "angular", "restangular", "configureBlockUI", "toastMessage", "xeditable"]
            },
        },
        paths: {
            //==============================================================================================================
            // 3rd Party JavaScript Libraries
            //==============================================================================================================            
            underscore: "../../App/js/underscore-min",
            jquery: "../../AdminLTE-3/plugins/jquery/jquery.min",
            jquery_ui_min: "../../App/js/jquery-ui.min",
            //hammer_min: "../../App/js/hammer.min",
            angular: "../../App/js/angular.1.2.13",
            //m2ei18n: "../../App/js/m2ei18n",
            jquery_toastmessage: "../../App/third-Party/toastmessage/js/jquery.toastmessage",
            toastMessage: "../../App/js/toastMessage",
            jquery_cookie: "../../App/js/jquery.cookie",
            jquery_blockUI: "../../App/js/jquery.blockUI",                 
            restangular: "../../App/js/restangular.min",           
            moment: "../../App/js/moment.min",            
            bootstrap: "../../AdminLTE-3/plugins/bootstrap/js/bootstrap.bundle.min",
            //bootstrap_switch: "../../App/Template/AdminLTE-master/js/bootstrap-switch",
            beforeLoginAdminLTEApp: "../../AdminLTE-3/dist/js/adminlte",
            //beforeLoginAdminLTETree: "../../Template/AdminLTE-master/js/AdminLTE/tree",
            jquery_slimscroll: "../../AdminLTE-3/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min",
            //iCheck: "../../Template/AdminLTE-master/js/plugins/iCheck/icheck.min",
            angular_cookies: "../../App/js/angular-cookies",
            configureBlockUI: "../../App/js/configureBlockUI",
            angular_route: "../../App/js/angular-route",
            angular_animate: "../../App/js/angular-animate",
            sanitize: "../../App/js/angular/ngSanitize/sanitize",
            jquery_nivo_slider: "../../App/js/jquery.nivo.slider",
            bannerscollection_zoominout: "../../App/js/bannerscollection_zoominout",
            jquery_ui_touch_punch_min: "../../App/js/jquery.ui.touch-punch.min",
            jquery_sidr_min: "../../App/third-Party/sidr-package/jquery.sidr.min",
            pace_min: "../../static/js/pace.min",
            xeditable: "../../App/third-Party/angular-xeditable-0.10.2/js/xeditable",   
            autocomplete: "../../App/third-Party/ui-autocomplete-master/autocomplete",             
            //==============================================================================================================
            // Application Related JS
            //==============================================================================================================
            UserPostLoginApp: ".././../App/Pages/AfterLogin/Controller/afterLoginApp",
            UserPostLoginIndex: "../../App/Pages/AfterLogin/Index/index",
            userAfterLoginEditPage: "../../App/Pages/AfterLogin/EditPage/editPage",//used
            userAfterLoginUiConfig: "../../App/Pages/AfterLogin/UiConfig/UiConfig",//used
            userAfterLoginAddGif: "../../App/Pages/AfterLogin/AddGif/AddGif",//used
            userAfterLoginPendingGif: "../../App/Pages/AfterLogin/PendingGif/PendingGif",//used
            userAfterLoginEditGif: "../../App/Pages/AfterLogin/EditGif/EditGif",//used
            userAfterLoginAdminApproveGif: "../../App/Pages/AfterLogin/AdminApproveGif/AdminApproveGif",//used
            userAfterLoginAdminApproveBlog: "../../App/Pages/AfterLogin/AdminApproveBlog/AdminApproveBlog",//used
            userAfterLoginAdminPendingGif: "../../App/Pages/AfterLogin/AdminPendingGif/AdminPendingGif",//used
            userAfterLoginAdminPendingBlog: "../../App/Pages/AfterLogin/AdminPendingBlog/AdminPendingBlog",//used
            userAfterLoginAdminImageAssets: "../../App/Pages/AfterLogin/AdminImageAssets/AdminImageAssets",//used
            userAfterLoginAdminImageAssetsEdit: "../../App/Pages/AfterLogin/AdminImageAssetsEdit/AdminImageAssetsEdit",//used
            userAfterLoginAdminApprovedGifStatus: "../../App/Pages/AfterLogin/AdminApprovedGifStatus/AdminApprovedGifStatus",//used
            userAfterLoginAdminAddBlog: "../../App/Pages/AfterLogin/AdminAddBlog/AdminAddBlog",//used
            userAfterLoginAdminAddAffiliate: "../../App/Pages/AfterLogin/AdminAddAffiliate/AdminAddAffiliate",//used
            userAfterLoginAdminAddAffiliateBulk: "../../App/Pages/AfterLogin/AdminAddAffiliateBulk/AdminAddAffiliateBulk",//used
            userAfterLoginAdminLearningMenuAssets: "../../App/Pages/AfterLogin/AdminLearningMenuAssets/AdminLearningMenuAssets",//used
            userAfterLoginAdminGeetCodeAssets: "../../App/Pages/AfterLogin/AdminGeetCodeAssets/AdminGeetCodeAssets",//used
            userAfterLoginAdminGeetCodeAssetsEdit: "../../App/Pages/AfterLogin/AdminGeetCodeAssetsEdit/AdminGeetCodeAssetsEdit",//used
        },
        urlArgs: ""
    });

appRequire(["jquery", "angular", "jquery_toastmessage", "toastMessage", "jquery_cookie",
    "jquery_blockUI", "restangular","angular_route", "angular_animate", "bootstrap", //"bootstrap_switch", //"beforeLoginAdminLTEApp", "moment","iCheck",
    "UserPostLoginApp", "UserPostLoginIndex", "underscore", "angular_cookies",
    "sanitize", "bannerscollection_zoominout", "jquery_ui_touch_punch_min", "jquery_ui_min", "jquery_sidr_min", "userAfterLoginEditPage",
    "userAfterLoginUiConfig", "userAfterLoginAddGif", "userAfterLoginPendingGif", "userAfterLoginEditGif", "userAfterLoginAdminApproveGif",
    "userAfterLoginAdminPendingGif", "userAfterLoginAdminImageAssets", "userAfterLoginAdminImageAssetsEdit", "userAfterLoginAdminApprovedGifStatus",
    "userAfterLoginAdminAddBlog", "userAfterLoginAdminPendingBlog", "userAfterLoginAdminApproveBlog", "userAfterLoginAdminAddAffiliate", "userAfterLoginAdminAddAffiliateBulk",
    "userAfterLoginAdminLearningMenuAssets", "userAfterLoginAdminGeetCodeAssets", "userAfterLoginAdminGeetCodeAssetsEdit"
], function() {
        angular.bootstrap(document.getElementById("page-top"), ["UserPostLoginApp"]);
});
