module app {
    'use strict';

    angularModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        let login = {
            name: 'login',
            url: '/login',
            templateUrl: '/client/views/page/login/login.html',
            controller: 'LoginPageController',
            controllerAs: 'vm'
        }

        let mainpage = {
            name: 'mainpage',
            url: '/mainpage',
            params:{
                id:null
            },
            templateUrl: '/client/views/mainPage.html',
            controller: 'MainPageController',
            controllerAs: 'vm'
        }

        let edit = {
            name: 'edit',
            url: '/edit',
            templateUrl: '/client/views/page/editProfile/edit.html',
            controller: 'EditPageController',
            controllerAs: 'vm'
        }

        let logout = {
            name: 'logout',
            url: '/logout',
            templateUrl: '/client/views/page/logout/logout.html',
            controller: 'LogoutPageController',
            controllerAs: 'vm'
        }

        $stateProvider.state(login);
        $stateProvider.state(mainpage);
        $stateProvider.state(edit);
        $stateProvider.state(logout);

        $urlRouterProvider.otherwise('login');
    }]);

    angular.module('app').filter('upper',() =>{
        return function (item) {
            return item.toUpperCase();
        };
    });


}
