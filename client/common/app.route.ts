module app{
    'use strict';

    angularModule.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
        let login={
            name: 'login',
            url:'/login',
            templateUrl: '/client/views/page/login/login.html',
            controller:'LoginPageController',
            controllerAs:'lg'
        }
        $stateProvider.state(login);
        $urlRouterProvider.otherwise('login');
    }]);

    angularModule.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
        let home={
            name: 'home',
            url:'/home',
            templateUrl: '/client/views/page/home/home.html',
            controller:'HomeController',
            controllerAs:'hm'
        }
        $stateProvider.state(home);
    }]);

    angularModule.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
        let edit={
            name: 'edit',
            url:'/edit',
            templateUrl: '/client/views/page/editProfile/edit.html',
            controller:'EditController',
            controllerAs:'ed'
        }
        $stateProvider.state(edit);
    }]);
}
