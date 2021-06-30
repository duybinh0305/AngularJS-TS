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
                params: {
                    id: null
                },
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
    angular.module('app').filter('upper', function () {
        return function (item) {
            return item.toUpperCase();
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
        function MainPageCtrl($state, $stateParams) {
            this.$state = $state;
            this.enddate = "08/14/2021";
            console.log("id: ", $stateParams.id);
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
            this.check_edit = true;
            this.check_birthday = true;
            this.check_add = true;
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
                    this.isAdmin = values[5];
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
            this.internDto.isAdmin = this.isAdmin;
            this.$http.post('http://192.168.11.114:8081/updateintern', JSON.stringify(this.internDto)).then(function (res) {
                if (res) {
                    _this.status = "Update thanh cong";
                    _this.$http.get('http://192.168.11.114:8081/getallintern').then(function (res) {
                        if (res) {
                            _this.users = new Array();
                            _this.users = res.data;
                            console.log(_this.users);
                            $("#dialogupdate").dialog({
                                autoOpen: true,
                                modal: true,
                                show: true,
                            });
                        }
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
        EditPageCtrl.prototype.okDialogDelete = function () {
            var _this = this;
            this.$http.get('http://192.168.11.114:8081/deleteById?id=' + this.idDelete).then(function (res) {
                if (res) {
                    _this.statusDelete = "Xoa thanh cong";
                    $("#statusdelete").dialog({
                        autoOpen: true,
                        modal: true,
                        show: true,
                    });
                    _this.getAllUsers();
                }
            })
                .catch(function (error) {
                _this.statusDelete = "Xoa that bai";
                $("#statusdelete").dialog({
                    autoOpen: true,
                    modal: true,
                    show: true,
                });
            });
            $("#dialogdelete").dialog("close");
        };
        EditPageCtrl.prototype.okDialogStatusDelete = function () {
            $("#statusdelete").dialog("close");
        };
        EditPageCtrl.prototype.cancleDialogDelete = function () {
            $("#dialogdelete").dialog("close");
        };
        EditPageCtrl.prototype.edit = function (id) {
            var _this = this;
            this.check_add = true;
            this.check_birthday = true;
            for (var i = 0; i < this.users.length; i++) {
                var values = Object.keys(this.users[i]).map(function (key) { return _this.users[i][key]; });
                console.log(values[0]);
                if (values[0] == id) {
                    this.internshipId = values[0];
                    this.name = values[1];
                    this.birthday = values[2];
                    this.date = values[3];
                    this.pass = values[4];
                    this.isAdmin = values[5];
                    if (sessionStorage.getItem("isAdmin") == "1") {
                        this.check_edit = false;
                    }
                    return;
                }
            }
        };
        EditPageCtrl.prototype.delete = function (id) {
            this.idDelete = id;
            $("#dialogdelete").dialog({
                autoOpen: true,
                modal: true,
                show: true,
            });
        };
        EditPageCtrl.prototype.checkBirthday = function () {
            var regex = /^[0-9]{4}[\/](0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])$/g;
            if (!regex.test(this.birthday))
                this.check_birthday = false;
            else
                this.check_birthday = true;
        };
        EditPageCtrl.prototype.new = function () {
            this.check_add = false;
            this.check_birthday = true;
            this.internshipId = "";
            this.name = "";
            this.birthday = "";
            this.date = "";
            this.pass = "";
            this.isAdmin = "";
        };
        EditPageCtrl.prototype.add = function () {
            var _this = this;
            this.internDto = new app.InternDto();
            this.internDto.id = this.internshipId;
            this.internDto.name = this.name;
            this.internDto.birthday = this.birthday;
            this.internDto.getInCompanyDay = this.date;
            this.internDto.password = this.pass;
            this.internDto.isAdmin = this.isAdmin;
            this.$http.post('http://192.168.11.114:8081/addintern', JSON.stringify(this.internDto)).then(function (res) {
                if (res) {
                    alert("Them thanh cong");
                    _this.getAllUsers();
                }
            })
                .catch(function (error) {
                alert("Them that bai");
            });
            this.new();
        };
        EditPageCtrl.prototype.getAllUsers = function () {
            var _this = this;
            this.$http.get('http://192.168.11.114:8081/getallintern').then(function (res) {
                if (res) {
                    _this.users = new Array();
                    _this.users = res.data;
                    console.log(_this.users);
                }
            });
        };
        EditPageCtrl.prototype.refesh = function () {
            this.getAllUsers();
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
            this.test = "nene";
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
            if (this.check_login(this.internshipId, this.password)) {
                this.$state.go('mainpage', { id: this.internshipId });
            }
        };
        LoginPageCtrl.prototype.cancleDialog = function () {
            $("#dialog").dialog("close");
            if (this.check_login(this.internshipId, this.password)) {
                this.$state.go('mainpage', { id: this.internshipId });
            }
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9jb21tb24vYW5ub3RhdGlvbi50cyIsImNsaWVudC9jb21tb24vYXBwLm1vZHVsZS50cyIsImNsaWVudC9jb21tb24vYXBwLnJvdXRlLnRzIiwiY2xpZW50L2NvbnRyb2xsZXIvbWFpblBhZ2UuY29udHJvbGxlci50cyIsImNsaWVudC9kaXJlY3RpdmVzL3RlbXAuZGlyZWN0aXZlLnRzIiwiY2xpZW50L2R0by9pbnRlcm4uZHRvLnRzIiwiY2xpZW50L3ZpZXdzL3BhZ2UvZWRpdFByb2ZpbGUvZWRpdC5jb250cm9sbGVyLnRzIiwiY2xpZW50L3ZpZXdzL3BhZ2UvbG9naW4vbG9naW4uY29udHJvbGxlci50cyIsImNsaWVudC92aWV3cy9wYWdlL2xvZ291dC9sb2dvdXQuY29udHJvbGxlci50cyIsImNsaWVudC92aWV3cy9wYWdlL3Rhc2tiYXIvdGFza0Jhci5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sR0FBRyxDQWdDVDtBQWhDRCxXQUFPLEdBQUc7SUFDTixZQUFZLENBQUM7SUFDRixtQkFBZSxHQUFHLGlCQUFpQixDQUFDO0lBRS9DLFNBQWdCLFVBQVUsQ0FBQyxJQUFXO1FBQ2xDLE9BQU8sVUFBUyxLQUFTO1lBQ3JCLEtBQUssQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDO1lBQ2pCLElBQUEsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUxlLGNBQVUsYUFLekIsQ0FBQTtJQUVELFNBQWdCLFNBQVMsQ0FBQyxTQUE2QjtRQUNuRCxPQUFPLFVBQVUsS0FBVTtZQUN2QixJQUFBLGFBQWEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRTtnQkFDcEMsU0FBUyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBRTdCLElBQUksU0FBUyxDQUFDLFdBQVcsRUFBRTtvQkFDdkIsU0FBUyxDQUFDLFdBQVcsR0FBRyxJQUFBLGVBQWUsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDO2lCQUVuRTtnQkFFRCxTQUFTLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFHOUIsSUFBSSxTQUFTLENBQUMsZ0JBQWdCLEVBQUU7b0JBQzVCLFNBQVMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2lCQUN4QjtnQkFFRCxPQUFPLFNBQVMsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFwQmUsYUFBUyxZQW9CeEIsQ0FBQTtBQUNMLENBQUMsRUFoQ00sR0FBRyxLQUFILEdBQUcsUUFnQ1Q7QUNoQ0QsSUFBTyxHQUFHLENBSVQ7QUFKRCxXQUFPLEdBQUc7SUFDTixZQUFZLENBQUM7SUFFRixpQkFBYSxHQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUNuRSxDQUFDLEVBSk0sR0FBRyxLQUFILEdBQUcsUUFJVDtBQ0pELElBQU8sR0FBRyxDQXNEVDtBQXRERCxXQUFPLEdBQUc7SUFDTixZQUFZLENBQUM7SUFFYixJQUFBLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxvQkFBb0IsRUFBRSxVQUFVLGNBQWMsRUFBRSxrQkFBa0I7WUFDdEcsSUFBSSxLQUFLLEdBQUc7Z0JBQ1IsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsR0FBRyxFQUFFLFFBQVE7Z0JBQ2IsV0FBVyxFQUFFLHFDQUFxQztnQkFDbEQsVUFBVSxFQUFFLHFCQUFxQjtnQkFDakMsWUFBWSxFQUFFLElBQUk7YUFDckIsQ0FBQTtZQUVELElBQUksUUFBUSxHQUFHO2dCQUNYLElBQUksRUFBRSxVQUFVO2dCQUNoQixHQUFHLEVBQUUsV0FBVztnQkFDaEIsTUFBTSxFQUFDO29CQUNILEVBQUUsRUFBQyxJQUFJO2lCQUNWO2dCQUNELFdBQVcsRUFBRSw2QkFBNkI7Z0JBQzFDLFVBQVUsRUFBRSxvQkFBb0I7Z0JBQ2hDLFlBQVksRUFBRSxJQUFJO2FBQ3JCLENBQUE7WUFFRCxJQUFJLElBQUksR0FBRztnQkFDUCxJQUFJLEVBQUUsTUFBTTtnQkFDWixHQUFHLEVBQUUsT0FBTztnQkFDWixXQUFXLEVBQUUsMENBQTBDO2dCQUN2RCxVQUFVLEVBQUUsb0JBQW9CO2dCQUNoQyxZQUFZLEVBQUUsSUFBSTthQUNyQixDQUFBO1lBRUQsSUFBSSxNQUFNLEdBQUc7Z0JBQ1QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsR0FBRyxFQUFFLFNBQVM7Z0JBQ2QsV0FBVyxFQUFFLHVDQUF1QztnQkFDcEQsVUFBVSxFQUFFLHNCQUFzQjtnQkFDbEMsWUFBWSxFQUFFLElBQUk7YUFDckIsQ0FBQTtZQUVELGNBQWMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUIsY0FBYyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMvQixjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLGNBQWMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFN0Isa0JBQWtCLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFSixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUM7UUFDakMsT0FBTyxVQUFVLElBQUk7WUFDakIsT0FBTyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUIsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7QUFHUCxDQUFDLEVBdERNLEdBQUcsS0FBSCxHQUFHLFFBc0RUOzs7Ozs7O0FDdERELElBQU8sR0FBRyxDQThCVDtBQTlCRCxXQUFPLEdBQUc7SUFDTixZQUFZLENBQUM7SUFHYjtRQU1JLHNCQUFvQixNQUEyQixFQUFFLFlBQVk7WUFBekMsV0FBTSxHQUFOLE1BQU0sQ0FBcUI7WUFMdkMsWUFBTyxHQUFRLFlBQVksQ0FBQztZQU1oQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsSUFBRyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUM7Z0JBRWhFLElBQUksQ0FBQyxJQUFJLEdBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDekMsSUFBSSxDQUFDLElBQUksR0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLEtBQUssR0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNyQixJQUFJLEtBQUssR0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQztnQkFDUixDQUFDLEdBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDakQ7aUJBQ0c7Z0JBQ0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDM0I7UUFFTCxDQUFDO1FBdEJRLFlBQVk7WUFEeEIsSUFBQSxVQUFVLENBQUMsb0JBQW9CLENBQUM7V0FDcEIsWUFBWSxDQXlCeEI7UUFBRCxtQkFBQztLQXpCRCxBQXlCQyxJQUFBO0lBekJZLGdCQUFZLGVBeUJ4QixDQUFBO0FBQ0wsQ0FBQyxFQTlCTSxHQUFHLEtBQUgsR0FBRyxRQThCVDtBQzlCRCxJQUFPLEdBQUcsQ0EwQ1Q7QUExQ0QsV0FBTyxHQUFHO0lBQ04sWUFBWSxDQUFBO0lBYVI7UUFHSTtRQUVBLENBQUM7UUFMUSxVQUFVO1lBWDFCLElBQUEsU0FBUyxDQUFDO2dCQUNILElBQUksRUFBRSxpQkFBaUI7Z0JBQ3ZCLFFBQVEsRUFBQyxHQUFHO2dCQUNaLGdCQUFnQixFQUFDO29CQUNiLFNBQVMsRUFBQyxHQUFHO2lCQUNoQjtnQkFDRCxJQUFJLEVBQUUsVUFBQyxLQUFvQixFQUFFLEVBQVMsRUFBQyxLQUF5QixFQUFFLElBQWdCO2dCQUNsRixDQUFDO2dCQUNELFdBQVcsRUFBRSx5QkFBeUI7YUFDekMsQ0FBQztZQUNELElBQUEsVUFBVSxDQUFDLFlBQVksQ0FBQztXQUNaLFVBQVUsQ0FNdEI7UUFBRCxpQkFBQztLQU5ELEFBTUMsSUFBQTtJQU5ZLGNBQVUsYUFNdEIsQ0FBQTtJQWFEO1FBR0k7UUFFQSxDQUFDO1FBTFEsV0FBVztZQVh2QixJQUFBLFNBQVMsQ0FBQztnQkFDUCxJQUFJLEVBQUUsa0JBQWtCO2dCQUN4QixRQUFRLEVBQUMsR0FBRztnQkFDWixnQkFBZ0IsRUFBQztvQkFDYixTQUFTLEVBQUMsR0FBRztpQkFDaEI7Z0JBQ0QsSUFBSSxFQUFFLFVBQUMsS0FBb0IsRUFBRSxFQUFTLEVBQUMsS0FBeUIsRUFBRSxJQUFpQjtnQkFDbkYsQ0FBQztnQkFDRCxXQUFXLEVBQUUsMkJBQTJCO2FBQzNDLENBQUM7WUFDRCxJQUFBLFVBQVUsQ0FBQyxhQUFhLENBQUM7V0FDYixXQUFXLENBTXZCO1FBQUQsa0JBQUM7S0FORCxBQU1DLElBQUE7SUFOWSxlQUFXLGNBTXZCLENBQUE7QUFHVCxDQUFDLEVBMUNNLEdBQUcsS0FBSCxHQUFHLFFBMENUO0FDMUNELElBQU8sR0FBRyxDQVNUO0FBVEQsV0FBTyxHQUFHO0lBQ047UUFBQTtRQU9BLENBQUM7UUFBRCxnQkFBQztJQUFELENBUEEsQUFPQyxJQUFBO0lBUFksYUFBUyxZQU9yQixDQUFBO0FBQ0wsQ0FBQyxFQVRNLEdBQUcsS0FBSCxHQUFHLFFBU1Q7QUNURCxJQUFPLEdBQUcsQ0FnVFQ7QUFoVEQsV0FBTyxHQUFHO0lBQ04sWUFBWSxDQUFDO0lBR2I7UUEwQkksc0JBQW9CLEtBQXNCLEVBQVUsTUFBMkI7WUFBL0UsaUJBbUJDO1lBbkJtQixVQUFLLEdBQUwsS0FBSyxDQUFpQjtZQUFVLFdBQU0sR0FBTixNQUFNLENBQXFCO1lBYnZFLGFBQVEsR0FBWSxJQUFJLENBQUM7WUFDekIsZUFBVSxHQUFZLEtBQUssQ0FBQztZQUM1QixRQUFHLEdBQVcsRUFBRSxDQUFDO1lBQ2pCLFVBQUssR0FBWSxJQUFJLENBQUM7WUFDdEIsV0FBTSxHQUFXLEVBQUUsQ0FBQztZQUNwQixnQkFBVyxHQUFXLG1CQUFtQixDQUFDO1lBQzFDLGVBQVUsR0FBWSxJQUFJLENBQUM7WUFDM0IsbUJBQWMsR0FBWSxJQUFJLENBQUM7WUFDL0IsY0FBUyxHQUFZLElBQUksQ0FBQztZQU85QixJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDbEUsS0FBSyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUc7b0JBQzFELElBQUksR0FBRyxFQUFFO3dCQUNMLElBQUksY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLEVBQUU7NEJBQzFDLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO3lCQUN6Qjt3QkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDM0IsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDO3dCQUNqQyxLQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFxQixDQUFDO3FCQUMxQztnQkFDTCxDQUFDLENBQUMsQ0FBQzthQUVOO2lCQUNJO2dCQUNELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzNCO1FBRUwsQ0FBQztRQUVPLDZCQUFNLEdBQWQ7WUFBQSxpQkF1Q0M7WUFwQ0csSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksRUFBRTtnQkFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyx1QkFBdUIsQ0FBQztnQkFDdEMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQztvQkFDcEIsUUFBUSxFQUFFLElBQUk7b0JBQ2QsS0FBSyxFQUFFLElBQUk7b0JBQ1gsSUFBSSxFQUFFLElBQUk7aUJBRWIsQ0FBQyxDQUFDO2dCQUVILE9BQU87YUFDVjtZQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEMsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO2dCQUV6RSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUNoQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLElBQUksQ0FBQyxHQUFHLEdBQUcsa0JBQWtCLENBQUM7b0JBRTlCLE9BQU87aUJBQ1Y7YUFFSjtZQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsNEJBQTRCLENBQUM7WUFDM0MsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDcEIsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsS0FBSyxFQUFFLElBQUk7Z0JBQ1gsSUFBSSxFQUFFLElBQUk7YUFFYixDQUFDLENBQUM7UUFFUCxDQUFDO1FBRU8seUJBQUUsR0FBVjtZQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1lBQzFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlCLENBQUM7UUFDTyw2QkFBTSxHQUFkO1lBQUEsaUJBaURDO1lBL0NHLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7Z0JBQ2pFLElBQUksQ0FBQyxXQUFXLEdBQUcsZ0NBQWdDLENBQUM7Z0JBQ3BELENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUM7b0JBQ3RCLFFBQVEsRUFBRSxJQUFJO29CQUNkLEtBQUssRUFBRSxJQUFJO29CQUNYLElBQUksRUFBRSxJQUFJO2lCQUViLENBQUMsQ0FBQztnQkFDSCxPQUFPO2FBQ1Y7WUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBQSxTQUFTLEVBQUUsQ0FBQztZQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzNDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUV0QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyx5Q0FBeUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUc7Z0JBQ2hHLElBQUksR0FBRyxFQUFFO29CQUNMLEtBQUksQ0FBQyxNQUFNLEdBQUcsbUJBQW1CLENBQUM7b0JBRWxDLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLHlDQUF5QyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRzt3QkFDL0QsSUFBSSxHQUFHLEVBQUU7NEJBQ0wsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBVSxDQUFDOzRCQUNqQyxLQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFxQixDQUFDOzRCQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFFeEIsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQ0FDdEIsUUFBUSxFQUFFLElBQUk7Z0NBQ2QsS0FBSyxFQUFFLElBQUk7Z0NBQ1gsSUFBSSxFQUFFLElBQUk7NkJBQ2IsQ0FBQyxDQUFDO3lCQUNOO29CQUNMLENBQUMsQ0FBQyxDQUFDO2lCQUNOO1lBQ0wsQ0FBQyxDQUFDO2lCQUNHLEtBQUssQ0FBQyxVQUFDLEtBQUs7Z0JBQ1QsS0FBSSxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQztnQkFDaEMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztvQkFDdEIsUUFBUSxFQUFFLElBQUk7b0JBQ2QsS0FBSyxFQUFFLElBQUk7b0JBQ1gsSUFBSSxFQUFFLElBQUk7aUJBQ2IsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFHWCxDQUFDO1FBR08sbUNBQVksR0FBcEI7WUFDSSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFHTyx1Q0FBZ0IsR0FBeEI7WUFDSSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFHTyxxQ0FBYyxHQUF0QjtZQUVJLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUdPLHlDQUFrQixHQUExQjtZQUNJLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUdPLHFDQUFjLEdBQXRCO1lBQUEsaUJBc0JDO1lBckJHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO2dCQUNqRixJQUFJLEdBQUcsRUFBRTtvQkFDTCxLQUFJLENBQUMsWUFBWSxHQUFHLGdCQUFnQixDQUFDO29CQUNyQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDO3dCQUN0QixRQUFRLEVBQUUsSUFBSTt3QkFDZCxLQUFLLEVBQUUsSUFBSTt3QkFDWCxJQUFJLEVBQUUsSUFBSTtxQkFDYixDQUFDLENBQUM7b0JBQ0gsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUN0QjtZQUNMLENBQUMsQ0FBQztpQkFDRyxLQUFLLENBQUMsVUFBQyxLQUFLO2dCQUNULEtBQUksQ0FBQyxZQUFZLEdBQUcsY0FBYyxDQUFDO2dCQUNuQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDO29CQUN0QixRQUFRLEVBQUUsSUFBSTtvQkFDZCxLQUFLLEVBQUUsSUFBSTtvQkFDWCxJQUFJLEVBQUUsSUFBSTtpQkFDYixDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUVQLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUdPLDJDQUFvQixHQUE1QjtZQUNJLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUdPLHlDQUFrQixHQUExQjtZQUNJLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUdPLDJCQUFJLEdBQVosVUFBYSxFQUFPO1lBQXBCLGlCQXVCQztZQXRCRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUUzQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hDLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQztnQkFDekUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUVqQixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QixJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxFQUFFO3dCQUMxQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztxQkFDM0I7b0JBRUQsT0FBTztpQkFDVjthQUVKO1FBQ0wsQ0FBQztRQUdPLDZCQUFNLEdBQWQsVUFBZSxFQUFPO1lBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ25CLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQ3RCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxJQUFJO2dCQUNYLElBQUksRUFBRSxJQUFJO2FBQ2IsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUlPLG9DQUFhLEdBQXJCO1lBQ0ksSUFBSSxLQUFLLEdBQUcsOERBQThELENBQUM7WUFDM0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFBRSxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQzs7Z0JBQ3ZELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQ3BDLENBQUM7UUFHTywwQkFBRyxHQUFYO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDdEIsQ0FBQztRQUdPLDBCQUFHLEdBQVg7WUFBQSxpQkFvQkM7WUFuQkcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUEsU0FBUyxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFFdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsc0NBQXNDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO2dCQUM3RixJQUFJLEdBQUcsRUFBRTtvQkFDTCxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztvQkFDekIsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUN0QjtZQUNMLENBQUMsQ0FBQztpQkFDRyxLQUFLLENBQUMsVUFBQyxLQUFLO2dCQUNULEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztZQUVQLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNmLENBQUM7UUFHTyxrQ0FBVyxHQUFuQjtZQUFBLGlCQVFDO1lBUEcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO2dCQUMvRCxJQUFJLEdBQUcsRUFBRTtvQkFDTCxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxFQUFVLENBQUM7b0JBQ2pDLEtBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQXFCLENBQUM7b0JBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMzQjtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUdPLDZCQUFNLEdBQWQ7WUFDSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQztRQXZTUSxZQUFZO1lBRHhCLElBQUEsVUFBVSxDQUFDLG9CQUFvQixDQUFDO1dBQ3BCLFlBQVksQ0F3U3hCO1FBQUQsbUJBQUM7S0F4U0QsQUF3U0MsSUFBQTtJQXhTWSxnQkFBWSxlQXdTeEIsQ0FBQTtBQUlMLENBQUMsRUFoVE0sR0FBRyxLQUFILEdBQUcsUUFnVFQ7QUNoVEQsSUFBTyxHQUFHLENBa0ZUO0FBbEZELFdBQU8sR0FBRztJQUNOLFlBQVksQ0FBQztJQUdiO1FBUUksdUJBQW9CLEtBQXNCLEVBQVMsTUFBMkI7WUFBOUUsaUJBU0M7WUFUbUIsVUFBSyxHQUFMLEtBQUssQ0FBaUI7WUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFxQjtZQUh0RSxXQUFNLEdBQVEsRUFBRSxDQUFDO1lBQ2pCLFNBQUksR0FBUSxNQUFNLENBQUM7WUFJdkIsS0FBSyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUc7Z0JBQzFELElBQUcsR0FBRyxFQUFDO29CQUNILEtBQUksQ0FBQyxLQUFLLEdBQUMsSUFBSSxLQUFLLEVBQVUsQ0FBQztvQkFDL0IsS0FBSSxDQUFDLEtBQUssR0FBQyxHQUFHLENBQUMsSUFBcUIsQ0FBQztvQkFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzNCO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRU8sNkJBQUssR0FBYjtZQUVJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQ2hCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxJQUFJO2dCQUNYLElBQUksRUFBRSxJQUFJO2FBRWIsQ0FBQyxDQUFDO1lBRUgsSUFBRyxJQUFJLENBQUMsWUFBWSxJQUFFLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFFLElBQUksRUFBQztnQkFDOUMsSUFBSSxDQUFDLE1BQU0sR0FBQyx5QkFBeUIsQ0FBQztnQkFDdEMsT0FBTzthQUNWO1lBQ0QsSUFBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQ3JEO2dCQUNJLElBQUksQ0FBQyxNQUFNLEdBQUMseUJBQXlCLENBQUM7YUFDekM7aUJBQ0c7Z0JBQ0EsSUFBSSxDQUFDLE1BQU0sR0FBQyxzQkFBc0IsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBRS9EO1FBQ0wsQ0FBQztRQUVPLG1DQUFXLEdBQW5CLFVBQW9CLEVBQU8sRUFBQyxJQUFTO1lBQXJDLGlCQWFDO1lBWkcsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNuQyxJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFsQixDQUFrQixDQUFDLENBQUM7Z0JBRXpFLElBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFFLEVBQUUsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUcsSUFBSSxFQUNwQztvQkFDSSxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pDLGNBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3hCO2FBQ0g7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNsQixDQUFDO1FBR00sZ0NBQVEsR0FBZjtZQUNJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0IsSUFBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUNwRDtnQkFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUMsRUFBQyxFQUFFLEVBQUMsSUFBSSxDQUFDLFlBQVksRUFBQyxDQUFDLENBQUM7YUFDckQ7UUFFTCxDQUFDO1FBR00sb0NBQVksR0FBbkI7WUFDSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdCLElBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFDcEQ7Z0JBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFDLEVBQUMsRUFBRSxFQUFDLElBQUksQ0FBQyxZQUFZLEVBQUMsQ0FBQyxDQUFDO2FBQ3JEO1FBQ0wsQ0FBQztRQTNFUSxhQUFhO1lBRHpCLElBQUEsVUFBVSxDQUFDLHFCQUFxQixDQUFDO1dBQ3JCLGFBQWEsQ0E0RXpCO1FBQUQsb0JBQUM7S0E1RUQsQUE0RUMsSUFBQTtJQTVFWSxpQkFBYSxnQkE0RXpCLENBQUE7QUFFTCxDQUFDLEVBbEZNLEdBQUcsS0FBSCxHQUFHLFFBa0ZUO0FDbEZELElBQU8sR0FBRyxDQXNDVDtBQXRDRCxXQUFPLEdBQUc7SUFDTixZQUFZLENBQUM7SUFHYjtRQUVJLHdCQUFvQixNQUEyQjtZQUEzQixXQUFNLEdBQU4sTUFBTSxDQUFxQjtZQUMzQyxJQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBQztnQkFFaEUsY0FBYyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQztvQkFDdEIsUUFBUSxFQUFFLElBQUk7b0JBQ2QsS0FBSyxFQUFFLElBQUk7b0JBQ1gsSUFBSSxFQUFFLElBQUk7aUJBRWIsQ0FBQyxDQUFDO2FBRU47aUJBQ0c7Z0JBQ0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDM0I7UUFFTCxDQUFDO1FBR08saUNBQVEsR0FBaEI7WUFDSSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFHTyxxQ0FBWSxHQUFwQjtZQUNJLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQS9CUSxjQUFjO1lBRDFCLElBQUEsVUFBVSxDQUFDLHNCQUFzQixDQUFDO1dBQ3RCLGNBQWMsQ0FnQzFCO1FBQUQscUJBQUM7S0FoQ0QsQUFnQ0MsSUFBQTtJQWhDWSxrQkFBYyxpQkFnQzFCLENBQUE7QUFFTCxDQUFDLEVBdENNLEdBQUcsS0FBSCxHQUFHLFFBc0NUIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZSBhcHB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcbiAgICBleHBvcnQgbGV0IHRlbXBsYXRlVXJsQmFzZSA9ICcuL2NsaWVudC92aWV3cy8nO1xyXG4gICAgXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gQ29udHJvbGxlcihuYW1lOnN0cmluZyl7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGNsYXp6OmFueSl7XHJcbiAgICAgICAgICAgIGNsYXp6LiRuYW1lPW5hbWU7XHJcbiAgICAgICAgICAgIGFuZ3VsYXJNb2R1bGUuY29udHJvbGxlcihuYW1lLCBjbGF6eik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBEaXJlY3RpdmUoZGlyZWN0aXZlOiBhbmd1bGFyLklEaXJlY3RpdmUpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGNsYXp6OiBhbnkpIHtcclxuICAgICAgICAgICAgYW5ndWxhck1vZHVsZS5kaXJlY3RpdmUoZGlyZWN0aXZlLm5hbWUsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGRpcmVjdGl2ZS5jb250cm9sbGVyID0gY2xheno7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGl2ZS50ZW1wbGF0ZVVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZS50ZW1wbGF0ZVVybCA9IHRlbXBsYXRlVXJsQmFzZSArIGRpcmVjdGl2ZS50ZW1wbGF0ZVVybDtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZGlyZWN0aXZlLmNvbnRyb2xsZXJBcyA9ICd2bSc7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkaXJlY3RpdmUuYmluZFRvQ29udHJvbGxlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZS5zY29wZSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBkaXJlY3RpdmU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIm1vZHVsZSBhcHB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgZXhwb3J0IGxldCBhbmd1bGFyTW9kdWxlPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgWyd1aS5yb3V0ZXInXSk7XHJcbn0iLCJtb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyTW9kdWxlLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlcicsIGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XHJcbiAgICAgICAgbGV0IGxvZ2luID0ge1xyXG4gICAgICAgICAgICBuYW1lOiAnbG9naW4nLFxyXG4gICAgICAgICAgICB1cmw6ICcvbG9naW4nLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9jbGllbnQvdmlld3MvcGFnZS9sb2dpbi9sb2dpbi5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luUGFnZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtYWlucGFnZSA9IHtcclxuICAgICAgICAgICAgbmFtZTogJ21haW5wYWdlJyxcclxuICAgICAgICAgICAgdXJsOiAnL21haW5wYWdlJyxcclxuICAgICAgICAgICAgcGFyYW1zOntcclxuICAgICAgICAgICAgICAgIGlkOm51bGxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvY2xpZW50L3ZpZXdzL21haW5QYWdlLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnTWFpblBhZ2VDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZWRpdCA9IHtcclxuICAgICAgICAgICAgbmFtZTogJ2VkaXQnLFxyXG4gICAgICAgICAgICB1cmw6ICcvZWRpdCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2NsaWVudC92aWV3cy9wYWdlL2VkaXRQcm9maWxlL2VkaXQuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdFZGl0UGFnZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBsb2dvdXQgPSB7XHJcbiAgICAgICAgICAgIG5hbWU6ICdsb2dvdXQnLFxyXG4gICAgICAgICAgICB1cmw6ICcvbG9nb3V0JyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvY2xpZW50L3ZpZXdzL3BhZ2UvbG9nb3V0L2xvZ291dC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0xvZ291dFBhZ2VDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc3RhdGVQcm92aWRlci5zdGF0ZShsb2dpbik7XHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUobWFpbnBhZ2UpO1xyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKGVkaXQpO1xyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKGxvZ291dCk7XHJcblxyXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJ2xvZ2luJyk7XHJcbiAgICB9XSk7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcCcpLmZpbHRlcigndXBwZXInLCgpID0+e1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaXRlbS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcblxyXG59XHJcbiIsIm1vZHVsZSBhcHB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgQENvbnRyb2xsZXIoJ01haW5QYWdlQ29udHJvbGxlcicpXHJcbiAgICBleHBvcnQgY2xhc3MgTWFpblBhZ2VDdHJse1xyXG4gICAgICAgIHByaXZhdGUgZW5kZGF0ZTpzdHJpbmc9XCIwOC8xNC8yMDIxXCI7XHJcbiAgICAgICAgcHJpdmF0ZSBuZ2F5Q29ubGFpOm51bWJlcjtcclxuICAgICAgICBwcml2YXRlIG5hbWU6c3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgZGF0ZTpzdHJpbmc7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHN0YXRlOiBuZy51aS5JU3RhdGVTZXJ2aWNlLCAkc3RhdGVQYXJhbXMpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlkOiBcIiwkc3RhdGVQYXJhbXMuaWQpO1xyXG4gICAgICAgICAgICBpZihzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwibmFtZVwiKSAmJiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiZGF0ZVwiKSl7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lPXNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJuYW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlPXNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGViPW5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0ZWU9bmV3IERhdGUodGhpcy5lbmRkYXRlKTtcclxuICAgICAgICAgICAgICAgIHZhciBrPTA7XHJcbiAgICAgICAgICAgICAgICBrPWRhdGVlLmdldFRpbWUoKSAtZGF0ZWIuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZ2F5Q29ubGFpPU1hdGguZmxvb3Ioay8oMjQqNjAqNjAqMTAwMCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzdGF0ZS5nbygnbG9naW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgYXBwe1xyXG4gICAgJ3VzZSBzdHJpY3QnXHJcblxyXG4gICAgQERpcmVjdGl2ZSh7XHJcbiAgICAgICAgICAgIG5hbWU6ICd0ZWFtcGxhdGVIZWFkZXInLFxyXG4gICAgICAgICAgICByZXN0cmljdDonRScsXHJcbiAgICAgICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6e1xyXG4gICAgICAgICAgICAgICAgaW50ZXJuRHRvOlwiPVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxpbms6IChzY29wZTphbmd1bGFyLklTY29wZSwgZWw6SlF1ZXJ5LGF0dHJzOmFuZ3VsYXIuSUF0dHJpYnV0ZXMsIGN0cmw6IGhlYWRlckN0cmwpID0+e1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJwYWdlL2hlYWRlci9oZWFkZXIuaHRtbFwiXHJcbiAgICAgICAgfSlcclxuICAgICAgICBAQ29udHJvbGxlcignSGVhZGVyQ3RybCcpXHJcbiAgICAgICAgZXhwb3J0IGNsYXNzIGhlYWRlckN0cmx7XHJcbiAgICAgICAgICAgIHByaXZhdGUgaW50ZXJuRHRvOkludGVybkR0bztcclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEBEaXJlY3RpdmUoe1xyXG4gICAgICAgICAgICBuYW1lOiAndGVhbXBsYXRlVGFza2JhcicsXHJcbiAgICAgICAgICAgIHJlc3RyaWN0OidFJyxcclxuICAgICAgICAgICAgYmluZFRvQ29udHJvbGxlcjp7XHJcbiAgICAgICAgICAgICAgICBpbnRlcm5EdG86XCI9XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGluazogKHNjb3BlOmFuZ3VsYXIuSVNjb3BlLCBlbDpKUXVlcnksYXR0cnM6YW5ndWxhci5JQXR0cmlidXRlcywgY3RybDogdGFza2JhckN0cmwpID0+e1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJwYWdlL3Rhc2tiYXIvdGFza2Jhci5odG1sXCJcclxuICAgICAgICB9KVxyXG4gICAgICAgIEBDb250cm9sbGVyKCdUYXNrYmFyQ3RybCcpXHJcbiAgICAgICAgZXhwb3J0IGNsYXNzIHRhc2tiYXJDdHJse1xyXG4gICAgICAgICAgICBwcml2YXRlIGludGVybkR0bzpJbnRlcm5EdG87XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3RydWN0b3IoKXtcclxuICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxufSIsIm1vZHVsZSBhcHB7XHJcbiAgICBleHBvcnQgY2xhc3MgSW50ZXJuRHRve1xyXG4gICAgICAgIGlkOnN0cmluZztcclxuICAgICAgICBuYW1lOnN0cmluZztcclxuICAgICAgICBiaXJ0aGRheTpzdHJpbmc7XHJcbiAgICAgICAgZ2V0SW5Db21wYW55RGF5OnN0cmluZztcclxuICAgICAgICBwYXNzd29yZDpzdHJpbmc7XHJcbiAgICAgICAgaXNBZG1pbjpzdHJpbmc7XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgYXBwIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBAQ29udHJvbGxlcignRWRpdFBhZ2VDb250cm9sbGVyJylcclxuICAgIGV4cG9ydCBjbGFzcyBFZGl0UGFnZUN0cmwge1xyXG4gICAgICAgIHByaXZhdGUgaW50ZXJuRHRvOiBJbnRlcm5EdG87XHJcbiAgICAgICAgcHJpdmF0ZSB1c2VyczogQXJyYXk8T2JqZWN0PjtcclxuICAgICAgICBwcml2YXRlIGludGVybnNoaXBJZEZvcm06IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIG5hbWVGb3JtOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBiaXJ0aGRheUZvcm06IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIGRhdGVGb3JtOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnRlcm5zaGlwSWQ6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIG5hbWU6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIGJpcnRoZGF5OiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBkYXRlOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBwYXNzOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBpc0FkbWluOiBzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBub3RBZG1pbjogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgcHJpdmF0ZSBjaGVja19zaG93OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgICAgcHJpdmF0ZSBsb2c6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgcHJpdmF0ZSBjaGVjazogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0dXM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgcHJpdmF0ZSB1cGRhdGVWYWx1ZTogc3RyaW5nID0gXCJVcGRhdGUgdGhhbmggY29uZ1wiO1xyXG4gICAgICAgIHByaXZhdGUgY2hlY2tfZWRpdDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgcHJpdmF0ZSBjaGVja19iaXJ0aGRheTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICAgICAgcHJpdmF0ZSBjaGVja19hZGQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgICAgIHByaXZhdGUgaWREZWxldGU6IHN0cmluZztcclxuICAgICAgICBwcml2YXRlIHN0YXR1c0RlbGV0ZTogc3RyaW5nO1xyXG5cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogbmcuSUh0dHBTZXJ2aWNlLCBwcml2YXRlICRzdGF0ZTogbmcudWkuSVN0YXRlU2VydmljZSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJuYW1lXCIpICYmIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJkYXRlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAkaHR0cC5nZXQoJ2h0dHA6Ly8xOTIuMTY4LjExLjExNDo4MDgxL2dldGFsbGludGVybicpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJpc0FkbWluXCIpID09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vdEFkbWluID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5ub3RBZG1pbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXNlcnMgPSBuZXcgQXJyYXk8T2JqZWN0PigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJzID0gcmVzLmRhdGEgYXMgQXJyYXk8T2JqZWN0PjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzdGF0ZS5nbygnbG9naW4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2VhcmNoKCk6IHZvaWQge1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmludGVybnNoaXBJZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cyA9IFwiaGF5IG5oYXAgaW50ZXJuc2hpcElkXCI7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2RpYWxvZ2VkaXRcIikuZGlhbG9nKHtcclxuICAgICAgICAgICAgICAgICAgICBhdXRvT3BlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnVzZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBPYmplY3Qua2V5cyh0aGlzLnVzZXJzW2ldKS5tYXAoa2V5ID0+IHRoaXMudXNlcnNbaV1ba2V5XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlc1swXSA9PSB0aGlzLmludGVybnNoaXBJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJuc2hpcElkRm9ybSA9IHZhbHVlc1swXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hbWVGb3JtID0gdmFsdWVzWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmlydGhkYXlGb3JtID0gdmFsdWVzWzJdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZUZvcm0gPSB2YWx1ZXNbM107XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXNzID0gdmFsdWVzWzRdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNBZG1pbiA9IHZhbHVlc1s1XTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZyA9IFwiYWRkRW1wbG95ZWVNb2RhbFwiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gXCJraG9uZyB0aW0gdGhheSBrZXQgcXVhIG5hb1wiO1xyXG4gICAgICAgICAgICAkKFwiI2RpYWxvZ2VkaXRcIikuZGlhbG9nKHtcclxuICAgICAgICAgICAgICAgIGF1dG9PcGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBPSygpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja19zaG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5pbnRlcm5zaGlwSWQgPSB0aGlzLmludGVybnNoaXBJZEZvcm07XHJcbiAgICAgICAgICAgIHRoaXMubmFtZSA9IHRoaXMubmFtZUZvcm07XHJcbiAgICAgICAgICAgIHRoaXMuYmlydGhkYXkgPSB0aGlzLmJpcnRoZGF5Rm9ybTtcclxuICAgICAgICAgICAgdGhpcy5kYXRlID0gdGhpcy5kYXRlRm9ybTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSB1cGRhdGUoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5uYW1lID09IG51bGwgfHwgdGhpcy5iaXJ0aGRheSA9PSBudWxsIHx8IHRoaXMuZGF0ZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlID0gXCJDYWMgdHJ1b25nIGtob25nIGR1b2MgZGUgdHJvbmdcIjtcclxuICAgICAgICAgICAgICAgICQoXCIjZGlhbG9ndXBkYXRlXCIpLmRpYWxvZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b09wZW46IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmludGVybkR0byA9IG5ldyBJbnRlcm5EdG8oKTtcclxuICAgICAgICAgICAgdGhpcy5pbnRlcm5EdG8uaWQgPSB0aGlzLmludGVybnNoaXBJZDtcclxuICAgICAgICAgICAgdGhpcy5pbnRlcm5EdG8ubmFtZSA9IHRoaXMubmFtZTtcclxuICAgICAgICAgICAgdGhpcy5pbnRlcm5EdG8uYmlydGhkYXkgPSB0aGlzLmJpcnRoZGF5O1xyXG4gICAgICAgICAgICB0aGlzLmludGVybkR0by5nZXRJbkNvbXBhbnlEYXkgPSB0aGlzLmRhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJuRHRvLnBhc3N3b3JkID0gdGhpcy5wYXNzO1xyXG4gICAgICAgICAgICB0aGlzLmludGVybkR0by5pc0FkbWluID0gdGhpcy5pc0FkbWluO1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kaHR0cC5wb3N0KCdodHRwOi8vMTkyLjE2OC4xMS4xMTQ6ODA4MS91cGRhdGVpbnRlcm4nLCBKU09OLnN0cmluZ2lmeSh0aGlzLmludGVybkR0bykpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gXCJVcGRhdGUgdGhhbmggY29uZ1wiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRodHRwLmdldCgnaHR0cDovLzE5Mi4xNjguMTEuMTE0OjgwODEvZ2V0YWxsaW50ZXJuJykudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXNlcnMgPSBuZXcgQXJyYXk8T2JqZWN0PigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51c2VycyA9IHJlcy5kYXRhIGFzIEFycmF5PE9iamVjdD47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVzZXJzKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2RpYWxvZ3VwZGF0ZVwiKS5kaWFsb2coe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9PcGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gXCJVcGRhdGUgdGhhdCBiYWlcIjtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2RpYWxvZ3VwZGF0ZVwiKS5kaWFsb2coe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvT3BlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9vayBkaWFsb2cgZWRpdFxyXG4gICAgICAgIHByaXZhdGUgb2tEaWFsb2dFZGl0KCkge1xyXG4gICAgICAgICAgICAkKFwiI2RpYWxvZ2VkaXRcIikuZGlhbG9nKFwiY2xvc2VcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2NhbmNsZSBkaWFsb2cgZWRpdFxyXG4gICAgICAgIHByaXZhdGUgY2FuY2xlRGlhbG9nRWRpdCgpIHtcclxuICAgICAgICAgICAgJChcIiNkaWFsb2dlZGl0XCIpLmRpYWxvZyhcImNsb3NlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9vayBkaWFsb2cgdXBkYXRlXHJcbiAgICAgICAgcHJpdmF0ZSBva0RpYWxvZ1VwZGF0ZSgpIHtcclxuXHJcbiAgICAgICAgICAgICQoXCIjZGlhbG9ndXBkYXRlXCIpLmRpYWxvZyhcImNsb3NlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jYW5jbGUgZGlhbG9nIHVwZGF0ZVxyXG4gICAgICAgIHByaXZhdGUgY2FuY2xlRGlhbG9nVXBkYXRlKCkge1xyXG4gICAgICAgICAgICAkKFwiI2RpYWxvZ3VwZGF0ZVwiKS5kaWFsb2coXCJjbG9zZVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vb2sgZGlhbG9nIGRlbGV0ZVxyXG4gICAgICAgIHByaXZhdGUgb2tEaWFsb2dEZWxldGUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGh0dHAuZ2V0KCdodHRwOi8vMTkyLjE2OC4xMS4xMTQ6ODA4MS9kZWxldGVCeUlkP2lkPScgKyB0aGlzLmlkRGVsZXRlKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXR1c0RlbGV0ZSA9IFwiWG9hIHRoYW5oIGNvbmdcIjtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI3N0YXR1c2RlbGV0ZVwiKS5kaWFsb2coe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvT3BlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRBbGxVc2VycygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzRGVsZXRlID0gXCJYb2EgdGhhdCBiYWlcIjtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI3N0YXR1c2RlbGV0ZVwiKS5kaWFsb2coe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvT3BlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoXCIjZGlhbG9nZGVsZXRlXCIpLmRpYWxvZyhcImNsb3NlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9vayBkaWFsb2cgc3RhdHVzIGRlbGV0ZVxyXG4gICAgICAgIHByaXZhdGUgb2tEaWFsb2dTdGF0dXNEZWxldGUoKSB7XHJcbiAgICAgICAgICAgICQoXCIjc3RhdHVzZGVsZXRlXCIpLmRpYWxvZyhcImNsb3NlXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jYW5jbGUgZGlhbG9nIHVwZGF0ZVxyXG4gICAgICAgIHByaXZhdGUgY2FuY2xlRGlhbG9nRGVsZXRlKCkge1xyXG4gICAgICAgICAgICAkKFwiI2RpYWxvZ2RlbGV0ZVwiKS5kaWFsb2coXCJjbG9zZVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vZWRpdCBmb3JtXHJcbiAgICAgICAgcHJpdmF0ZSBlZGl0KGlkOiBhbnkpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja19hZGQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrX2JpcnRoZGF5ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy51c2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gT2JqZWN0LmtleXModGhpcy51c2Vyc1tpXSkubWFwKGtleSA9PiB0aGlzLnVzZXJzW2ldW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codmFsdWVzWzBdKTtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZXNbMF0gPT0gaWQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcm5zaGlwSWQgPSB2YWx1ZXNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYW1lID0gdmFsdWVzWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmlydGhkYXkgPSB2YWx1ZXNbMl07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlID0gdmFsdWVzWzNdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFzcyA9IHZhbHVlc1s0XTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzQWRtaW4gPSB2YWx1ZXNbNV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJpc0FkbWluXCIpID09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tfZWRpdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9kZWxldGVcclxuICAgICAgICBwcml2YXRlIGRlbGV0ZShpZDogYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMuaWREZWxldGUgPSBpZDtcclxuICAgICAgICAgICAgJChcIiNkaWFsb2dkZWxldGVcIikuZGlhbG9nKHtcclxuICAgICAgICAgICAgICAgIGF1dG9PcGVuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgbW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvL2NoZWNrIGJpcnRoZGF5XHJcbiAgICAgICAgcHJpdmF0ZSBjaGVja0JpcnRoZGF5KCkge1xyXG4gICAgICAgICAgICB2YXIgcmVnZXggPSAvXlswLTldezR9W1xcL10oMD9bMS05XXwxWzAxMl0pW1xcL10oMD9bMS05XXxbMTJdWzAtOV18M1swMV0pJC9nO1xyXG4gICAgICAgICAgICBpZiAoIXJlZ2V4LnRlc3QodGhpcy5iaXJ0aGRheSkpIHRoaXMuY2hlY2tfYmlydGhkYXkgPSBmYWxzZTtcclxuICAgICAgICAgICAgZWxzZSB0aGlzLmNoZWNrX2JpcnRoZGF5ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vY3JlYXRlIG5ld1xyXG4gICAgICAgIHByaXZhdGUgbmV3KCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrX2FkZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrX2JpcnRoZGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5pbnRlcm5zaGlwSWQgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLmJpcnRoZGF5ID0gXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5kYXRlID0gXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5wYXNzID0gXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5pc0FkbWluID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vYWRkIGludGVyblxyXG4gICAgICAgIHByaXZhdGUgYWRkKCl7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJuRHRvID0gbmV3IEludGVybkR0bygpO1xyXG4gICAgICAgICAgICB0aGlzLmludGVybkR0by5pZCA9IHRoaXMuaW50ZXJuc2hpcElkO1xyXG4gICAgICAgICAgICB0aGlzLmludGVybkR0by5uYW1lID0gdGhpcy5uYW1lO1xyXG4gICAgICAgICAgICB0aGlzLmludGVybkR0by5iaXJ0aGRheSA9IHRoaXMuYmlydGhkYXk7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJuRHRvLmdldEluQ29tcGFueURheSA9IHRoaXMuZGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5pbnRlcm5EdG8ucGFzc3dvcmQgPSB0aGlzLnBhc3M7XHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJuRHRvLmlzQWRtaW4gPSB0aGlzLmlzQWRtaW47XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRodHRwLnBvc3QoJ2h0dHA6Ly8xOTIuMTY4LjExLjExNDo4MDgxL2FkZGludGVybicsIEpTT04uc3RyaW5naWZ5KHRoaXMuaW50ZXJuRHRvKSkudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJUaGVtIHRoYW5oIGNvbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRBbGxVc2VycygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiVGhlbSB0aGF0IGJhaVwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMubmV3KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2dldEFsbEludGVybiB3aGlsZSBhZGQgZGVsZXRlIGVkaXQgdXBkYXRlIC4uLlxyXG4gICAgICAgIHByaXZhdGUgZ2V0QWxsVXNlcnMoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGh0dHAuZ2V0KCdodHRwOi8vMTkyLjE2OC4xMS4xMTQ6ODA4MS9nZXRhbGxpbnRlcm4nKS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJzID0gbmV3IEFycmF5PE9iamVjdD4oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJzID0gcmVzLmRhdGEgYXMgQXJyYXk8T2JqZWN0PjtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVzZXJzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3JlZmVzaCBkYXRhXHJcbiAgICAgICAgcHJpdmF0ZSByZWZlc2goKXtcclxuICAgICAgICAgICAgdGhpcy5nZXRBbGxVc2VycygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxufVxyXG5cclxuIiwibW9kdWxlIGFwcHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBAQ29udHJvbGxlcignTG9naW5QYWdlQ29udHJvbGxlcicpXHJcbiAgICBleHBvcnQgY2xhc3MgTG9naW5QYWdlQ3RybHtcclxuICAgICAgICBwcml2YXRlIGludGVybnNoaXBJZDpzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBwYXNzd29yZDpzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSB1c2VyczpBcnJheTxPYmplY3Q+O1xyXG4gICAgICAgIHByaXZhdGUgdXNlcjphbnk7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0dXM6c3RyaW5nPVwiXCI7XHJcbiAgICAgICAgcHJpdmF0ZSB0ZXN0OnN0cmluZz1cIm5lbmVcIjtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSAkaHR0cDogbmcuSUh0dHBTZXJ2aWNlLHByaXZhdGUgJHN0YXRlOiBuZy51aS5JU3RhdGVTZXJ2aWNlKXtcclxuXHJcbiAgICAgICAgICAgICRodHRwLmdldCgnaHR0cDovLzE5Mi4xNjguMTEuMTE0OjgwODEvZ2V0YWxsaW50ZXJuJykudGhlbigocmVzKT0+e1xyXG4gICAgICAgICAgICAgICAgaWYocmVzKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVzZXJzPW5ldyBBcnJheTxPYmplY3Q+KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51c2Vycz1yZXMuZGF0YSBhcyBBcnJheTxPYmplY3Q+O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMudXNlcnMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTsgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBsb2dpbigpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgICQoXCIjZGlhbG9nXCIpLmRpYWxvZyh7XHJcbiAgICAgICAgICAgICAgICBhdXRvT3BlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIG1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuaW50ZXJuc2hpcElkPT1udWxsIHx8IHRoaXMucGFzc3dvcmQ9PW51bGwpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0dXM9XCJWdWkgbG9uZyBuaGFwIHRob25nIHRpblwiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmNoZWNrX2xvZ2luKHRoaXMuaW50ZXJuc2hpcElkLHRoaXMucGFzc3dvcmQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXR1cz1cIlNhaSB0aG9uZyB0aW4gZGFuZyBuaGFwXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdHVzPVwiRGFuZyBuaGFwIHRoYW5oIGNvbmdcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMudXNlcj10aGlzLmNoZWNrX2xvZ2luKHRoaXMuaW50ZXJuc2hpcElkLHRoaXMucGFzc3dvcmQpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgY2hlY2tfbG9naW4oaWQ6IGFueSxwYXNzOiBhbnkpe1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwO2k8dGhpcy51c2Vycy5sZW5ndGg7aSsrKSB7IFxyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gT2JqZWN0LmtleXModGhpcy51c2Vyc1tpXSkubWFwKGtleSA9PiB0aGlzLnVzZXJzW2ldW2tleV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHZhbHVlc1swXT09aWQgJiYgdmFsdWVzWzRdPT0gcGFzcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwibmFtZVwiLHZhbHVlc1sxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImRhdGVcIix2YWx1ZXNbM10pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJpc0FkbWluXCIsdmFsdWVzWzVdKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy51c2Vyc1tpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vb2sgZGlhbG9nXHJcbiAgICAgICAgcHVibGljIG9rRGlhbG9nKCl7XHJcbiAgICAgICAgICAgICQoXCIjZGlhbG9nXCIpLmRpYWxvZyhcImNsb3NlXCIpO1xyXG4gICAgICAgICAgICBpZih0aGlzLmNoZWNrX2xvZ2luKHRoaXMuaW50ZXJuc2hpcElkLHRoaXMucGFzc3dvcmQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzdGF0ZS5nbygnbWFpbnBhZ2UnLHtpZDp0aGlzLmludGVybnNoaXBJZH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jYW5jbGUgZGlhbG9nXHJcbiAgICAgICAgcHVibGljIGNhbmNsZURpYWxvZygpe1xyXG4gICAgICAgICAgICAkKFwiI2RpYWxvZ1wiKS5kaWFsb2coXCJjbG9zZVwiKTtcclxuICAgICAgICAgICAgaWYodGhpcy5jaGVja19sb2dpbih0aGlzLmludGVybnNoaXBJZCx0aGlzLnBhc3N3b3JkKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc3RhdGUuZ28oJ21haW5wYWdlJyx7aWQ6dGhpcy5pbnRlcm5zaGlwSWR9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59IiwibW9kdWxlIGFwcHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBAQ29udHJvbGxlcignTG9nb3V0UGFnZUNvbnRyb2xsZXInKVxyXG4gICAgZXhwb3J0IGNsYXNzIExvZ291dFBhZ2VDdHJse1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcml2YXRlICRzdGF0ZTogbmcudWkuSVN0YXRlU2VydmljZSl7XHJcbiAgICAgICAgICAgIGlmKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJuYW1lXCIpICYmIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJkYXRlXCIpKXtcclxuICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwibmFtZVwiKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJkYXRlXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiNkaWFsb2dsb2dvdXRcIikuZGlhbG9nKHtcclxuICAgICAgICAgICAgICAgICAgICBhdXRvT3BlbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kc3RhdGUuZ28oJ2xvZ2luJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL29rIGRpYWxvZ1xyXG4gICAgICAgIHByaXZhdGUgb2tEaWFsb2coKXtcclxuICAgICAgICAgICAgJChcIiNkaWFsb2dsb2dvdXRcIikuZGlhbG9nKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgIHRoaXMuJHN0YXRlLmdvKCdsb2dpbicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jYW5jbGUgZGlhbG9nXHJcbiAgICAgICAgcHJpdmF0ZSBjYW5jbGVEaWFsb2coKXtcclxuICAgICAgICAgICAgJChcIiNkaWFsb2dsb2dvdXRcIikuZGlhbG9nKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgIHRoaXMuJHN0YXRlLmdvKCdsb2dpbicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCIiXX0=
