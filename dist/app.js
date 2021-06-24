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
            this.notAdmin = true;
            this.check_show = false;
            this.log = "";
            this.check = true;
            this.status = "";
            this.updateValue = "Update thanh cong";
            if (sessionStorage.getItem("name") && sessionStorage.getItem("date")) {
                $http.get('http://192.168.11.114:8081/getallintern').then(function (res) {
                    if (res) {
                        if (sessionStorage.getItem("isAdmin") == "1") {
                            _this.notAdmin = false;
                        }
                        console.log(_this.notAdmin);
                        _this.users = new Array();
                        _this.users = res.data;
                    }
                });
            }
            else {
                this.$state.go('login');
            }
        }
        EditPageCtrl.prototype.search = function () {
            var _this = this;
            if (this.internshipId == null) {
                this.status = "hay nhap internshipId";
                $("#dialogedit").dialog({
                    autoOpen: true,
                    modal: true,
                    show: true,
                });
                return;
            }
            for (var i = 0; i < this.users.length; i++) {
                var values = Object.keys(this.users[i]).map(function (key) { return _this.users[i][key]; });
                if (values[0] == this.internshipId) {
                    this.internshipIdForm = values[0];
                    this.nameForm = values[1];
                    this.birthdayForm = values[2];
                    this.dateForm = values[3];
                    this.pass = values[4];
                    this.isAmin = values[5];
                    this.log = "addEmployeeModal";
                    return;
                }
            }
            this.status = "khong tim thay ket qua nao";
            $("#dialogedit").dialog({
                autoOpen: true,
                modal: true,
                show: true,
            });
        };
        EditPageCtrl.prototype.OK = function () {
            this.check_show = true;
            this.internshipId = this.internshipIdForm;
            this.name = this.nameForm;
            this.birthday = this.birthdayForm;
            this.date = this.dateForm;
        };
        EditPageCtrl.prototype.update = function () {
            var _this = this;
            if (this.name == null || this.birthday == null || this.date == null) {
                this.updateValue = "Cac truong khong duoc de trong";
                $("#dialogupdate").dialog({
                    autoOpen: true,
                    modal: true,
                    show: true,
                });
                return;
            }
            this.internDto = new app.InternDto();
            this.internDto.id = this.internshipId;
            this.internDto.name = this.name;
            this.internDto.birthday = this.birthday;
            this.internDto.getInCompanyDay = this.date;
            this.internDto.password = this.pass;
            this.internDto.isAdmin = this.isAmin;
            this.$http.post('http://192.168.11.114:8081/updateintern', JSON.stringify(this.internDto)).then(function (res) {
                if (res) {
                    _this.status = "Update thanh cong";
                    $("#dialogupdate").dialog({
                        autoOpen: true,
                        modal: true,
                        show: true,
                    });
                }
            })
                .catch(function (error) {
                _this.status = "Update that bai";
                $("#dialogupdate").dialog({
                    autoOpen: true,
                    modal: true,
                    show: true,
                });
            });
        };
        EditPageCtrl.prototype.okDialogEdit = function () {
            $("#dialogedit").dialog("close");
        };
        EditPageCtrl.prototype.cancleDialogEdit = function () {
            $("#dialogedit").dialog("close");
        };
        EditPageCtrl.prototype.okDialogUpdate = function () {
            $("#dialogupdate").dialog("close");
        };
        EditPageCtrl.prototype.cancleDialogUpdate = function () {
            $("#dialogupdate").dialog("close");
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
            this.$http = $http;
            this.$state = $state;
            this.status = "";
            $http.get('http://192.168.11.114:8081/getallintern').then(function (res) {
                if (res) {
                    _this.users = new Array();
                    _this.users = res.data;
                    console.log(_this.users);
                }
            });
        }
        LoginPageCtrl.prototype.login = function () {
            $("#dialog").dialog({
                autoOpen: true,
                modal: true,
                show: true,
            });
            if (this.internshipId == null || this.password == null) {
                this.status = "Vui long nhap thong tin";
                return;
            }
            if (!this.check_login(this.internshipId, this.password)) {
                this.status = "Sai thong tin dang nhap";
            }
            else {
                this.status = "Dang nhap thanh cong";
                this.user = this.check_login(this.internshipId, this.password);
            }
        };
        LoginPageCtrl.prototype.check_login = function (id, pass) {
            var _this = this;
            for (var i = 0; i < this.users.length; i++) {
                var values = Object.keys(this.users[i]).map(function (key) { return _this.users[i][key]; });
                if (values[0] == id && values[4] == pass) {
                    sessionStorage.setItem("name", values[1]);
                    sessionStorage.setItem("date", values[3]);
                    sessionStorage.setItem("isAdmin", values[5]);
                    return this.users[i];
                }
            }
            return false;
        };
        LoginPageCtrl.prototype.okDialog = function () {
            $("#dialog").dialog("close");
            this.$state.go('mainpage');
        };
        LoginPageCtrl.prototype.cancleDialog = function () {
            $("#dialog").dialog("close");
            this.$state.go('mainpage');
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
                $("#dialoglogout").dialog({
                    autoOpen: true,
                    modal: true,
                    show: true,
                });
            }
            else {
                this.$state.go('login');
            }
        }
        LogoutPageCtrl.prototype.okDialog = function () {
            $("#dialoglogout").dialog("close");
            this.$state.go('login');
        };
        LogoutPageCtrl.prototype.cancleDialog = function () {
            $("#dialoglogout").dialog("close");
            this.$state.go('login');
        };
        LogoutPageCtrl = __decorate([
            app.Controller('LogoutPageController')
        ], LogoutPageCtrl);
        return LogoutPageCtrl;
    }());
    app.LogoutPageCtrl = LogoutPageCtrl;
})(app || (app = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9jb21tb24vYW5ub3RhdGlvbi50cyIsImNsaWVudC9jb21tb24vYXBwLm1vZHVsZS50cyIsImNsaWVudC9jb21tb24vYXBwLnJvdXRlLnRzIiwiY2xpZW50L2NvbnRyb2xsZXIvbWFpblBhZ2UuY29udHJvbGxlci50cyIsImNsaWVudC9kaXJlY3RpdmVzL3RlbXAuZGlyZWN0aXZlLnRzIiwiY2xpZW50L2R0by9pbnRlcm4uZHRvLnRzIiwiY2xpZW50L3ZpZXdzL3BhZ2UvZWRpdFByb2ZpbGUvZWRpdC5jb250cm9sbGVyLnRzIiwiY2xpZW50L3ZpZXdzL3BhZ2UvbG9naW4vbG9naW4uY29udHJvbGxlci50cyIsImNsaWVudC92aWV3cy9wYWdlL2xvZ291dC9sb2dvdXQuY29udHJvbGxlci50cyIsImNsaWVudC92aWV3cy9wYWdlL3Rhc2tiYXIvdGFza0Jhci5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sR0FBRyxDQWdDVDtBQWhDRCxXQUFPLEdBQUc7SUFDTixZQUFZLENBQUM7SUFDRixtQkFBZSxHQUFHLGlCQUFpQixDQUFDO0lBRS9DLFNBQWdCLFVBQVUsQ0FBQyxJQUFXO1FBQ2xDLE9BQU8sVUFBUyxLQUFTO1lBQ3JCLEtBQUssQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDO1lBQ2pCLElBQUEsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUxlLGNBQVUsYUFLekIsQ0FBQTtJQUVELFNBQWdCLFNBQVMsQ0FBQyxTQUE2QjtRQUNuRCxPQUFPLFVBQVUsS0FBVTtZQUN2QixJQUFBLGFBQWEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRTtnQkFDcEMsU0FBUyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBRTdCLElBQUksU0FBUyxDQUFDLFdBQVcsRUFBRTtvQkFDdkIsU0FBUyxDQUFDLFdBQVcsR0FB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SSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQS9CUSxjQUFjO1lBRDFCLElBQUEsVUFBVSxDQUFDLHNCQUFzQixDQUFDO1dBQ3RCLGNBQWMsQ0FnQzFCO1FBQUQscUJBQUM7S0FoQ0QsQUFnQ0MsSUFBQTtJQWhDWSxrQkFBYyxpQkFnQzFCLENBQUE7QUFFTCxDQUFDLEVBdENNLEdBQUcsS0FBSCxHQUFHLFFBc0NUIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZSBhcHB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBleHBvcnQgbGV0IHRlbXBsYXRlVXJsQmFzZSA9ICcuL2NsaWVudC92aWV3cy8nO1xyXG4gICAgXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gQ29udHJvbGxlcihuYW1lOnN0cmluZyl7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGNsYXp6OmFueSl7XHJcbiAgICAgICAgICAgIGNsYXp6LiRuYW1lPW5hbWU7XHJcbiAgICAgICAgICAgIGFuZ3VsYXJNb2R1bGUuY29udHJvbGxlcihuYW1lLCBjbGF6eik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBEaXJlY3RpdmUoZGlyZWN0aXZlOiBhbmd1bGFyLklEaXJlY3RpdmUpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGNsYXp6OiBhbnkpIHtcclxuICAgICAgICAgICAgYW5ndWxhck1vZHVsZS5kaXJlY3RpdmUoZGlyZWN0aXZlLm5hbWUsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGRpcmVjdGl2ZS5jb250cm9sbGVyID0gY2xheno7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGl2ZS50ZW1wbGF0ZVVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZS50ZW1wbGF0ZVVybCA9IHRlbXBsYXRlVXJsQmFzZSArIGRpcmVjdGl2ZS50ZW1wbGF0ZVVybDtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZGlyZWN0aXZlLmNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkaXJlY3RpdmUuYmluZFRvQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZS5zY29wZSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBkaXJlY3RpdmU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm1vZHVsZSBhcHB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGxldCBhbmd1bGFyTW9kdWxlPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgWyd1aS5yb3V0ZXInXSk7XHJcbn0iLCJtb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyTW9kdWxlLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlcicsIGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XHJcbiAgICAgICAgbGV0IGxvZ2luID0ge1xyXG4gICAgICAgICAgICBuYW1lOiAnbG9naW4nLFxyXG4gICAgICAgICAgICB1cmw6ICcvbG9naW4nLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9jbGllbnQvdmlld3MvcGFnZS9sb2dpbi9sb2dpbi5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luUGFnZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtYWlucGFnZSA9IHtcclxuICAgICAgICAgICAgbmFtZTogJ21haW5wYWdlJyxcclxuICAgICAgICAgICAgdXJsOiAnL21haW5wYWdlJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvY2xpZW50L3ZpZXdzL21haW5QYWdlLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnTWFpblBhZ2VDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZWRpdCA9IHtcclxuICAgICAgICAgICAgbmFtZTogJ2VkaXQnLFxyXG4gICAgICAgICAgICB1cmw6ICcvZWRpdCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2NsaWVudC92aWV3cy9wYWdlL2VkaXRQcm9maWxlL2VkaXQuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdFZGl0UGFnZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBsb2dvdXQgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdsb2dvdXQnLFxyXG4gICAgICAgICAgICB1cmw6ICcvbG9nb3V0JyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvY2xpZW50L3ZpZXdzL3BhZ2UvbG9nb3V0L2xvZ291dC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0xvZ291dFBhZ2VDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc3RhdGVQcm92aWRlci5zdGF0ZShsb2dpbik7XHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUobWFpbnBhZ2UpO1xyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKGVkaXQpO1xyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKGxvZ291dCk7XHJcblxyXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJ2xvZ2luJyk7XHJcbiAgICB9XSk7XHJcblxyXG5cclxuICAgIFxyXG5cclxufVxyXG4iLCJtb2R1bGUgYXBwe1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIEBDb250cm9sbGVyKCdNYWluUGFnZUNvbnRyb2xsZXInKVxyXG4gICAgZXhwb3J0IGNsYXNzIE1haW5QYWdlQ3RybHtcclxuICAgICAgICBwcml2YXRlIGVuZGRhdGU6c3RyaW5nPVwiMDgvMTQvMjAyMVwiO1xyXG4gICAgICAgIHByaXZhdGUgbmdheUNvbmxhaTpudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBuYW1lOnN0cmluZztcclxuICAgICAgICBwcml2YXRlIGRhdGU6c3RyaW5nO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzdGF0ZTogbmcudWkuSVN0YXRlU2VydmljZSl7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwibmFtZVwiKSAmJiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiZGF0ZVwiKSl7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lPXNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJuYW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlPXNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGViPW5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0ZWU9bmV3IERhdGUodGhpcy5lbmRkYXRlKTtcclxuICAgICAgICAgICAgICAgIHZhciBrPTA7XHJcbiAgICAgICAgICAgICAgICBrPWRhdGVlLmdldFRpbWUoKSAtZGF0ZWIuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZ2F5Q29ubGFpPU1hdGguZmxvb3Ioay8oMjQqNjAqNjAqMTAwMCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzdGF0ZS5nbygnbG9naW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgYXBwe1xyXG4gICAgJ3VzZSBzdHJpY3QnXHJcblxyXG4gICAgQERpcmVjdGl2ZSh7XHJcbiAgICAgICAgICAgIG5hbWU6ICd0ZWFtcGxhdGVIZWFkZXInLFxyXG4gICAgICAgICAgICByZXN0cmljdDonRScsXHJcbiAgICAgICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6e1xyXG4gICAgICAgICAgICAgICAgaW50ZXJuRHRvOlwiPVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxpbms6IChzY29wZTphbmd1bGFyLklTY29wZSwgZWw6SlF1ZXJ5LGF0dHJzOmFuZ3VsYXIuSUF0dHJpYnV0ZXMsIGN0cmw6IGhlYWRlckN0cmwpID0+e1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJwYWdlL2hlYWRlci9oZWFkZXIuaHRtbFwiXHJcbiAgICAgICAgfSlcclxuICAgICAgICBAQ29udHJvbGxlcignSGVhZGVyQ3RybCcpXHJcbiAgICAgICAgZXhwb3J0IGNsYXNzIGhlYWRlckN0cmx7XHJcbiAgICAgICAgICAgIHByaXZhdGUgaW50ZXJuRHRvOkludGVybkR0bztcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEBEaXJlY3RpdmUoe1xyXG4gICAgICAgICAgICBuYW1lOiAndGVhbXBsYXRlVGFza2JhcicsXHJcbiAgICAgICAgICAgIHJlc3RyaWN0OidFJyxcclxuICAgICAgICAgICAgYmluZFRvQ29udHJvbGxlcjp7XHJcbiAgICAgICAgICAgICAgICBpbnRlcm5EdG86XCI9XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGluazogKHNjb3BlOmFuZ3VsYXIuSVNjb3BlLCBlbDpKUXVlcnksYXR0cnM6YW5ndWxhci5JQXR0cmlidXRlcywgY3RybDogdGFza2JhckN0cmwpID0+e1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJwYWdlL3Rhc2tiYXIvdGFza2Jhci5odG1sXCJcclxuICAgICAgICB9KVxyXG4gICAgICAgIEBDb250cm9sbGVyKCdUYXNrYmFyQ3RybCcpXHJcbiAgICAgICAgZXhwb3J0IGNsYXNzIHRhc2tiYXJDdHJse1xyXG4gICAgICAgICAgICBwcml2YXRlIGludGVybkR0bzpJbnRlcm5EdG87XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3RydWN0b3IoKXtcclxuICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG59IiwibW9kdWxlIGFwcHtcclxuICAgIGV4cG9ydCBjbGFzcyBJbnRlcm5EdG97XHJcbiAgICAgICAgaWQ6c3RyaW5nO1xyXG4gICAgICAgIG5hbWU6c3RyaW5nO1xyXG4gICAgICAgIGJpcnRoZGF5OnN0cmluZztcclxuICAgICAgICBnZXRJbkNvbXBhbnlEYXk6c3RyaW5nO1xyXG4gICAgICAgIHBhc3N3b3JkOnN0cmluZztcclxuICAgICAgICBpc0FkbWluOnN0cmluZztcclxuICAgIH1cclxufSIsIm1vZHVsZSBhcHAge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIEBDb250cm9sbGVyKCdFZGl0UGFnZUNvbnRyb2xsZXInKVxyXG4gICAgZXhwb3J0IGNsYXNzIEVkaXRQYWdlQ3RybCB7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnRlcm5EdG86IEludGVybkR0bztcclxuICAgICAgICBwcml2YXRlIHVzZXJzOiBBcnJheTxPYmplY3Q+O1xyXG4gICAgICAgIHByaXZhdGUgaW50ZXJuc2hpcElkRm9ybTogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgbmFtZUZvcm06IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIGJpcnRoZGF5Rm9ybTogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgZGF0ZUZvcm06IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIGludGVybnNoaXBJZDogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgbmFtZTogc3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgYmlydGhkYXk6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIGRhdGU6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIHBhc3M6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIGlzQW1pbjpzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBub3RBZG1pbjpib29sZWFuPXRydWU7XHJcbiAgICAgICAgcHJpdmF0ZSBjaGVja19zaG93OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgcHJpdmF0ZSBsb2c6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgcHJpdmF0ZSBjaGVjazogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0dXM6IHN0cmluZz1cIlwiO1xyXG4gICAgICAgIHByaXZhdGUgdXBkYXRlVmFsdWU6IHN0cmluZz1cIlVwZGF0ZSB0aGFuaCBjb25nXCI7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IG5nLklIdHRwU2VydmljZSwgcHJpdmF0ZSAkc3RhdGU6IG5nLnVpLklTdGF0ZVNlcnZpY2UpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwibmFtZVwiKSAmJiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiZGF0ZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgJGh0dHAuZ2V0KCdodHRwOi8vMTkyLjE2OC4xMS4xMTQ6ODA4MS9nZXRhbGxpbnRlcm4nKS50aGVuKChyZXMpPT57XHJcbiAgICAgICAgICAgICAgICBpZihyZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJpc0FkbWluXCIpPT1cIjFcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm90QWRtaW49ZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5vdEFkbWluKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJzPW5ldyBBcnJheTxPYmplY3Q+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2Vycz1yZXMuZGF0YSBhcyBBcnJheTxPYmplY3Q+O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzdGF0ZS5nbygnbG9naW4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2VhcmNoKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmludGVybnNoaXBJZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cz1cImhheSBuaGFwIGludGVybnNoaXBJZFwiO1xyXG4gICAgICAgICAgICAgICAgJChcIiNkaWFsb2dlZGl0XCIpLmRpYWxvZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b09wZW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy51c2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gT2JqZWN0LmtleXModGhpcy51c2Vyc1tpXSkubWFwKGtleSA9PiB0aGlzLnVzZXJzW2ldW2tleV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZXNbMF0gPT0gdGhpcy5pbnRlcm5zaGlwSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmludGVybnNoaXBJZEZvcm0gPSB2YWx1ZXNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYW1lRm9ybSA9IHZhbHVlc1sxXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJpcnRoZGF5Rm9ybSA9IHZhbHVlc1syXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVGb3JtID0gdmFsdWVzWzNdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFzcyA9IHZhbHVlc1s0XTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQW1pbj12YWx1ZXNbNV07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2cgPSBcImFkZEVtcGxveWVlTW9kYWxcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnN0YXR1cz1cImtob25nIHRpbSB0aGF5IGtldCBxdWEgbmFvXCI7XHJcbiAgICAgICAgICAgICQoXCIjZGlhbG9nZWRpdFwiKS5kaWFsb2coe1xyXG4gICAgICAgICAgICAgICAgYXV0b09wZW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICBtb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBPSygpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja19zaG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5pbnRlcm5zaGlwSWQgPSB0aGlzLmludGVybnNoaXBJZEZvcm07XHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMubmFtZUZvcm07XHJcbiAgICAgICAgICAgIHRoaXMuYmlydGhkYXkgPSB0aGlzLmJpcnRoZGF5Rm9ybTtcclxuICAgICAgICAgICAgdGhpcy5kYXRlID0gdGhpcy5kYXRlRm9ybTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSB1cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAodGhpcy5uYW1lID09IG51bGwgfHwgdGhpcy5iaXJ0aGRheSA9PSBudWxsIHx8IHRoaXMuZGF0ZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlPVwiQ2FjIHRydW9uZyBraG9uZyBkdW9jIGRlIHRyb25nXCI7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2RpYWxvZ3VwZGF0ZVwiKS5kaWFsb2coe1xyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9PcGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmludGVybkR0byA9IG5ldyBJbnRlcm5EdG8oKTtcclxuICAgICAgICAgICAgdGhpcy5pbnRlcm5EdG8uaWQgPSB0aGlzLmludGVybnNoaXBJZDtcclxuICAgICAgICAgICAgdGhpcy5pbnRlcm5EdG8ubmFtZSA9IHRoaXMubmFtZTtcclxuICAgICAgICAgICAgdGhpcy5pbnRlcm5EdG8uYmlydGhkYXkgPSB0aGlzLmJpcnRoZGF5O1xyXG4gICAgICAgICAgICB0aGlzLmludGVybkR0by5nZXRJbkNvbXBhbnlEYXkgPSB0aGlzLmRhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJuRHRvLnBhc3N3b3JkID0gdGhpcy5wYXNzO1xyXG4gICAgICAgICAgICB0aGlzLmludGVybkR0by5pc0FkbWluID0gdGhpcy5pc0FtaW47XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRodHRwLnBvc3QoJ2h0dHA6Ly8xOTIuMTY4LjExLjExNDo4MDgxL3VwZGF0ZWludGVybicsSlNPTi5zdHJpbmdpZnkodGhpcy5pbnRlcm5EdG8pKS50aGVuKChyZXMpPT57XHJcbiAgICAgICAgICAgICAgICBpZihyZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzPVwiVXBkYXRlIHRoYW5oIGNvbmdcIjtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2RpYWxvZ3VwZGF0ZVwiKS5kaWFsb2coe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvT3BlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzPVwiVXBkYXRlIHRoYXQgYmFpXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNkaWFsb2d1cGRhdGVcIikuZGlhbG9nKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b09wZW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9vayBkaWFsb2cgZWRpdFxyXG4gICAgICAgIHByaXZhdGUgb2tEaWFsb2dFZGl0KCl7XHJcbiAgICAgICAgICAgICQoXCIjZGlhbG9nZWRpdFwiKS5kaWFsb2coXCJjbG9zZVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vY2FuY2xlIGRpYWxvZyBlZGl0XHJcbiAgICAgICAgcHJpdmF0ZSBjYW5jbGVEaWFsb2dFZGl0KCl7XHJcbiAgICAgICAgICAgICQoXCIjZGlhbG9nZWRpdFwiKS5kaWFsb2coXCJjbG9zZVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vb2sgZGlhbG9nIHVwZGF0ZVxyXG4gICAgICAgIHByaXZhdGUgb2tEaWFsb2dVcGRhdGUoKXtcclxuICAgICAgICAgICAgJChcIiNkaWFsb2d1cGRhdGVcIikuZGlhbG9nKFwiY2xvc2VcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2NhbmNsZSBkaWFsb2cgdXBkYXRlXHJcbiAgICAgICAgcHJpdmF0ZSBjYW5jbGVEaWFsb2dVcGRhdGUoKXtcclxuICAgICAgICAgICAgJChcIiNkaWFsb2d1cGRhdGVcIikuZGlhbG9nKFwiY2xvc2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJtb2R1bGUgYXBwe1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIEBDb250cm9sbGVyKCdMb2dpblBhZ2VDb250cm9sbGVyJylcclxuICAgIGV4cG9ydCBjbGFzcyBMb2dpblBhZ2VDdHJse1xyXG4gICAgICAgIHByaXZhdGUgaW50ZXJuc2hpcElkOnN0cmluZztcclxuICAgICAgICBwcml2YXRlIHBhc3N3b3JkOnN0cmluZztcclxuICAgICAgICBwcml2YXRlIHVzZXJzOkFycmF5PE9iamVjdD47XHJcbiAgICAgICAgcHJpdmF0ZSB1c2VyOmFueTtcclxuICAgICAgICBwcml2YXRlIHN0YXR1czpzdHJpbmc9XCJcIjtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogbmcuSUh0dHBTZXJ2aWNlLHByaXZhdGUgJHN0YXRlOiBuZy51aS5JU3RhdGVTZXJ2aWNlKXtcclxuXHJcbiAgICAgICAgICAgICRodHRwLmdldCgnaHR0cDovLzE5Mi4xNjguMTEuMTE0OjgwODEvZ2V0YWxsaW50ZXJuJykudGhlbigocmVzKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYocmVzKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJzPW5ldyBBcnJheTxPYmplY3Q+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2Vycz1yZXMuZGF0YSBhcyBBcnJheTxPYmplY3Q+O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXNlcnMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTsgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBsb2dpbigpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgICQoXCIjZGlhbG9nXCIpLmRpYWxvZyh7XHJcbiAgICAgICAgICAgICAgICBhdXRvT3BlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuaW50ZXJuc2hpcElkPT1udWxsIHx8IHRoaXMucGFzc3dvcmQ9PW51bGwpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0dXM9XCJWdWkgbG9uZyBuaGFwIHRob25nIHRpblwiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmNoZWNrX2xvZ2luKHRoaXMuaW50ZXJuc2hpcElkLHRoaXMucGFzc3dvcmQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cz1cIlNhaSB0aG9uZyB0aW4gZGFuZyBuaGFwXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzPVwiRGFuZyBuaGFwIHRoYW5oIGNvbmdcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlcj10aGlzLmNoZWNrX2xvZ2luKHRoaXMuaW50ZXJuc2hpcElkLHRoaXMucGFzc3dvcmQpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgY2hlY2tfbG9naW4oaWQ6IGFueSxwYXNzOiBhbnkpe1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwO2k8dGhpcy51c2Vycy5sZW5ndGg7aSsrKSB7IFxyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gT2JqZWN0LmtleXModGhpcy51c2Vyc1tpXSkubWFwKGtleSA9PiB0aGlzLnVzZXJzW2ldW2tleV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHZhbHVlc1swXT09aWQgJiYgdmFsdWVzWzRdPT0gcGFzcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwibmFtZVwiLHZhbHVlc1sxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImRhdGVcIix2YWx1ZXNbM10pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJpc0FkbWluXCIsdmFsdWVzWzVdKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy51c2Vyc1tpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vb2sgZGlhbG9nXHJcbiAgICAgICAgcHVibGljIG9rRGlhbG9nKCl7XHJcbiAgICAgICAgICAgICQoXCIjZGlhbG9nXCIpLmRpYWxvZyhcImNsb3NlXCIpO1xyXG4gICAgICAgICAgICB0aGlzLiRzdGF0ZS5nbygnbWFpbnBhZ2UnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vY2FuY2xlIGRpYWxvZ1xyXG4gICAgICAgIHB1YmxpYyBjYW5jbGVEaWFsb2coKXtcclxuICAgICAgICAgICAgJChcIiNkaWFsb2dcIikuZGlhbG9nKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgIHRoaXMuJHN0YXRlLmdvKCdtYWlucGFnZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59IiwibW9kdWxlIGFwcHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBAQ29udHJvbGxlcignTG9nb3V0UGFnZUNvbnRyb2xsZXInKVxyXG4gICAgZXhwb3J0IGNsYXNzIExvZ291dFBhZ2VDdHJse1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzdGF0ZTogbmcudWkuSVN0YXRlU2VydmljZSl7XHJcbiAgICAgICAgICAgIGlmKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJuYW1lXCIpICYmIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJkYXRlXCIpKXtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwibmFtZVwiKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiNkaWFsb2dsb2dvdXRcIikuZGlhbG9nKHtcclxuICAgICAgICAgICAgICAgICAgICBhdXRvT3BlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc3RhdGUuZ28oJ2xvZ2luJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL29rIGRpYWxvZ1xyXG4gICAgICAgIHByaXZhdGUgb2tEaWFsb2coKXtcclxuICAgICAgICAgICAgJChcIiNkaWFsb2dsb2dvdXRcIikuZGlhbG9nKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgIHRoaXMuJHN0YXRlLmdvKCdsb2dpbicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jYW5jbGUgZGlhbG9nXHJcbiAgICAgICAgcHJpdmF0ZSBjYW5jbGVEaWFsb2coKXtcclxuICAgICAgICAgICAgJChcIiNkaWFsb2dsb2dvdXRcIikuZGlhbG9nKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgIHRoaXMuJHN0YXRlLmdvKCdsb2dpbicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCIvLyBtb2R1bGUgYXBwe1xyXG4vLyAgICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8gICAgIEBDb250cm9sbGVyKCdUYXNrQmFyQ29udHJvbGxlcicpXHJcbi8vICAgICBleHBvcnQgY2xhc3MgVGFza0JhckN0cmx7XHJcblxyXG4vLyAgICAgfVxyXG4vLyB9Il19
