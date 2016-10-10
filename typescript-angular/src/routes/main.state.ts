module app {
    'use strict';

    angular.module('app').config(config);
    function config($urlRouterProvider: ng.ui.IUrlRouterProvider, $locationProvider: ng.ILocationProvider, $stateProvider: ng.ui.IStateProvider) {
        //$locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');

        $stateProvider.state({
            name: 'default',
            //abstract: true,
            url: '/',
            templateUrl: '/routes/main.html',
            controller: 'MainController',
            controllerAs: 'main'
        });

        console.log('I am a configuration!');
    }
    config.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];
}
