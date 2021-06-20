var app;
(function (app) {
    'use strict';
    app.templateUrlBase = './client/views/';
    function Controller(name) {
        return function (clazz) {
            clazz.$name = name;
            app.angularModule.controller(name, clazz);
        };
    }
    app.Controller = Controller;
    function Directive(directive) {
        return function (clazz) {
            app.angularModule.directive(directive.name, function () {
                directive.controller = clazz;
                if (directive.templateUrl) {
                    directive.templateUrl = app.templateUrlBase + directive.templateUrl;
                }
                directive.controllerAs = 'vm';
                if (directive.bindToController) {
                    directive.scope = {};
                }
                return directive;
            });
        };
    }
    app.Directive = Directive;
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
                controllerAs: 'vm'
            };
            var mainpage = {
                name: 'mainpage',
                url: '/mainpage',
                templateUrl: '/client/views/mainPage.html',
                controller: 'MainPageController',
                controllerAs: 'vm'
            };
            var edit = {
                name: 'edit',
                url: '/edit',
                templateUrl: '/client/views/page/editProfile/edit.html',
                controller: 'EditPageController',
                controllerAs: 'vm'
            };
            var logout = {
                name: 'logout',
                url: '/logout',
                templateUrl: '/client/views/page/logout/logout.html',
                controller: 'LogoutPageController',
                controllerAs: 'vm'
            };
            $stateProvider.state(login);
            $stateProvider.state(mainpage);
            $stateProvider.state(edit);
            $stateProvider.state(logout);
            $urlRouterProvider.otherwise('login');
        }]);
    app.angularModule.directive("teamplateHeader", function () {
        return {
            templateUrl: "/client/views/page/header/header.html"
        };
    });
    app.angularModule.directive("teamplateTaskbar", function () {
        return {
            templateUrl: "/client/views/page/taskbar/taskbar.html"
        };
    });
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
        function MainPageCtrl($state) {
            this.$state = $state;
            this.enddate = "08/14/2021";
            if (sessionStorage.getItem("name") && sessionStorage.getItem("date")) {
                this.name = sessionStorage.getItem("name");
                this.date = sessionStorage.getItem("date");
                var dateb = new Date();
                var datee = new Date(this.enddate);
                var k = 0;
                k = datee.getTime() - dateb.getTime();
                this.ngayConlai = Math.floor(k / (24 * 60 * 60 * 1000));
                console.log(this.ngayConlai);
            }
            else {
                this.$state.go('login');
            }
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
        function EditPageCtrl($http, $state) {
            var _this = this;
            this.$state = $state;
            this.check_show = false;
            this.log = "";
            if (sessionStorage.getItem("name") && sessionStorage.getItem("date")) {
                this.users = new Array();
                $http.get('././././data/db/user.json').then(function (res) {
                    _this.users = res.data;
                });
            }
            else {
                this.$state.go('login');
            }
        }
        EditPageCtrl.prototype.search = function () {
            var _this = this;
            if (this.internshipId == null) {
                alert("hay nhap internshipId");
                return;
            }
            for (var i = 0; i < this.users.length; i++) {
                var values = Object.keys(this.users[i]).map(function (key) { return _this.users[i][key]; });
                if (values[1] == this.internshipId) {
                    this.check_show = true;
                    this.internshipId = values[1];
                    this.name = values[3];
                    this.birthday = values[4];
                    this.date = values[5];
                    this.log = "addEmployeeModal";
                    console.log(this.users[i]);
                    return;
                }
            }
            alert("khong tim thay ket qua nao");
        };
        EditPageCtrl.prototype.update = function ($http) {
            var _this = this;
            $http.post('././././data/db/user.json').then(function (res) {
                _this.users = res.data;
            });
            console.log(this.internshipId);
            console.log(this.name);
            console.log(this.birthday);
            console.log(this.date);
        };
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
    var LoginPageCtrl = (function () {
        function LoginPageCtrl($http, $state) {
            var _this = this;
            this.$state = $state;
            this.users = new Array();
            $http.get('http://localhost:8081/categories').then(function (res) {
                _this.users = res.data;
                console.log(_this.users);
                for (var i = 0; i < _this.users.length; i++) {
                    var values = Object.keys(_this.users[i]).map(function (key) { return _this.users[i][key]; });
                    console.log("ne: ", values[0]);
                    console.log("ne2: ", values[1]);
                }
            });
        }
        LoginPageCtrl.prototype.login = function () {
            if (this.internshipId == null || this.password == null) {
                alert("Vui long nhap thong tin");
                return;
            }
            if (!this.check_login(this.internshipId, this.password)) {
                alert("Sai thong tin dang nhap");
            }
            else {
                alert("Dang nhap thanh cong");
                this.user = this.check_login(this.internshipId, this.password);
                this.$state.go('mainpage');
            }
        };
        LoginPageCtrl.prototype.check_login = function (id, pass) {
            var _this = this;
            for (var i = 0; i < this.users.length; i++) {
                var values = Object.keys(this.users[i]).map(function (key) { return _this.users[i][key]; });
                if (values[1] == id && values[2] == pass) {
                    sessionStorage.setItem("name", values[3]);
                    sessionStorage.setItem("date", values[5]);
                    return this.users[i];
                }
            }
            return false;
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
    var LogoutPageCtrl = (function () {
        function LogoutPageCtrl($state) {
            this.$state = $state;
            if (sessionStorage.getItem("name") && sessionStorage.getItem("date")) {
                sessionStorage.removeItem("name");
                sessionStorage.removeItem("date");
                alert("Dang xuat thanh cong");
                this.$state.go('login');
            }
            else {
                this.$state.go('login');
            }
        }
        LogoutPageCtrl = __decorate([
            app.Controller('LogoutPageController')
        ], LogoutPageCtrl);
        return LogoutPageCtrl;
    }());
    app.LogoutPageCtrl = LogoutPageCtrl;
})(app || (app = {}));
var app;
(function (app) {
    'use strict';
    var TaskBarCtrl = (function () {
        function TaskBarCtrl() {
        }
        TaskBarCtrl = __decorate([
            app.Controller('TaskBarController')
        ], TaskBarCtrl);
        return TaskBarCtrl;
    }());
    app.TaskBarCtrl = TaskBarCtrl;
})(app || (app = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9jb21tb24vYW5ub3RhdGlvbi50cyIsImNsaWVudC9jb21tb24vYXBwLm1vZHVsZS50cyIsImNsaWVudC9jb21tb24vYXBwLnJvdXRlLnRzIiwiY2xpZW50L2NvbnRyb2xsZXIvbWFpblBhZ2UuY29udHJvbGxlci50cyIsImNsaWVudC92aWV3cy9wYWdlL2VkaXRQcm9maWxlL2VkaXQuY29udHJvbGxlci50cyIsImNsaWVudC92aWV3cy9wYWdlL2xvZ2luL2xvZ2luLmNvbnRyb2xsZXIudHMiLCJjbGllbnQvdmlld3MvcGFnZS9sb2dvdXQvbG9nb3V0LmNvbnRyb2xsZXIudHMiLCJjbGllbnQvdmlld3MvcGFnZS90YXNrYmFyL3Rhc2tCYXIuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLEdBQUcsQ0FnQ1Q7QUFoQ0QsV0FBTyxHQUFHO0lBQ04sWUFBWSxDQUFDO0lBQ0YsbUJBQWUsR0FBRyxpQkFBaUIsQ0FBQztJQUUvQyxTQUFnQixVQUFVLENBQUMsSUFBVztRQUNsQyxPQUFPLFVBQVMsS0FBUztZQUNyQixLQUFLLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQztZQUNqQixJQUFBLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFMZSxjQUFVLGFBS3pCLENBQUE7SUFFRCxTQUFnQixTQUFTLENBQUMsU0FBNkI7UUFDbkQsT0FBTyxVQUFVLEtBQVU7WUFDdkIsSUFBQSxhQUFhLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUU7Z0JBQ3BDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2dCQUU3QixJQUFJLFNBQVMsQ0FBQyxXQUFXLEVBQUU7b0JBQ3ZCLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBQSxlQUFlLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQztpQkFFbkU7Z0JBRUQsU0FBUyxDQUFDLFlBQVks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SCxHQUFHLFFBT1QiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlIGFwcHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGV4cG9ydCBsZXQgdGVtcGxhdGVVcmxCYXNlID0gJy4vY2xpZW50L3ZpZXdzLyc7XHJcbiAgICBcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBDb250cm9sbGVyKG5hbWU6c3RyaW5nKXtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oY2xheno6YW55KXtcclxuICAgICAgICAgICAgY2xhenouJG5hbWU9bmFtZTtcclxuICAgICAgICAgICAgYW5ndWxhck1vZHVsZS5jb250cm9sbGVyKG5hbWUsIGNsYXp6KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIERpcmVjdGl2ZShkaXJlY3RpdmU6IGFuZ3VsYXIuSURpcmVjdGl2ZSkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoY2xheno6IGFueSkge1xyXG4gICAgICAgICAgICBhbmd1bGFyTW9kdWxlLmRpcmVjdGl2ZShkaXJlY3RpdmUubmFtZSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZGlyZWN0aXZlLmNvbnRyb2xsZXIgPSBjbGF6ejtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aXZlLnRlbXBsYXRlVXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlLnRlbXBsYXRlVXJsID0gdGVtcGxhdGVVcmxCYXNlICsgZGlyZWN0aXZlLnRlbXBsYXRlVXJsO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmUuY29udHJvbGxlckFzID0gJ3ZtJztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGl2ZS5iaW5kVG9Db250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlLnNjb3BlID0ge307XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibW9kdWxlIGFwcHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgbGV0IGFuZ3VsYXJNb2R1bGU9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ3VpLnJvdXRlciddKTtcclxufSIsIm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJNb2R1bGUuY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJywgZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcclxuICAgICAgICBsZXQgbG9naW4gPSB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdsb2dpbicsXHJcbiAgICAgICAgICAgIHVybDogJy9sb2dpbicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2NsaWVudC92aWV3cy9wYWdlL2xvZ2luL2xvZ2luLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnTG9naW5QYWdlQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1haW5wYWdlID0ge1xyXG4gICAgICAgICAgICBuYW1lOiAnbWFpbnBhZ2UnLFxyXG4gICAgICAgICAgICB1cmw6ICcvbWFpbnBhZ2UnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9jbGllbnQvdmlld3MvbWFpblBhZ2UuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdNYWluUGFnZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBlZGl0ID0ge1xyXG4gICAgICAgICAgICBuYW1lOiAnZWRpdCcsXHJcbiAgICAgICAgICAgIHVybDogJy9lZGl0JyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvY2xpZW50L3ZpZXdzL3BhZ2UvZWRpdFByb2ZpbGUvZWRpdC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0VkaXRQYWdlQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGxvZ291dCA9IHtcclxuICAgICAgICAgICAgbmFtZTogJ2xvZ291dCcsXHJcbiAgICAgICAgICAgIHVybDogJy9sb2dvdXQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9jbGllbnQvdmlld3MvcGFnZS9sb2dvdXQvbG9nb3V0Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnTG9nb3V0UGFnZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKGxvZ2luKTtcclxuICAgICAgICAkc3RhdGVQcm92aWRlci5zdGF0ZShtYWlucGFnZSk7XHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoZWRpdCk7XHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUobG9nb3V0KTtcclxuXHJcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnbG9naW4nKTtcclxuICAgIH1dKTtcclxuXHJcblxyXG4gICAgYW5ndWxhck1vZHVsZS5kaXJlY3RpdmUoXCJ0ZWFtcGxhdGVIZWFkZXJcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIi9jbGllbnQvdmlld3MvcGFnZS9oZWFkZXIvaGVhZGVyLmh0bWxcIlxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICBhbmd1bGFyTW9kdWxlLmRpcmVjdGl2ZShcInRlYW1wbGF0ZVRhc2tiYXJcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIi9jbGllbnQvdmlld3MvcGFnZS90YXNrYmFyL3Rhc2tiYXIuaHRtbFwiXHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxufVxyXG4iLCJtb2R1bGUgYXBwe1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIEBDb250cm9sbGVyKCdNYWluUGFnZUNvbnRyb2xsZXInKVxyXG4gICAgZXhwb3J0IGNsYXNzIE1haW5QYWdlQ3RybHtcclxuICAgICAgICBwcml2YXRlIGVuZGRhdGU6c3RyaW5nPVwiMDgvMTQvMjAyMVwiO1xyXG4gICAgICAgIHByaXZhdGUgbmdheUNvbmxhaTpudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBuYW1lOnN0cmluZztcclxuICAgICAgICBwcml2YXRlIGRhdGU6c3RyaW5nO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzdGF0ZTogbmcudWkuSVN0YXRlU2VydmljZSl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwibmFtZVwiKSAmJiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiZGF0ZVwiKSl7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lPXNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJuYW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlPXNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGViPW5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0ZWU9bmV3IERhdGUodGhpcy5lbmRkYXRlKTtcclxuICAgICAgICAgICAgICAgIHZhciBrPTA7XHJcbiAgICAgICAgICAgICAgICBrPWRhdGVlLmdldFRpbWUoKSAtZGF0ZWIuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZ2F5Q29ubGFpPU1hdGguZmxvb3Ioay8oMjQqNjAqNjAqMTAwMCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5uZ2F5Q29ubGFpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc3RhdGUuZ28oJ2xvZ2luJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwibW9kdWxlIGFwcHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBAQ29udHJvbGxlcignRWRpdFBhZ2VDb250cm9sbGVyJylcclxuICAgIGV4cG9ydCBjbGFzcyBFZGl0UGFnZUN0cmx7XHJcbiAgICAgICAgcHJpdmF0ZSB1c2VyczpBcnJheTxPYmplY3Q+O1xyXG4gICAgICAgIHByaXZhdGUgaW50ZXJuc2hpcElkOnN0cmluZztcclxuICAgICAgICBwcml2YXRlIG5hbWU6c3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgYmlydGhkYXk6c3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgZGF0ZTpzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBjaGVja19zaG93OmJvb2xlYW49ZmFsc2U7XHJcbiAgICAgICAgcHJpdmF0ZSBsb2c6c3RyaW5nPVwiXCI7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCRodHRwOiB7IGdldDogKHVybDogc3RyaW5nKSA9PiBQcm9taXNlPGFueT47IH0scHJpdmF0ZSAkc3RhdGU6IG5nLnVpLklTdGF0ZVNlcnZpY2Upe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcIm5hbWVcIikgJiYgc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImRhdGVcIikpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2Vycz1uZXcgQXJyYXk8T2JqZWN0PigpO1xyXG4gICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLy4vLi8uL2RhdGEvZGIvdXNlci5qc29uJykudGhlbigocmVzKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlcnM9cmVzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc3RhdGUuZ28oJ2xvZ2luJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHNlYXJjaCgpOnZvaWR7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaW50ZXJuc2hpcElkPT1udWxsKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcImhheSBuaGFwIGludGVybnNoaXBJZFwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwO2k8dGhpcy51c2Vycy5sZW5ndGg7aSsrKSB7IFxyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gT2JqZWN0LmtleXModGhpcy51c2Vyc1tpXSkubWFwKGtleSA9PiB0aGlzLnVzZXJzW2ldW2tleV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHZhbHVlc1sxXT09dGhpcy5pbnRlcm5zaGlwSWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja19zaG93PXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcm5zaGlwSWQ9dmFsdWVzWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmFtZT12YWx1ZXNbM107XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaXJ0aGRheT12YWx1ZXNbNF07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlPXZhbHVlc1s1XTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZz1cImFkZEVtcGxveWVlTW9kYWxcIjtcclxuICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy51c2Vyc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBhbGVydChcImtob25nIHRpbSB0aGF5IGtldCBxdWEgbmFvXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB1cGRhdGUoJGh0dHA6IHsgcG9zdDogKHVybDogc3RyaW5nKSA9PiBQcm9taXNlPGFueT47IH0pOnZvaWR7XHJcblxyXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcuLy4vLi8uL2RhdGEvZGIvdXNlci5qc29uJykudGhlbigocmVzKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2Vycz1yZXMuZGF0YTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmludGVybnNoaXBJZCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYmlydGhkYXkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59IiwibW9kdWxlIGFwcHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBAQ29udHJvbGxlcignTG9naW5QYWdlQ29udHJvbGxlcicpXHJcbiAgICBleHBvcnQgY2xhc3MgTG9naW5QYWdlQ3RybHtcclxuICAgICAgICBwcml2YXRlIGludGVybnNoaXBJZDpzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBwYXNzd29yZDpzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSB1c2VyczpBcnJheTxPYmplY3Q+O1xyXG4gICAgICAgIHByaXZhdGUgdXNlcjphbnk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCRodHRwOiB7IGdldDogKHVybDogc3RyaW5nKSA9PiBQcm9taXNlPGFueT47IH0scHJpdmF0ZSAkc3RhdGU6IG5nLnVpLklTdGF0ZVNlcnZpY2Upe1xyXG4gICAgICAgICAgICAvLy4vLi8uLy4vZGF0YS9kYi91c2VyLmpzb25cclxuICAgICAgICAgICAgdGhpcy51c2Vycz1uZXcgQXJyYXk8T2JqZWN0PigpO1xyXG4gICAgICAgICAgICAkaHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MS9jYXRlZ29yaWVzJykudGhlbigocmVzKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2Vycz1yZXMuZGF0YTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXNlcnMpO1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDtpPHRoaXMudXNlcnMubGVuZ3RoO2krKykgeyBcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBPYmplY3Qua2V5cyh0aGlzLnVzZXJzW2ldKS5tYXAoa2V5ID0+IHRoaXMudXNlcnNbaV1ba2V5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJuZTogXCIsdmFsdWVzWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5lMjogXCIsdmFsdWVzWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBsb2dpbigpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYodGhpcy5pbnRlcm5zaGlwSWQ9PW51bGwgfHwgdGhpcy5wYXNzd29yZD09bnVsbCl7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlZ1aSBsb25nIG5oYXAgdGhvbmcgdGluXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmNoZWNrX2xvZ2luKHRoaXMuaW50ZXJuc2hpcElkLHRoaXMucGFzc3dvcmQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlNhaSB0aG9uZyB0aW4gZGFuZyBuaGFwXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkRhbmcgbmhhcCB0aGFuaCBjb25nXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyPXRoaXMuY2hlY2tfbG9naW4odGhpcy5pbnRlcm5zaGlwSWQsdGhpcy5wYXNzd29yZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzdGF0ZS5nbygnbWFpbnBhZ2UnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwcml2YXRlIGNoZWNrX2xvZ2luKGlkOiBhbnkscGFzczogYW55KXtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDtpPHRoaXMudXNlcnMubGVuZ3RoO2krKykgeyBcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IE9iamVjdC5rZXlzKHRoaXMudXNlcnNbaV0pLm1hcChrZXkgPT4gdGhpcy51c2Vyc1tpXVtrZXldKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih2YWx1ZXNbMV09PWlkICYmIHZhbHVlc1syXT09IHBhc3MpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcIm5hbWVcIix2YWx1ZXNbM10pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJkYXRlXCIsdmFsdWVzWzVdKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy51c2Vyc1tpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxufSIsIm1vZHVsZSBhcHB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgQENvbnRyb2xsZXIoJ0xvZ291dFBhZ2VDb250cm9sbGVyJylcclxuICAgIGV4cG9ydCBjbGFzcyBMb2dvdXRQYWdlQ3RybHtcclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzdGF0ZTogbmcudWkuSVN0YXRlU2VydmljZSl7XHJcbiAgICAgICAgICAgIGlmKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJuYW1lXCIpICYmIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJkYXRlXCIpKXtcclxuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJuYW1lXCIpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShcImRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkRhbmcgeHVhdCB0aGFuaCBjb25nXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc3RhdGUuZ28oJ2xvZ2luJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHN0YXRlLmdvKCdsb2dpbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJtb2R1bGUgYXBwe1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIEBDb250cm9sbGVyKCdUYXNrQmFyQ29udHJvbGxlcicpXHJcbiAgICBleHBvcnQgY2xhc3MgVGFza0JhckN0cmx7XHJcblxyXG4gICAgfVxyXG59Il19
