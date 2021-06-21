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
    var headerCtrl = (function () {
        function headerCtrl() {
        }
        headerCtrl = __decorate([
            app.Directive({
                name: 'teamplateHeader',
                restrict: 'E',
                bindToController: {
                    internDto: "="
                },
                link: function (scope, el, attrs, ctrl) {
                },
                templateUrl: "page/header/header.html"
            }),
            app.Controller('HeaderCtrl')
        ], headerCtrl);
        return headerCtrl;
    }());
    app.headerCtrl = headerCtrl;
    var taskbarCtrl = (function () {
        function taskbarCtrl() {
        }
        taskbarCtrl = __decorate([
            app.Directive({
                name: 'teamplateTaskbar',
                restrict: 'E',
                bindToController: {
                    internDto: "="
                },
                link: function (scope, el, attrs, ctrl) {
                },
                templateUrl: "page/taskbar/taskbar.html"
            }),
            app.Controller('TaskbarCtrl')
        ], taskbarCtrl);
        return taskbarCtrl;
    }());
    app.taskbarCtrl = taskbarCtrl;
})(app || (app = {}));
var app;
(function (app) {
    var InternDto = (function () {
        function InternDto() {
        }
        return InternDto;
    }());
    app.InternDto = InternDto;
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
                $http.get('http://localhost:8081/getallintern').then(function (res) {
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
                if (values[0] == this.internshipId) {
                    this.check_show = true;
                    this.internshipId = values[0];
                    this.name = values[1];
                    this.birthday = values[2];
                    this.date = values[3];
                    this.log = "addEmployeeModal";
                    console.log(this.users[i]);
                    return;
                }
            }
            alert("khong tim thay ket qua nao");
        };
        EditPageCtrl.prototype.update = function ($http) {
            this.internDto = new app.InternDto();
            this.internDto.internId = this.internshipId;
            this.internDto.internName = this.name;
            this.internDto.internBirthday = this.birthday;
            this.internDto.internInCompanyDay = this.date;
            this.internDto.internPassword = this.internshipId;
            $http.post('http://localhost:8081/updateintern' + this.internDto).then(function (res) {
                if (res.data) {
                    alert("Update thanh cong");
                }
            }, function (res) {
                alert("Update that bai");
            });
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
            $http.get('http://localhost:8081/getallintern').then(function (res) {
                _this.users = res.data;
            });
        }
        LoginPageCtrl.prototype.login = function () {
            if (this.internshipId == null || this.password == null) {
                alert("Vui lòng nhập thông tin");
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
                if (values[0] == id && values[4] == pass) {
                    sessionStorage.setItem("name", values[1]);
                    sessionStorage.setItem("date", values[3]);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9jb21tb24vYW5ub3RhdGlvbi50cyIsImNsaWVudC9jb21tb24vYXBwLm1vZHVsZS50cyIsImNsaWVudC9jb21tb24vYXBwLnJvdXRlLnRzIiwiY2xpZW50L2NvbnRyb2xsZXIvbWFpblBhZ2UuY29udHJvbGxlci50cyIsImNsaWVudC9kaXJlY3RpdmVzL3RlbXAuZGlyZWN0aXZlLnRzIiwiY2xpZW50L2R0by9pbnRlcm4uZHRvLnRzIiwiY2xpZW50L3ZpZXdzL3BhZ2UvZWRpdFByb2ZpbGUvZWRpdC5jb250cm9sbGVyLnRzIiwiY2xpZW50L3ZpZXdzL3BhZ2UvbG9naW4vbG9naW4uY29udHJvbGxlci50cyIsImNsaWVudC92aWV3cy9wYWdlL2xvZ291dC9sb2dvdXQuY29udHJvbGxlci50cyIsImNsaWVudC92aWV3cy9wYWdlL3Rhc2tiYXIvdGFza0Jhci5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sR0FBRyxDQWdDVDtBQWhDRCxXQUFPLEdBQUc7SUFDTixZQUFZLENBQUM7SUFDRixtQkFBZSxHQUFHLGlCQUFpQixDQUFDO0lBRS9DLFNBQWdCLFVBQVUsQ0FBQyxJQUFXO1FBQ2xDLE9BQU8sVUFBUyxLQUFTO1lBQ3JCLEtBQUssQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDO1lBQ2pCLElBQUEsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUxlLGNBQVUsYUFLekIsQ0FBQTtJQUVELFNBQWdCLFNBQVMsQ0FBQyxTQUE2QjtRQUNuRCxPQUFPLFVBQVUsS0FBVTtZQUN2QixJQUFBLGFBQWEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRTtnQkFDcEMsU0FBUyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBRTdCLElBQUksU0FBUyxDQUFDLFdBQVcsRUFBRTtvQkFDdkIsU0FBUyxDQUFDLFdBQVcsR0FB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SUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDM0I7aUJBQ0c7Z0JBQ0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDM0I7UUFFTCxDQUFDO1FBWlEsY0FBYztZQUQxQixJQUFBLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQztXQUN0QixjQUFjLENBYTFCO1FBQUQscUJBQUM7S0FiRCxBQWFDLElBQUE7SUFiWSxrQkFBYyxpQkFhMUIsQ0FBQTtBQUVMLENBQUMsRUFuQk0sR0FBRyxLQUFILEdBQUcsUUFtQlQiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlIGFwcHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGV4cG9ydCBsZXQgdGVtcGxhdGVVcmxCYXNlID0gJy4vY2xpZW50L3ZpZXdzLyc7XHJcbiAgICBcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBDb250cm9sbGVyKG5hbWU6c3RyaW5nKXtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oY2xheno6YW55KXtcclxuICAgICAgICAgICAgY2xhenouJG5hbWU9bmFtZTtcclxuICAgICAgICAgICAgYW5ndWxhck1vZHVsZS5jb250cm9sbGVyKG5hbWUsIGNsYXp6KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIERpcmVjdGl2ZShkaXJlY3RpdmU6IGFuZ3VsYXIuSURpcmVjdGl2ZSkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoY2xheno6IGFueSkge1xyXG4gICAgICAgICAgICBhbmd1bGFyTW9kdWxlLmRpcmVjdGl2ZShkaXJlY3RpdmUubmFtZSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZGlyZWN0aXZlLmNvbnRyb2xsZXIgPSBjbGF6ejtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aXZlLnRlbXBsYXRlVXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlLnRlbXBsYXRlVXJsID0gdGVtcGxhdGVVcmxCYXNlICsgZGlyZWN0aXZlLnRlbXBsYXRlVXJsO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmUuY29udHJvbGxlckFzID0gJ3ZtJztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGl2ZS5iaW5kVG9Db250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlLnNjb3BlID0ge307XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibW9kdWxlIGFwcHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgbGV0IGFuZ3VsYXJNb2R1bGU9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ3VpLnJvdXRlciddKTtcclxufSIsIm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJNb2R1bGUuY29uZmlnKFsnJHN0YXRlUHJvdmlkZXInLCAnJHVybFJvdXRlclByb3ZpZGVyJywgZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcclxuICAgICAgICBsZXQgbG9naW4gPSB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdsb2dpbicsXHJcbiAgICAgICAgICAgIHVybDogJy9sb2dpbicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2NsaWVudC92aWV3cy9wYWdlL2xvZ2luL2xvZ2luLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnTG9naW5QYWdlQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG1haW5wYWdlID0ge1xyXG4gICAgICAgICAgICBuYW1lOiAnbWFpbnBhZ2UnLFxyXG4gICAgICAgICAgICB1cmw6ICcvbWFpbnBhZ2UnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9jbGllbnQvdmlld3MvbWFpblBhZ2UuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdNYWluUGFnZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBlZGl0ID0ge1xyXG4gICAgICAgICAgICBuYW1lOiAnZWRpdCcsXHJcbiAgICAgICAgICAgIHVybDogJy9lZGl0JyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvY2xpZW50L3ZpZXdzL3BhZ2UvZWRpdFByb2ZpbGUvZWRpdC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0VkaXRQYWdlQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGxvZ291dCA9IHtcclxuICAgICAgICAgICAgbmFtZTogJ2xvZ291dCcsXHJcbiAgICAgICAgICAgIHVybDogJy9sb2dvdXQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9jbGllbnQvdmlld3MvcGFnZS9sb2dvdXQvbG9nb3V0Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnTG9nb3V0UGFnZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKGxvZ2luKTtcclxuICAgICAgICAkc3RhdGVQcm92aWRlci5zdGF0ZShtYWlucGFnZSk7XHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoZWRpdCk7XHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUobG9nb3V0KTtcclxuXHJcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnbG9naW4nKTtcclxuICAgIH1dKTtcclxuXHJcblxyXG4gICAgXHJcblxyXG59XHJcbiIsIm1vZHVsZSBhcHB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgQENvbnRyb2xsZXIoJ01haW5QYWdlQ29udHJvbGxlcicpXHJcbiAgICBleHBvcnQgY2xhc3MgTWFpblBhZ2VDdHJse1xyXG4gICAgICAgIHByaXZhdGUgZW5kZGF0ZTpzdHJpbmc9XCIwOC8xNC8yMDIxXCI7XHJcbiAgICAgICAgcHJpdmF0ZSBuZ2F5Q29ubGFpOm51bWJlcjtcclxuICAgICAgICBwcml2YXRlIG5hbWU6c3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgZGF0ZTpzdHJpbmc7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHN0YXRlOiBuZy51aS5JU3RhdGVTZXJ2aWNlKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJuYW1lXCIpICYmIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJkYXRlXCIpKXtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWU9c2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcIm5hbWVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGU9c2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0ZWI9bmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRlZT1uZXcgRGF0ZSh0aGlzLmVuZGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGs9MDtcclxuICAgICAgICAgICAgICAgIGs9ZGF0ZWUuZ2V0VGltZSgpIC1kYXRlYi5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5nYXlDb25sYWk9TWF0aC5mbG9vcihrLygyNCo2MCo2MCoxMDAwKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHN0YXRlLmdvKCdsb2dpbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxufSIsIm1vZHVsZSBhcHB7XHJcbiAgICAndXNlIHN0cmljdCdcclxuXHJcbiAgICBARGlyZWN0aXZlKHtcclxuICAgICAgICAgICAgbmFtZTogJ3RlYW1wbGF0ZUhlYWRlcicsXHJcbiAgICAgICAgICAgIHJlc3RyaWN0OidFJyxcclxuICAgICAgICAgICAgYmluZFRvQ29udHJvbGxlcjp7XHJcbiAgICAgICAgICAgICAgICBpbnRlcm5EdG86XCI9XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGluazogKHNjb3BlOmFuZ3VsYXIuSVNjb3BlLCBlbDpKUXVlcnksYXR0cnM6YW5ndWxhci5JQXR0cmlidXRlcywgY3RybDogaGVhZGVyQ3RybCkgPT57XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInBhZ2UvaGVhZGVyL2hlYWRlci5odG1sXCJcclxuICAgICAgICB9KVxyXG4gICAgICAgIEBDb250cm9sbGVyKCdIZWFkZXJDdHJsJylcclxuICAgICAgICBleHBvcnQgY2xhc3MgaGVhZGVyQ3RybHtcclxuICAgICAgICAgICAgcHJpdmF0ZSBpbnRlcm5EdG86SW50ZXJuRHRvO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQERpcmVjdGl2ZSh7XHJcbiAgICAgICAgICAgIG5hbWU6ICd0ZWFtcGxhdGVUYXNrYmFyJyxcclxuICAgICAgICAgICAgcmVzdHJpY3Q6J0UnLFxyXG4gICAgICAgICAgICBiaW5kVG9Db250cm9sbGVyOntcclxuICAgICAgICAgICAgICAgIGludGVybkR0bzpcIj1cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsaW5rOiAoc2NvcGU6YW5ndWxhci5JU2NvcGUsIGVsOkpRdWVyeSxhdHRyczphbmd1bGFyLklBdHRyaWJ1dGVzLCBjdHJsOiB0YXNrYmFyQ3RybCkgPT57XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcInBhZ2UvdGFza2Jhci90YXNrYmFyLmh0bWxcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgQENvbnRyb2xsZXIoJ1Rhc2tiYXJDdHJsJylcclxuICAgICAgICBleHBvcnQgY2xhc3MgdGFza2JhckN0cmx7XHJcbiAgICAgICAgICAgIHByaXZhdGUgaW50ZXJuRHRvOkludGVybkR0bztcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbn0iLCJtb2R1bGUgYXBwe1xyXG4gICAgZXhwb3J0IGNsYXNzIEludGVybkR0b3tcclxuICAgICAgICBpbnRlcm5JZDpzdHJpbmc7XHJcbiAgICAgICAgaW50ZXJuTmFtZTpzdHJpbmc7XHJcbiAgICAgICAgaW50ZXJuQmlydGhkYXk6c3RyaW5nO1xyXG4gICAgICAgIGludGVybkluQ29tcGFueURheTpzdHJpbmc7XHJcbiAgICAgICAgaW50ZXJuUGFzc3dvcmQ6c3RyaW5nO1xyXG4gICAgfVxyXG59IiwibW9kdWxlIGFwcHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBAQ29udHJvbGxlcignRWRpdFBhZ2VDb250cm9sbGVyJylcclxuICAgIGV4cG9ydCBjbGFzcyBFZGl0UGFnZUN0cmx7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnRlcm5EdG86SW50ZXJuRHRvO1xyXG4gICAgICAgIHByaXZhdGUgdXNlcnM6QXJyYXk8T2JqZWN0PjtcclxuICAgICAgICBwcml2YXRlIGludGVybnNoaXBJZDpzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBuYW1lOnN0cmluZztcclxuICAgICAgICBwcml2YXRlIGJpcnRoZGF5OnN0cmluZztcclxuICAgICAgICBwcml2YXRlIGRhdGU6c3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgY2hlY2tfc2hvdzpib29sZWFuPWZhbHNlO1xyXG4gICAgICAgIHByaXZhdGUgbG9nOnN0cmluZz1cIlwiO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigkaHR0cDogeyBnZXQ6ICh1cmw6IHN0cmluZykgPT4gUHJvbWlzZTxhbnk+OyB9LHByaXZhdGUgJHN0YXRlOiBuZy51aS5JU3RhdGVTZXJ2aWNlKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJuYW1lXCIpICYmIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJkYXRlXCIpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlcnM9bmV3IEFycmF5PE9iamVjdD4oKTtcclxuICAgICAgICAgICAgICAgICRodHRwLmdldCgnaHR0cDovL2xvY2FsaG9zdDo4MDgxL2dldGFsbGludGVybicpLnRoZW4oKHJlcyk9PntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJzPXJlcy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHN0YXRlLmdvKCdsb2dpbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzZWFyY2goKTp2b2lke1xyXG4gICAgICAgICAgICBpZih0aGlzLmludGVybnNoaXBJZD09bnVsbCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJoYXkgbmhhcCBpbnRlcm5zaGlwSWRcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDtpPHRoaXMudXNlcnMubGVuZ3RoO2krKykgeyBcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IE9iamVjdC5rZXlzKHRoaXMudXNlcnNbaV0pLm1hcChrZXkgPT4gdGhpcy51c2Vyc1tpXVtrZXldKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih2YWx1ZXNbMF09PXRoaXMuaW50ZXJuc2hpcElkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tfc2hvdz10cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJuc2hpcElkPXZhbHVlc1swXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hbWU9dmFsdWVzWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmlydGhkYXk9dmFsdWVzWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZT12YWx1ZXNbM107XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2c9XCJhZGRFbXBsb3llZU1vZGFsXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXNlcnNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgYWxlcnQoXCJraG9uZyB0aW0gdGhheSBrZXQgcXVhIG5hb1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdXBkYXRlKCRodHRwOiB7IHBvc3Q6ICh1cmw6IHN0cmluZykgPT4gUHJvbWlzZTxhbnk+OyB9KTp2b2lke1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbnRlcm5EdG89IG5ldyBJbnRlcm5EdG8oKTtcclxuICAgICAgICAgICAgdGhpcy5pbnRlcm5EdG8uaW50ZXJuSWQ9dGhpcy5pbnRlcm5zaGlwSWQ7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJuRHRvLmludGVybk5hbWU9dGhpcy5uYW1lO1xyXG4gICAgICAgICAgICB0aGlzLmludGVybkR0by5pbnRlcm5CaXJ0aGRheT10aGlzLmJpcnRoZGF5O1xyXG4gICAgICAgICAgICB0aGlzLmludGVybkR0by5pbnRlcm5JbkNvbXBhbnlEYXk9dGhpcy5kYXRlO1xyXG4gICAgICAgICAgICB0aGlzLmludGVybkR0by5pbnRlcm5QYXNzd29yZD10aGlzLmludGVybnNoaXBJZDtcclxuXHJcbiAgICAgICAgICAgICAkaHR0cC5wb3N0KCdodHRwOi8vbG9jYWxob3N0OjgwODEvdXBkYXRlaW50ZXJuJyt0aGlzLmludGVybkR0bykudGhlbigocmVzKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYocmVzLmRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiVXBkYXRlIHRoYW5oIGNvbmdcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiVXBkYXRlIHRoYXQgYmFpXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59IiwibW9kdWxlIGFwcHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBAQ29udHJvbGxlcignTG9naW5QYWdlQ29udHJvbGxlcicpXHJcbiAgICBleHBvcnQgY2xhc3MgTG9naW5QYWdlQ3RybHtcclxuICAgICAgICBwcml2YXRlIGludGVybnNoaXBJZDpzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBwYXNzd29yZDpzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSB1c2VyczpBcnJheTxPYmplY3Q+O1xyXG4gICAgICAgIHByaXZhdGUgdXNlcjphbnk7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCRodHRwOiB7IGdldDogKHVybDogc3RyaW5nKSA9PiBQcm9taXNlPGFueT47IH0scHJpdmF0ZSAkc3RhdGU6IG5nLnVpLklTdGF0ZVNlcnZpY2Upe1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJzPW5ldyBBcnJheTxPYmplY3Q+KCk7XHJcbiAgICAgICAgICAgICRodHRwLmdldCgnaHR0cDovL2xvY2FsaG9zdDo4MDgxL2dldGFsbGludGVybicpLnRoZW4oKHJlcyk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlcnM9cmVzLmRhdGE7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwcml2YXRlIGxvZ2luKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZih0aGlzLmludGVybnNoaXBJZD09bnVsbCB8fCB0aGlzLnBhc3N3b3JkPT1udWxsKXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiVnVpIGzDsm5nIG5o4bqtcCB0aMO0bmcgdGluXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmNoZWNrX2xvZ2luKHRoaXMuaW50ZXJuc2hpcElkLHRoaXMucGFzc3dvcmQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlNhaSB0aG9uZyB0aW4gZGFuZyBuaGFwXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkRhbmcgbmhhcCB0aGFuaCBjb25nXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyPXRoaXMuY2hlY2tfbG9naW4odGhpcy5pbnRlcm5zaGlwSWQsdGhpcy5wYXNzd29yZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzdGF0ZS5nbygnbWFpbnBhZ2UnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwcml2YXRlIGNoZWNrX2xvZ2luKGlkOiBhbnkscGFzczogYW55KXtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDtpPHRoaXMudXNlcnMubGVuZ3RoO2krKykgeyBcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IE9iamVjdC5rZXlzKHRoaXMudXNlcnNbaV0pLm1hcChrZXkgPT4gdGhpcy51c2Vyc1tpXVtrZXldKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih2YWx1ZXNbMF09PWlkICYmIHZhbHVlc1s0XT09IHBhc3MpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcIm5hbWVcIix2YWx1ZXNbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJkYXRlXCIsdmFsdWVzWzNdKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy51c2Vyc1tpXTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbn0iLCJtb2R1bGUgYXBwe1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIEBDb250cm9sbGVyKCdMb2dvdXRQYWdlQ29udHJvbGxlcicpXHJcbiAgICBleHBvcnQgY2xhc3MgTG9nb3V0UGFnZUN0cmx7XHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkc3RhdGU6IG5nLnVpLklTdGF0ZVNlcnZpY2Upe1xyXG4gICAgICAgICAgICBpZihzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwibmFtZVwiKSAmJiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiZGF0ZVwiKSl7XHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwibmFtZVwiKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJEYW5nIHh1YXQgdGhhbmggY29uZ1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHN0YXRlLmdvKCdsb2dpbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzdGF0ZS5nbygnbG9naW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiLy8gbW9kdWxlIGFwcHtcclxuLy8gICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbi8vICAgICBAQ29udHJvbGxlcignVGFza0JhckNvbnRyb2xsZXInKVxyXG4vLyAgICAgZXhwb3J0IGNsYXNzIFRhc2tCYXJDdHJse1xyXG5cclxuLy8gICAgIH1cclxuLy8gfSJdfQ==
