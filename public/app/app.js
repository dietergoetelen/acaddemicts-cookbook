/*global angular*/
(function () {
    'use strict';
    
    var app = angular.module('app', [
        'app.api-info',
        
        'ui.router'
    ]);
    
    app.config(['$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    $urlRouterProvider.otherwise('/authors');
                }
           ]);
}());