(function () {
    'use strict';
    
    var app = angular.module('app.api-info', ['ui.router']);
    
    app.config([
        '$stateProvider',
        '$urlRouterProvider',
        function (stateProvider, urlRouterProvider) {
            stateProvider
                .state('api-info', {
                    url: '/api-info',
                    templateUrl: '/app/api-info/views/info.html'
                });
                
        }
    ]);
    
}());