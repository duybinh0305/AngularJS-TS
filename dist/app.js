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
            this.$http = $http;
            this.$state = $state;
            this.check_show = false;
            this.log = "";
            this.check = true;
            if (sessionStorage.getItem("name") && sessionStorage.getItem("date")) {
                $http.get('http://192.168.11.114:8081/getallintern').then(function (res) {
                    _this.users = new Array();
                    _this.users = res.data;
                    console.log(_this.users);
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
                    this.pass = values[4];
                    this.log = "addEmployeeModal";
                    return;
                }
            }
            alert("khong tim thay ket qua nao");
        };
        EditPageCtrl.prototype.update = function () {
            if (this.name == null || this.birthday == null || this.date == null) {
                alert("Cac truong khong duoc de trong");
                return;
            }
            this.internDto = new app.InternDto();
            this.internDto.id = this.internshipId;
            this.internDto.name = this.name;
            this.internDto.birthday = this.birthday;
            this.internDto.getInCompanyDay = this.date;
            this.internDto.password = this.pass;
            this.$http.post('http://192.168.11.114:8081/updateintern', JSON.stringify(this.internDto))
                .then(function (response) {
                alert("Update thanh cong");
            }, function (response) {
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
            $http.get('http://192.168.11.114:8081/getallintern').then(function (res) {
                _this.users = new Array();
                _this.users = res.data;
                console.log(_this.users);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9jb21tb24vYW5ub3RhdGlvbi50cyIsImNsaWVudC9jb21tb24vYXBwLm1vZHVsZS50cyIsImNsaWVudC9jb21tb24vYXBwLnJvdXRlLnRzIiwiY2xpZW50L2NvbnRyb2xsZXIvbWFpblBhZ2UuY29udHJvbGxlci50cyIsImNsaWVudC9kaXJlY3RpdmVzL3RlbXAuZGlyZWN0aXZlLnRzIiwiY2xpZW50L2R0by9pbnRlcm4uZHRvLnRzIiwiY2xpZW50L3ZpZXdzL3BhZ2UvZWRpdFByb2ZpbGUvZWRpdC5jb250cm9sbGVyLnRzIiwiY2xpZW50L3ZpZXdzL3BhZ2UvbG9naW4vbG9naW4uY29udHJvbGxlci50cyIsImNsaWVudC92aWV3cy9wYWdlL2xvZ291dC9sb2dvdXQuY29udHJvbGxlci50cyIsImNsaWVudC92aWV3cy9wYWdlL3Rhc2tiYXIvdGFza0Jhci5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sR0FBRyxDQWdDVDtBQWhDRCxXQUFPLEdBQUc7SUFDTixZQUFZLENBQUM7SUFDRixtQkFBZSxHQUFHLGlCQUFpQixDQUFDO0lBRS9DLFNBQWdCLFVBQVUsQ0FBQyxJQUFXO1FBQ2xDLE9BQU8sVUFBUyxLQUFTO1lBQ3JCLEtBQUssQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDO1lBQ2pCLElBQUEsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUxlLGNBQVUsYUFLekIsQ0FBQTtJQUVELFNBQWdCLFNBQVMsQ0FBQyxTQUE2QjtRQUNuRCxPQUFPLFVBQVUsS0FBVTtZQUN2QixJQUFBLGFBQWEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRTtnQkFDcEMsU0FBUyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBRTdCLElBQUksU0FBUyxDQUFDLFdBQVcsRUFBRTtvQkFDdkIsU0FBUyxDQUFDLFdBQVcsR0FB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QUFPLEdBQUc7SUFDTixZQUFZLENBQUM7SUFHYjtRQUNJLHdCQUFvQixNQUEyQjtZQUEzQixXQUFNLEdBQU4sTUFBTSxDQUFxQjtZQUMzQyxJQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBQztnQkFDaEUsY0FBYyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzNCO2lCQUNHO2dCQUNBLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzNCO1FBRUwsQ0FBQztRQVpRLGNBQWM7WUFEMUIsSUFBQSxVQUFVLENBQUMsc0JBQXNCLENBQUM7V0FDdEIsY0FBYyxDQWExQjtRQUFELHFCQUFDO0tBYkQsQUFhQyxJQUFBO0lBYlksa0JBQWMsaUJBYTFCLENBQUE7QUFFTCxDQUFDLEVBbkJNLEdBQUcsS0FBSCxHQUFHLFFBbUJUIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZSBhcHB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBleHBvcnQgbGV0IHRlbXBsYXRlVXJsQmFzZSA9ICcuL2NsaWVudC92aWV3cy8nO1xyXG4gICAgXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gQ29udHJvbGxlcihuYW1lOnN0cmluZyl7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGNsYXp6OmFueSl7XHJcbiAgICAgICAgICAgIGNsYXp6LiRuYW1lPW5hbWU7XHJcbiAgICAgICAgICAgIGFuZ3VsYXJNb2R1bGUuY29udHJvbGxlcihuYW1lLCBjbGF6eik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBEaXJlY3RpdmUoZGlyZWN0aXZlOiBhbmd1bGFyLklEaXJlY3RpdmUpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGNsYXp6OiBhbnkpIHtcclxuICAgICAgICAgICAgYW5ndWxhck1vZHVsZS5kaXJlY3RpdmUoZGlyZWN0aXZlLm5hbWUsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGRpcmVjdGl2ZS5jb250cm9sbGVyID0gY2xheno7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGl2ZS50ZW1wbGF0ZVVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZS50ZW1wbGF0ZVVybCA9IHRlbXBsYXRlVXJsQmFzZSArIGRpcmVjdGl2ZS50ZW1wbGF0ZVVybDtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZGlyZWN0aXZlLmNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkaXJlY3RpdmUuYmluZFRvQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZS5zY29wZSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBkaXJlY3RpdmU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm1vZHVsZSBhcHB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGxldCBhbmd1bGFyTW9kdWxlPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgWyd1aS5yb3V0ZXInXSk7XHJcbn0iLCJtb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyTW9kdWxlLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlcicsIGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XHJcbiAgICAgICAgbGV0IGxvZ2luID0ge1xyXG4gICAgICAgICAgICBuYW1lOiAnbG9naW4nLFxyXG4gICAgICAgICAgICB1cmw6ICcvbG9naW4nLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9jbGllbnQvdmlld3MvcGFnZS9sb2dpbi9sb2dpbi5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luUGFnZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtYWlucGFnZSA9IHtcclxuICAgICAgICAgICAgbmFtZTogJ21haW5wYWdlJyxcclxuICAgICAgICAgICAgdXJsOiAnL21haW5wYWdlJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvY2xpZW50L3ZpZXdzL21haW5QYWdlLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnTWFpblBhZ2VDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZWRpdCA9IHtcclxuICAgICAgICAgICAgbmFtZTogJ2VkaXQnLFxyXG4gICAgICAgICAgICB1cmw6ICcvZWRpdCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2NsaWVudC92aWV3cy9wYWdlL2VkaXRQcm9maWxlL2VkaXQuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdFZGl0UGFnZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBsb2dvdXQgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdsb2dvdXQnLFxyXG4gICAgICAgICAgICB1cmw6ICcvbG9nb3V0JyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvY2xpZW50L3ZpZXdzL3BhZ2UvbG9nb3V0L2xvZ291dC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0xvZ291dFBhZ2VDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc3RhdGVQcm92aWRlci5zdGF0ZShsb2dpbik7XHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUobWFpbnBhZ2UpO1xyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKGVkaXQpO1xyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKGxvZ291dCk7XHJcblxyXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJ2xvZ2luJyk7XHJcbiAgICB9XSk7XHJcblxyXG5cclxuICAgIFxyXG5cclxufVxyXG4iLCJtb2R1bGUgYXBwe1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIEBDb250cm9sbGVyKCdNYWluUGFnZUNvbnRyb2xsZXInKVxyXG4gICAgZXhwb3J0IGNsYXNzIE1haW5QYWdlQ3RybHtcclxuICAgICAgICBwcml2YXRlIGVuZGRhdGU6c3RyaW5nPVwiMDgvMTQvMjAyMVwiO1xyXG4gICAgICAgIHByaXZhdGUgbmdheUNvbmxhaTpudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBuYW1lOnN0cmluZztcclxuICAgICAgICBwcml2YXRlIGRhdGU6c3RyaW5nO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzdGF0ZTogbmcudWkuSVN0YXRlU2VydmljZSl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwibmFtZVwiKSAmJiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiZGF0ZVwiKSl7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lPXNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJuYW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlPXNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGViPW5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0ZWU9bmV3IERhdGUodGhpcy5lbmRkYXRlKTtcclxuICAgICAgICAgICAgICAgIHZhciBrPTA7XHJcbiAgICAgICAgICAgICAgICBrPWRhdGVlLmdldFRpbWUoKSAtZGF0ZWIuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZ2F5Q29ubGFpPU1hdGguZmxvb3Ioay8oMjQqNjAqNjAqMTAwMCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzdGF0ZS5nbygnbG9naW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgYXBwe1xyXG4gICAgJ3VzZSBzdHJpY3QnXHJcblxyXG4gICAgQERpcmVjdGl2ZSh7XHJcbiAgICAgICAgICAgIG5hbWU6ICd0ZWFtcGxhdGVIZWFkZXInLFxyXG4gICAgICAgICAgICByZXN0cmljdDonRScsXHJcbiAgICAgICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6e1xyXG4gICAgICAgICAgICAgICAgaW50ZXJuRHRvOlwiPVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxpbms6IChzY29wZTphbmd1bGFyLklTY29wZSwgZWw6SlF1ZXJ5LGF0dHJzOmFuZ3VsYXIuSUF0dHJpYnV0ZXMsIGN0cmw6IGhlYWRlckN0cmwpID0+e1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJwYWdlL2hlYWRlci9oZWFkZXIuaHRtbFwiXHJcbiAgICAgICAgfSlcclxuICAgICAgICBAQ29udHJvbGxlcignSGVhZGVyQ3RybCcpXHJcbiAgICAgICAgZXhwb3J0IGNsYXNzIGhlYWRlckN0cmx7XHJcbiAgICAgICAgICAgIHByaXZhdGUgaW50ZXJuRHRvOkludGVybkR0bztcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEBEaXJlY3RpdmUoe1xyXG4gICAgICAgICAgICBuYW1lOiAndGVhbXBsYXRlVGFza2JhcicsXHJcbiAgICAgICAgICAgIHJlc3RyaWN0OidFJyxcclxuICAgICAgICAgICAgYmluZFRvQ29udHJvbGxlcjp7XHJcbiAgICAgICAgICAgICAgICBpbnRlcm5EdG86XCI9XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGluazogKHNjb3BlOmFuZ3VsYXIuSVNjb3BlLCBlbDpKUXVlcnksYXR0cnM6YW5ndWxhci5JQXR0cmlidXRlcywgY3RybDogdGFza2JhckN0cmwpID0+e1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJwYWdlL3Rhc2tiYXIvdGFza2Jhci5odG1sXCJcclxuICAgICAgICB9KVxyXG4gICAgICAgIEBDb250cm9sbGVyKCdUYXNrYmFyQ3RybCcpXHJcbiAgICAgICAgZXhwb3J0IGNsYXNzIHRhc2tiYXJDdHJse1xyXG4gICAgICAgICAgICBwcml2YXRlIGludGVybkR0bzpJbnRlcm5EdG87XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3RydWN0b3IoKXtcclxuICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG59IiwibW9kdWxlIGFwcHtcclxuICAgIGV4cG9ydCBjbGFzcyBJbnRlcm5EdG97XHJcbiAgICAgICAgaWQ6c3RyaW5nO1xyXG4gICAgICAgIG5hbWU6c3RyaW5nO1xyXG4gICAgICAgIGJpcnRoZGF5OnN0cmluZztcclxuICAgICAgICBnZXRJbkNvbXBhbnlEYXk6c3RyaW5nO1xyXG4gICAgICAgIHBhc3N3b3JkOnN0cmluZztcclxuICAgIH1cclxufSIsIm1vZHVsZSBhcHB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgQENvbnRyb2xsZXIoJ0VkaXRQYWdlQ29udHJvbGxlcicpXHJcbiAgICBleHBvcnQgY2xhc3MgRWRpdFBhZ2VDdHJse1xyXG4gICAgICAgIHByaXZhdGUgaW50ZXJuRHRvOkludGVybkR0bztcclxuICAgICAgICBwcml2YXRlIHVzZXJzOkFycmF5PE9iamVjdD47XHJcbiAgICAgICAgcHJpdmF0ZSBpbnRlcm5zaGlwSWQ6c3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgbmFtZTpzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBiaXJ0aGRheTpzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBkYXRlOnN0cmluZztcclxuICAgICAgICBwcml2YXRlIHBhc3M6c3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgY2hlY2tfc2hvdzpib29sZWFuPWZhbHNlO1xyXG4gICAgICAgIHByaXZhdGUgbG9nOnN0cmluZz1cIlwiO1xyXG4gICAgICAgIHByaXZhdGUgY2hlY2s6Ym9vbGVhbj10cnVlO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRodHRwOm5nLklIdHRwU2VydmljZSxwcml2YXRlICRzdGF0ZTogbmcudWkuSVN0YXRlU2VydmljZSl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwibmFtZVwiKSAmJiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiZGF0ZVwiKSl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICRodHRwLmdldCgnaHR0cDovLzE5Mi4xNjguMTEuMTE0OjgwODEvZ2V0YWxsaW50ZXJuJykudGhlbigocmVzKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlcnM9bmV3IEFycmF5PE9iamVjdD4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJzID1yZXMuZGF0YSBhcyBBcnJheTxPYmplY3Q+O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXNlcnMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHN0YXRlLmdvKCdsb2dpbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzZWFyY2goKTp2b2lke1xyXG4gICAgICAgICAgICBpZih0aGlzLmludGVybnNoaXBJZD09bnVsbCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJoYXkgbmhhcCBpbnRlcm5zaGlwSWRcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwO2k8dGhpcy51c2Vycy5sZW5ndGg7aSsrKSB7IFxyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gT2JqZWN0LmtleXModGhpcy51c2Vyc1tpXSkubWFwKGtleSA9PiB0aGlzLnVzZXJzW2ldW2tleV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHZhbHVlc1swXT09dGhpcy5pbnRlcm5zaGlwSWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja19zaG93PXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcm5zaGlwSWQ9dmFsdWVzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmFtZT12YWx1ZXNbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaXJ0aGRheT12YWx1ZXNbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlPXZhbHVlc1szXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhc3M9dmFsdWVzWzRdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nPVwiYWRkRW1wbG95ZWVNb2RhbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBhbGVydChcImtob25nIHRpbSB0aGF5IGtldCBxdWEgbmFvXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB1cGRhdGUoKTp2b2lke1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5uYW1lPT1udWxsIHx8IHRoaXMuYmlydGhkYXk9PW51bGwgfHwgdGhpcy5kYXRlPT1udWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkNhYyB0cnVvbmcga2hvbmcgZHVvYyBkZSB0cm9uZ1wiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmludGVybkR0bz0gbmV3IEludGVybkR0bygpO1xyXG4gICAgICAgICAgICB0aGlzLmludGVybkR0by5pZD10aGlzLmludGVybnNoaXBJZDtcclxuICAgICAgICAgICAgdGhpcy5pbnRlcm5EdG8ubmFtZT10aGlzLm5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJuRHRvLmJpcnRoZGF5PXRoaXMuYmlydGhkYXk7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJuRHRvLmdldEluQ29tcGFueURheT10aGlzLmRhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJuRHRvLnBhc3N3b3JkPXRoaXMucGFzcztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuJGh0dHAucG9zdCgnaHR0cDovLzE5Mi4xNjguMTEuMTE0OjgwODEvdXBkYXRlaW50ZXJuJywgSlNPTi5zdHJpbmdpZnkodGhpcy5pbnRlcm5EdG8pKVxyXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJVcGRhdGUgdGhhbmggY29uZ1wiKTtcclxuICAgICAgICAgICAgfSwgXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3BvbnNlKSB7IFxyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJVcGRhdGUgdGhhdCBiYWlcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iLCJtb2R1bGUgYXBwe1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIEBDb250cm9sbGVyKCdMb2dpblBhZ2VDb250cm9sbGVyJylcclxuICAgIGV4cG9ydCBjbGFzcyBMb2dpblBhZ2VDdHJse1xyXG4gICAgICAgIHByaXZhdGUgaW50ZXJuc2hpcElkOnN0cmluZztcclxuICAgICAgICBwcml2YXRlIHBhc3N3b3JkOnN0cmluZztcclxuICAgICAgICBwcml2YXRlIHVzZXJzOkFycmF5PE9iamVjdD47XHJcbiAgICAgICAgcHJpdmF0ZSB1c2VyOmFueTtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoJGh0dHA6IHsgZ2V0OiAodXJsOiBzdHJpbmcpID0+IFByb21pc2U8YW55PjsgfSxwcml2YXRlICRzdGF0ZTogbmcudWkuSVN0YXRlU2VydmljZSl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkaHR0cC5nZXQoJ2h0dHA6Ly8xOTIuMTY4LjExLjExNDo4MDgxL2dldGFsbGludGVybicpLnRoZW4oKHJlcyk9PntcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlcnM9bmV3IEFycmF5PE9iamVjdD4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlcnM9cmVzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVzZXJzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgbG9naW4oKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaW50ZXJuc2hpcElkPT1udWxsIHx8IHRoaXMucGFzc3dvcmQ9PW51bGwpe1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJWdWkgbMOybmcgbmjhuq1wIHRow7RuZyB0aW5cIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoIXRoaXMuY2hlY2tfbG9naW4odGhpcy5pbnRlcm5zaGlwSWQsdGhpcy5wYXNzd29yZCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiU2FpIHRob25nIHRpbiBkYW5nIG5oYXBcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwiRGFuZyBuaGFwIHRoYW5oIGNvbmdcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXI9dGhpcy5jaGVja19sb2dpbih0aGlzLmludGVybnNoaXBJZCx0aGlzLnBhc3N3b3JkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHN0YXRlLmdvKCdtYWlucGFnZScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgY2hlY2tfbG9naW4oaWQ6IGFueSxwYXNzOiBhbnkpe1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwO2k8dGhpcy51c2Vycy5sZW5ndGg7aSsrKSB7IFxyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gT2JqZWN0LmtleXModGhpcy51c2Vyc1tpXSkubWFwKGtleSA9PiB0aGlzLnVzZXJzW2ldW2tleV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHZhbHVlc1swXT09aWQgJiYgdmFsdWVzWzRdPT0gcGFzcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwibmFtZVwiLHZhbHVlc1sxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImRhdGVcIix2YWx1ZXNbM10pO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnVzZXJzW2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxufSIsIm1vZHVsZSBhcHB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgQENvbnRyb2xsZXIoJ0xvZ291dFBhZ2VDb250cm9sbGVyJylcclxuICAgIGV4cG9ydCBjbGFzcyBMb2dvdXRQYWdlQ3RybHtcclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzdGF0ZTogbmcudWkuSVN0YXRlU2VydmljZSl7XHJcbiAgICAgICAgICAgIGlmKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJuYW1lXCIpICYmIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJkYXRlXCIpKXtcclxuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJuYW1lXCIpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShcImRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkRhbmcgeHVhdCB0aGFuaCBjb25nXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc3RhdGUuZ28oJ2xvZ2luJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHN0YXRlLmdvKCdsb2dpbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCIvLyBtb2R1bGUgYXBwe1xyXG4vLyAgICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gICAgIEBDb250cm9sbGVyKCdUYXNrQmFyQ29udHJvbGxlcicpXHJcbi8vICAgICBleHBvcnQgY2xhc3MgVGFza0JhckN0cmx7XHJcblxyXG4vLyAgICAgfVxyXG4vLyB9Il19
