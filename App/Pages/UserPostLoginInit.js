/**
 * Simple bootstrapper to load all the pre-requisite AngularJS dependencies needed by Login SPA [Single Page Application]
 * @class PreLoginInit
 * @module PreLogin
 */
define(['angular'], function() {

    var dependances = ['restangular', 'ngRoute', 'ngAnimate', 'ngSanitize', 'xeditable'];
    var app = angular.module("UserPostLoginApp", dependances);
    return app;
});
