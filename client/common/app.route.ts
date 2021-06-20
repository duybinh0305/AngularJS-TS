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


    angularModule.directive("teamplateHeader", function () {
        return {
            templateUrl: "/client/views/page/header/header.html"
        };
    });

    angularModule.directive("teamplateTaskbar", function () {
        return {
            templateUrl: "/client/views/page/taskbar/taskbar.html"
        };
    });

}
