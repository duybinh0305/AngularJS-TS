var app;
(function (app) {
    'use strict';
    function Controller(name) {
        return function (clazz) {
            clazz.$name = name;
            app.angularModule.controller(name, clazz);
        };
    }
    app.Controller = Controller;
})(app || (app = {}));
var app;
(function (app) {
    'use strict';
    app.angularModule = angular.module('app', ['ui.router']);
})(app || (app = {}));
var app;
(function (app) {
    'use strict';
    app.angularModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            var login = {
                name: 'login',
                url: '/login',
                templateUrl: '/client/views/page/login/login.html',
                controller: 'LoginPageController',
                controllerAs: 'lg'
            };
            $stateProvider.state(login);
            $urlRouterProvider.otherwise('login');
        }]);
    app.angularModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            var home = {
                name: 'home',
                url: '/home',
                templateUrl: '/client/views/page/home/home.html',
                controller: 'HomeController',
                controllerAs: 'hm'
            };
            $stateProvider.state(home);
        }]);
    app.angularModule.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            var edit = {
                name: 'edit',
                url: '/edit',
                templateUrl: '/client/views/page/editProfile/edit.html',
                controller: 'EditController',
                controllerAs: 'ed'
            };
            $stateProvider.state(edit);
        }]);
})(app || (app = {}));
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var app;
(function (app) {
    'use strict';
    var MainPageCtrl = (function () {
        function MainPageCtrl() {
        }
        MainPageCtrl = __decorate([
            app.Controller('MainPageController')
        ], MainPageCtrl);
        return MainPageCtrl;
    }());
    app.MainPageCtrl = MainPageCtrl;
})(app || (app = {}));
var app;
(function (app) {
    'use strict';
    var EditPageCtrl = (function () {
        function EditPageCtrl() {
        }
        EditPageCtrl = __decorate([
            app.Controller('EditPageController')
        ], EditPageCtrl);
        return EditPageCtrl;
    }());
    app.EditPageCtrl = EditPageCtrl;
})(app || (app = {}));
var app;
(function (app) {
    'use strict';
    var HomeCtrl = (function () {
        function HomeCtrl() {
        }
        HomeCtrl = __decorate([
            app.Controller('HomeController')
        ], HomeCtrl);
        return HomeCtrl;
    }());
    app.HomeCtrl = HomeCtrl;
})(app || (app = {}));
var app;
(function (app) {
    'use strict';
    var LoginPageCtrl = (function () {
        function LoginPageCtrl() {
        }
        LoginPageCtrl.prototype.getUsers = function ($http) {
            $http.get('././././data/db/user.json').then(function (res) {
                this.users = res.data;
                console.log(this.users);
            });
        };
        LoginPageCtrl.prototype.login = function () {
            console.log(this.internshipId);
            console.log(this.password);
            sessionStorage.setItem('user', this.internshipId);
            console.log(sessionStorage.getItem('user'));
        };
        LoginPageCtrl = __decorate([
            app.Controller('LoginPageController')
        ], LoginPageCtrl);
        return LoginPageCtrl;
    }());
    app.LoginPageCtrl = LoginPageCtrl;
})(app || (app = {}));
var app;
(function (app) {
    'use strict';
    var TaskBarCtrl = (function () {
        function TaskBarCtrl() {
        }
        TaskBarCtrl.prototype.function = function ($scope) {
            $scope.test = "ne";
        };
        TaskBarCtrl = __decorate([
            app.Controller('TaskBarController')
        ], TaskBarCtrl);
        return TaskBarCtrl;
    }());
    app.TaskBarCtrl = TaskBarCtrl;
})(app || (app = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9jb21tb24vYW5ub3RhdGlvbi50cyIsImNsaWVudC9jb21tb24vYXBwLm1vZHVsZS50cyIsImNsaWVudC9jb21tb24vYXBwLnJvdXRlLnRzIiwiY2xpZW50L2NvbnRyb2xsZXIvbWFpblBhZ2UuY29udHJvbGxlci50cyIsImNsaWVudC92aWV3cy9wYWdlL2VkaXRQcm9maWxlL2VkaXQuY29udHJvbGxlci50cyIsImNsaWVudC92aWV3cy9wYWdlL2hvbWUvaG9tZS5jb250cm9sbGVyLnRzIiwiY2xpZW50L3ZpZXdzL3BhZ2UvbG9naW4vbG9naW4uY29udHJvbGxlci50cyIsImNsaWVudC92aWV3cy9wYWdlL3Rhc2tiYXIvdGFza0Jhci5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sR0FBRyxDQVNUO0FBVEQsV0FBTyxHQUFHO0lBQ04sWUFBWSxDQUFDO0lBRWIsU0FBZ0IsVUFBVSxDQUFDLElBQVc7UUFDbEMsT0FBTyxVQUFTLEtBQVM7WUFDckIsS0FBSyxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUM7WUFDakIsSUFBQSxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUE7SUFDTCxDQUFDO0lBTGUsY0FBVSxhQUt6QixDQUFBO0FBQ0wsQ0FBQyxFQVRNLEdBQUcsS0FBSCxHQUFHLFFBU1Q7QUNURCxJQUFPLEdBQUcsQ0FJVDtBQUpELFdBQU8sR0FBRztJQUNOLFlBQVksQ0FBQztJQUVGLGlCQUFhLEdBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0FBQ25FLENBQUMsRUFKTSxHQUFHLEtBQUgsR0FBRyxRQUlUO0FDSkQsSUFBTyxHQUFHLENBb0NUO0FBcENELFdBQU8sR0FBRztJQUNOLFlBQVksQ0FBQztJQUViLElBQUEsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGdCQUFnQixFQUFDLG9C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Q0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1FBRVAsQ0FBQztRQUNPLDZCQUFLLEdBQWI7WUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzQixjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDaEQsQ0FBQztRQWhCUSxhQUFhO1lBRHpCLElBQUEsVUFBVSxDQUFDLHFCQUFxQixDQUFDO1dBQ3JCLGFBQWEsQ0FtRHpCO1FBQUQsb0JBQUM7S0FuREQsQUFtREMsSUFBQTtJQW5EWSxpQkFBYSxnQkFtRHpCLENBQUE7QUFFTCxDQUFDLEVBekRNLEdBQUcsS0FBSCxHQUFHLFFBeURUO0FDekRELElBQU8sR0FBRyxDQVVUO0FBVkQsV0FBTyxHQUFHO0lBQ04sWUFBWSxDQUFDO0lBR2I7UUFBQTtRQUtBLENBQUM7UUFIRyw4QkFBUSxHQUFSLFVBQVMsTUFBeUI7WUFDOUIsTUFBTSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUpRLFdBQVc7WUFEdkIsSUFBQSxVQUFVLENBQUMsbUJBQW1CLENBQUM7V0FDbkIsV0FBVyxDQUt2QjtRQUFELGtCQUFDO0tBTEQsQUFLQyxJQUFBO0lBTFksZUFBVyxjQUt2QixDQUFBO0FBQ0wsQ0FBQyxFQVZNLEdBQUcsS0FBSCxHQUFHLFFBVVQiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlIGFwcHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gQ29udHJvbGxlcihuYW1lOnN0cmluZyl7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGNsYXp6OmFueSl7XHJcbiAgICAgICAgICAgIGNsYXp6LiRuYW1lPW5hbWU7XHJcbiAgICAgICAgICAgIGFuZ3VsYXJNb2R1bGUuY29udHJvbGxlcihuYW1lLCBjbGF6eik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibW9kdWxlIGFwcHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgbGV0IGFuZ3VsYXJNb2R1bGU9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ3VpLnJvdXRlciddKTtcclxufSIsIm1vZHVsZSBhcHB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhck1vZHVsZS5jb25maWcoWyckc3RhdGVQcm92aWRlcicsJyR1cmxSb3V0ZXJQcm92aWRlcicsZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsJHVybFJvdXRlclByb3ZpZGVyKXtcclxuICAgICAgICBsZXQgbG9naW49e1xyXG4gICAgICAgICAgICBuYW1lOiAnbG9naW4nLFxyXG4gICAgICAgICAgICB1cmw6Jy9sb2dpbicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2NsaWVudC92aWV3cy9wYWdlL2xvZ2luL2xvZ2luLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOidMb2dpblBhZ2VDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOidsZydcclxuICAgICAgICB9XHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUobG9naW4pO1xyXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJ2xvZ2luJyk7XHJcbiAgICB9XSk7XHJcblxyXG4gICAgYW5ndWxhck1vZHVsZS5jb25maWcoWyckc3RhdGVQcm92aWRlcicsJyR1cmxSb3V0ZXJQcm92aWRlcicsZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsJHVybFJvdXRlclByb3ZpZGVyKXtcclxuICAgICAgICBsZXQgaG9tZT17XHJcbiAgICAgICAgICAgIG5hbWU6ICdob21lJyxcclxuICAgICAgICAgICAgdXJsOicvaG9tZScsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2NsaWVudC92aWV3cy9wYWdlL2hvbWUvaG9tZS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjonSG9tZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6J2htJ1xyXG4gICAgICAgIH1cclxuICAgICAgICAkc3RhdGVQcm92aWRlci5zdGF0ZShob21lKTtcclxuICAgIH1dKTtcclxuXHJcbiAgICBhbmd1bGFyTW9kdWxlLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJywnJHVybFJvdXRlclByb3ZpZGVyJyxmdW5jdGlvbigkc3RhdGVQcm92aWRlciwkdXJsUm91dGVyUHJvdmlkZXIpe1xyXG4gICAgICAgIGxldCBlZGl0PXtcclxuICAgICAgICAgICAgbmFtZTogJ2VkaXQnLFxyXG4gICAgICAgICAgICB1cmw6Jy9lZGl0JyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvY2xpZW50L3ZpZXdzL3BhZ2UvZWRpdFByb2ZpbGUvZWRpdC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjonRWRpdENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6J2VkJ1xyXG4gICAgICAgIH1cclxuICAgICAgICAkc3RhdGVQcm92aWRlci5zdGF0ZShlZGl0KTtcclxuICAgIH1dKTtcclxufVxyXG4iLCJtb2R1bGUgYXBwe1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIEBDb250cm9sbGVyKCdNYWluUGFnZUNvbnRyb2xsZXInKVxyXG4gICAgZXhwb3J0IGNsYXNzIE1haW5QYWdlQ3RybHtcclxuICAgICAgICBcclxuICAgIH1cclxufSIsIm1vZHVsZSBhcHB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgQENvbnRyb2xsZXIoJ0VkaXRQYWdlQ29udHJvbGxlcicpXHJcbiAgICBleHBvcnQgY2xhc3MgRWRpdFBhZ2VDdHJse1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwibW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgQENvbnRyb2xsZXIoJ0hvbWVDb250cm9sbGVyJylcclxuICAgIGV4cG9ydCBjbGFzcyBIb21lQ3RybCB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgYXBwe1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIEBDb250cm9sbGVyKCdMb2dpblBhZ2VDb250cm9sbGVyJylcclxuICAgIGV4cG9ydCBjbGFzcyBMb2dpblBhZ2VDdHJse1xyXG4gICAgICAgIHByaXZhdGUgaW50ZXJuc2hpcElkOnN0cmluZztcclxuICAgICAgICBwcml2YXRlIHBhc3N3b3JkOnN0cmluZztcclxuICAgICAgICBwcml2YXRlIHVzZXJzOnN0cmluZztcclxuICAgICAgICBwcml2YXRlIGdldFVzZXJzKCRodHRwOiB7IGdldDogKGFyZzA6IHN0cmluZykgPT4gUHJvbWlzZTxhbnk+OyB9KTp2b2lke1xyXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy4vLi8uLy4vZGF0YS9kYi91c2VyLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJzPXJlcy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy51c2Vycyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBsb2dpbigpOiB2b2lkIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5pbnRlcm5zaGlwSWQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBhc3N3b3JkKTtcclxuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsdGhpcy5pbnRlcm5zaGlwSWQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VyJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgLy8gZnVuY3Rpb24oJHNjb3BlOiB7IHVzZXJzOiBhbnk7Y2hlY2tfbG9naW46YW55OyBsb2dpbjphbnk7aW50ZXJuc2hpcElkOmFueSA7IHBhc3N3b3JkOmFueTtwcm9maWxlOmFueX0sJGh0dHA6IHsgZ2V0OiAoYXJnMDogc3RyaW5nKSA9PiBQcm9taXNlPGFueT47IH0pe1xyXG4gICAgICAgIC8vICAgICAkc2NvcGUuY2hlY2tfbG9naW49ZmFsc2U7XHJcbiAgICAgICAgLy8gICAgICRodHRwLmdldCgnLi8uLy4vLi9kYXRhL2RiL3VzZXIuanNvbicpLnRoZW4oZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICAvLyAgICAgICAgICRzY29wZS51c2Vycz1yZXMuZGF0YTtcclxuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS51c2Vycyk7XHJcbiAgICAgICAgLy8gICAgICAgICAvL2Z1bnRpb24gbG9naW4gYWNjb3VudFxyXG5cclxuICAgICAgICAvLyAgICAgICAgICRzY29wZS5sb2dpbj1mdW5jdGlvbigpe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHZhciBjaGVjaz1nZXRfbG9naW4oJHNjb3BlLmludGVybnNoaXBJZCwgJHNjb3BlLnBhc3N3b3JkKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICBpZihjaGVjayl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGFsZXJ0KFwiRGFuZyBuaGFwIHRoYW5oIGNvbmdcIik7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICRzY29wZS5jaGVja19sb2dpbj10cnVlO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAkc2NvcGUucHJvZmlsZT1jaGVjaztcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnByb2ZpbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgYWxlcnQoXCJUaG9uZyB0aW4gdGFpIGtob2FuIGsgaG9wIGxlXCIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgIGZ1bmN0aW9uIGdldF9sb2dpbih1c2VyOiBhbnkscGFzczogYW55KXtcclxuICAgICAgICAvLyAgICAgICAgICAgICBmb3IodmFyIGk9MDsgaTwkc2NvcGUudXNlcnMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBpZigkc2NvcGUudXNlcnNbaV0uaW50ZXJuc2hpcElkPT11c2VyICYmICRzY29wZS51c2Vyc1tpXS5wYXNzd29yZD09cGFzcyl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHNjb3BlLnVzZXJzW2ldO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuICAgIFxyXG59IiwibW9kdWxlIGFwcHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBAQ29udHJvbGxlcignVGFza0JhckNvbnRyb2xsZXInKVxyXG4gICAgZXhwb3J0IGNsYXNzIFRhc2tCYXJDdHJse1xyXG5cclxuICAgICAgICBmdW5jdGlvbigkc2NvcGU6IHsgdGVzdDogc3RyaW5nOyB9KSB7XHJcbiAgICAgICAgICAgICRzY29wZS50ZXN0PVwibmVcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
