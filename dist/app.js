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
            $stateProvider.state(login);
            $stateProvider.state(mainpage);
            $stateProvider.state(edit);
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
        function MainPageCtrl() {
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
            this.check_search = false;
            this.users = new Array();
            $http.get('././././data/db/user.json').then(function (res) {
                _this.users = res.data;
            });
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
                    this.check_search = true;
                    this.internshipId = values[1];
                    this.name = values[3];
                    this.birthday = values[4];
                    this.date = values[5];
                    console.log(this.users[i]);
                    return;
                }
            }
            alert("khong tim thay ket qua nao");
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
        function LoginPageCtrl($http, $state) {
            var _this = this;
            this.$state = $state;
            this.users = new Array();
            $http.get('././././data/db/user.json').then(function (res) {
                _this.users = res.data;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNsaWVudC9jb21tb24vYW5ub3RhdGlvbi50cyIsImNsaWVudC9jb21tb24vYXBwLm1vZHVsZS50cyIsImNsaWVudC9jb21tb24vYXBwLnJvdXRlLnRzIiwiY2xpZW50L2NvbnRyb2xsZXIvbWFpblBhZ2UuY29udHJvbGxlci50cyIsImNsaWVudC92aWV3cy9wYWdlL2VkaXRQcm9maWxlL2VkaXQuY29udHJvbGxlci50cyIsImNsaWVudC92aWV3cy9wYWdlL2hvbWUvaG9tZS5jb250cm9sbGVyLnRzIiwiY2xpZW50L3ZpZXdzL3BhZ2UvbG9naW4vbG9naW4uY29udHJvbGxlci50cyIsImNsaWVudC92aWV3cy9wYWdlL3Rhc2tiYXIvdGFza0Jhci5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sR0FBRyxDQWdDVDtBQWhDRCxXQUFPLEdBQUc7SUFDTixZQUFZLENBQUM7SUFDRixtQkFBZSxHQUFHLGlCQUFpQixDQUFDO0lBRS9DLFNBQWdCLFVBQVUsQ0FBQyxJQUFXO1FBQ2xDLE9BQU8sVUFBUyxLQUFTO1lBQ3JCLEtBQUssQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDO1lBQ2pCLElBQUEsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUxlLGNBQVUsYUFLekIsQ0FBQTtJQUVELFNBQWdCLFNBQVMsQ0FBQyxTQUE2QjtRQUNuRCxPQUFPLFVBQVUsS0FBVTtZQUN2QixJQUFBLGFBQWEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRTtnQkFDcEMsU0FBUyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBRTdCLElBQUksU0FBUyxDQUFDLFdBQVcsRUFBRTtvQkFDdkIsU0FBUyxDQUFDLFdBQVcsR0FBRyxJQUFBLGVBQWUsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDO2lCQUVuRTtnQkFFRCxTQUFTLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFHOUIsSUFBSSxTQUFTLENBQUMsZ0JBQWdCLEVBQUU7b0JBQzVCLFNBQVMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2lCQUN4QjtnQkFFRCxPQUFPLFNBQVMsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtJQUNMLENBQUM7SUFwQmUsYUFBUyxZQW9CeEIsQ0FBQTtBQUNMLENBQUMsRUFoQ00sR0FBRyxLQUFILEdBQUcsUUFnQ1Q7QUNoQ0QsSUFBTyxHQUFHLENBSVQ7QUFKRCxXQUFPLEdBQUc7SUFDTixZQUFZLENBQUM7SUFFRixpQkFBYSxHQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUNuRSxDQUFDLEVBSk0sR0FBRyxLQUFILEdBQUcsUUFJVDtBQ0pELElBQU8sR0FBRyxDQXFDVDtBQXJDRCxXQUFPLEdBQUc7SUFDTixZQUFZLENBQUM7SUFFYixJQUFBLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxnQkFBZ0IsRUFBQyxvQkFBb0IsRUFBQyxVQUFTLGNBQWMsRUFBQyxrQkFBa0I7WUFDbEcsSUFBSSxLQUFLLEdBQUM7Z0JBQ04sSUFBSSxFQUFFLE9BQU87Z0JBQ2IsR0FBRyxFQUFDLFFBQVE7Z0JBQ1osV0FBVyxFQUFFLHFDQUFxQztnQkFDbEQsVUFBVSxFQUFDLHFCQUFxQjtnQkFDaEMsWUFBWSxFQUFDLElBQUk7YUFDcEIsQ0FBQTtZQUVELElBQUksUUFBUSxHQUFDO2dCQUNULElBQUksRUFBRSxVQUFVO2dCQUNoQixHQUFHLEVBQUMsV0FBVztnQkFDZixXQUFXLEVBQUUsNkJBQTZCO2dCQUMxQyxVQUFVLEVBQUMsb0JBQW9CO2dCQUMvQixZQUFZLEVBQUMsSUFBSTthQUNwQixDQUFBO1lBRUQsSUFBSSxJQUFJLEdBQUM7Z0JBQ0wsSUFBSSxFQUFFLE1BQU07Z0JBQ1osR0FBRyxFQUFDLE9BQU87Z0JBQ1gsV0FBVyxFQUFFLDBDQUEwQztnQkFDdkQsVUFBVSxFQUFDLG9CQUFvQjtnQkFDL0IsWUFBWSxFQUFDLElBQUk7YUFDcEIsQ0FBQTtZQUdELGNBQWMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUIsY0FBYyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMvQixjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTNCLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBR1IsQ0FBQyxFQXJDTSxHQUFHLEtBQUgsR0FBRyxRQXFDVDs7Ozs7OztBQ3JDRCxJQUFPLEdBQUcsQ0EyQlQ7QUEzQkQsV0FBTyxHQUFHO0lBQ04sWUFBWSxDQUFDO0lBR2I7UUFNSTtZQUxRLFlBQU8sR0FBUSxZQUFZLENBQUM7WUFNaEMsSUFBRyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUM7Z0JBRWhFLElBQUksQ0FBQyxJQUFJLEdBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDekMsSUFBSSxDQUFDLElBQUksR0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLEtBQUssR0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNyQixJQUFJLEtBQUssR0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQztnQkFDUixDQUFDLEdBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxHQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ2hDO1FBRUwsQ0FBQztRQW5CUSxZQUFZO1lBRHhCLElBQUEsVUFBVSxDQUFDLG9CQUFvQixDQUFDO1dBQ3BCLFlBQVksQ0FzQnhCO1FBQUQsbUJBQUM7S0F0QkQsQUFzQkMsSUFBQTtJQXRCWSxnQkFBWSxlQXNCeEIsQ0FBQTtBQUNMLENBQUMsRUEzQk0sR0FBRyxLQUFILEdBQUcsUUEyQlQ7QUMzQkQsSUFBTyxHQUFHLENBZ0RUO0FBaERELFdBQU8sR0FBRztJQUNOLFlBQVksQ0FBQztJQUdiO1FBUUksc0JBQVksS0FBOEMsRUFBUyxNQUEyQjtZQUE5RixpQkFPQztZQVBrRSxXQUFNLEdBQU4sTUFBTSxDQUFxQjtZQUZ0RixpQkFBWSxHQUFTLEtBQUssQ0FBQztZQUkvQixJQUFJLENBQUMsS0FBSyxHQUFDLElBQUksS0FBSyxFQUFVLENBQUM7WUFDL0IsS0FBSyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUc7Z0JBQzVDLEtBQUksQ0FBQyxLQUFLLEdBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztZQUV4QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFTyw2QkFBTSxHQUFkO1lBQUEsaUJBd0JDO1lBdkJHLElBQUcsSUFBSSxDQUFDLFlBQVksSUFBRSxJQUFJLEVBQUU7Z0JBQ3hCLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2dCQUMvQixPQUFPO2FBQ1Y7WUFDRCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25DLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQztnQkFFekUsSUFBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUUsSUFBSSxDQUFDLFlBQVksRUFDL0I7b0JBQ0ksSUFBSSxDQUFDLFlBQVksR0FBQyxJQUFJLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1QixJQUFJLENBQUMsSUFBSSxHQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUVuQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0IsT0FBTztpQkFDWDthQUlIO1lBQ0QsS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDekMsQ0FBQztRQXpDUSxZQUFZO1lBRHhCLElBQUEsVUFBVSxDQUFDLG9CQUFvQixDQUFDO1dBQ3BCLFlBQVksQ0EwQ3hCO1FBQUQsbUJBQUM7S0ExQ0QsQUEwQ0MsSUFBQTtJQTFDWSxnQkFBWSxlQTBDeEIsQ0FBQTtBQUVMLENBQUMsRUFoRE0sR0FBRyxLQUFILEdBQUcsUUFnRFQ7QUNoREQsSUFBTyxHQUFHLENBT1Q7QUFQRCxXQUFPLEdBQUc7SUFDTixZQUFZLENBQUM7SUFHYjtRQUFBO1FBRUEsQ0FBQztRQUZZLFFBQVE7WUFEcEIsSUFBQSxVQUFVLENBQUMsZ0JBQWdCLENBQUM7V0FDaEIsUUFBUSxDQUVwQjtRQUFELGVBQUM7S0FGRCxBQUVDLElBQUE7SUFGWSxZQUFRLFdBRXBCLENBQUE7QUFDTCxDQUFDLEVBUE0sR0FBRyxLQUFILEdBQUcsUUFPVDtBQ1BELElBQU8sR0FBRyxDQTRGVDtBQTVGRCxXQUFPLEdBQUc7SUFDTixZQUFZLENBQUM7SUFHYjtRQVFJLHVCQUFZLEtBQThDLEVBQVMsTUFBMkI7WUFBOUYsaUJBT0M7WUFQa0UsV0FBTSxHQUFOLE1BQU0sQ0FBcUI7WUFFMUYsSUFBSSxDQUFDLEtBQUssR0FBQyxJQUFJLEtBQUssRUFBVSxDQUFDO1lBQy9CLEtBQUssQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHO2dCQUM1QyxLQUFJLENBQUMsS0FBSyxHQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7WUFFeEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRU8sNkJBQUssR0FBYjtZQUNJLElBQUcsSUFBSSxDQUFDLFlBQVksSUFBRSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBRSxJQUFJLEVBQUM7Z0JBQzlDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO2dCQUNqQyxPQUFPO2FBQ1Y7WUFDRCxJQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFDckQ7Z0JBQ0ksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7YUFDcEM7aUJBQ0c7Z0JBQ0EsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFHNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDOUI7UUFHTCxDQUFDO1FBRU8sbUNBQVcsR0FBbkIsVUFBb0IsRUFBTyxFQUFDLElBQVM7WUFBckMsaUJBZUM7WUFkRyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25DLElBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQztnQkFFekUsSUFBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUUsRUFBRSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBRyxJQUFJLEVBQ3BDO29CQUNJLGNBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QyxjQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN4QjthQUlIO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDbEIsQ0FBQztRQXBEUSxhQUFhO1lBRHpCLElBQUEsVUFBVSxDQUFDLHFCQUFxQixDQUFDO1dBQ3JCLGFBQWEsQ0FzRnpCO1FBQUQsb0JBQUM7S0F0RkQsQUFzRkMsSUFBQTtJQXRGWSxpQkFBYSxnQkFzRnpCLENBQUE7QUFFTCxDQUFDLEVBNUZNLEdBQUcsS0FBSCxHQUFHLFFBNEZUO0FDNUZELElBQU8sR0FBRyxDQVVUO0FBVkQsV0FBTyxHQUFHO0lBQ04sWUFBWSxDQUFDO0lBR2I7UUFBQTtRQUtBLENBQUM7UUFIRyw4QkFBUSxHQUFSLFVBQVMsTUFBeUI7WUFDOUIsTUFBTSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQztRQUpRLFdBQVc7WUFEdkIsSUFBQSxVQUFVLENBQUMsbUJBQW1CLENBQUM7V0FDbkIsV0FBVyxDQUt2QjtRQUFELGtCQUFDO0tBTEQsQUFLQyxJQUFBO0lBTFksZUFBVyxjQUt2QixDQUFBO0FBQ0wsQ0FBQyxFQVZNLEdBQUcsS0FBSCxHQUFHLFFBVVQiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlIGFwcHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuICAgIGV4cG9ydCBsZXQgdGVtcGxhdGVVcmxCYXNlID0gJy4vY2xpZW50L3ZpZXdzLyc7XHJcbiAgICBcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBDb250cm9sbGVyKG5hbWU6c3RyaW5nKXtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oY2xheno6YW55KXtcclxuICAgICAgICAgICAgY2xhenouJG5hbWU9bmFtZTtcclxuICAgICAgICAgICAgYW5ndWxhck1vZHVsZS5jb250cm9sbGVyKG5hbWUsIGNsYXp6KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIERpcmVjdGl2ZShkaXJlY3RpdmU6IGFuZ3VsYXIuSURpcmVjdGl2ZSkge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoY2xheno6IGFueSkge1xyXG4gICAgICAgICAgICBhbmd1bGFyTW9kdWxlLmRpcmVjdGl2ZShkaXJlY3RpdmUubmFtZSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZGlyZWN0aXZlLmNvbnRyb2xsZXIgPSBjbGF6ejtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aXZlLnRlbXBsYXRlVXJsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlLnRlbXBsYXRlVXJsID0gdGVtcGxhdGVVcmxCYXNlICsgZGlyZWN0aXZlLnRlbXBsYXRlVXJsO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBkaXJlY3RpdmUuY29udHJvbGxlckFzID0gJ3ZtJztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGl2ZS5iaW5kVG9Db250cm9sbGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlLnNjb3BlID0ge307XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpcmVjdGl2ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwibW9kdWxlIGFwcHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBleHBvcnQgbGV0IGFuZ3VsYXJNb2R1bGU9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ3VpLnJvdXRlciddKTtcclxufSIsIm1vZHVsZSBhcHB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhck1vZHVsZS5jb25maWcoWyckc3RhdGVQcm92aWRlcicsJyR1cmxSb3V0ZXJQcm92aWRlcicsZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsJHVybFJvdXRlclByb3ZpZGVyKXtcclxuICAgICAgICBsZXQgbG9naW49e1xyXG4gICAgICAgICAgICBuYW1lOiAnbG9naW4nLFxyXG4gICAgICAgICAgICB1cmw6Jy9sb2dpbicsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2NsaWVudC92aWV3cy9wYWdlL2xvZ2luL2xvZ2luLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOidMb2dpblBhZ2VDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOid2bSdcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IG1haW5wYWdlPXtcclxuICAgICAgICAgICAgbmFtZTogJ21haW5wYWdlJyxcclxuICAgICAgICAgICAgdXJsOicvbWFpbnBhZ2UnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9jbGllbnQvdmlld3MvbWFpblBhZ2UuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6J01haW5QYWdlQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczondm0nXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgZWRpdD17XHJcbiAgICAgICAgICAgIG5hbWU6ICdlZGl0JyxcclxuICAgICAgICAgICAgdXJsOicvZWRpdCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2NsaWVudC92aWV3cy9wYWdlL2VkaXRQcm9maWxlL2VkaXQuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6J0VkaXRQYWdlQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczondm0nXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgICAgICAkc3RhdGVQcm92aWRlci5zdGF0ZShsb2dpbik7XHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUobWFpbnBhZ2UpO1xyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKGVkaXQpO1xyXG5cclxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCdsb2dpbicpO1xyXG4gICAgfV0pO1xyXG5cclxuICAgIFxyXG59XHJcbiIsIm1vZHVsZSBhcHB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgQENvbnRyb2xsZXIoJ01haW5QYWdlQ29udHJvbGxlcicpXHJcbiAgICBleHBvcnQgY2xhc3MgTWFpblBhZ2VDdHJse1xyXG4gICAgICAgIHByaXZhdGUgZW5kZGF0ZTpzdHJpbmc9XCIwOC8xNC8yMDIxXCI7XHJcbiAgICAgICAgcHJpdmF0ZSBuZ2F5Q29ubGFpOm51bWJlcjtcclxuICAgICAgICBwcml2YXRlIG5hbWU6c3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgZGF0ZTpzdHJpbmc7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgICAgIGlmKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJuYW1lXCIpICYmIHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJkYXRlXCIpKXtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWU9c2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcIm5hbWVcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGU9c2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImRhdGVcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0ZWI9bmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRlZT1uZXcgRGF0ZSh0aGlzLmVuZGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGs9MDtcclxuICAgICAgICAgICAgICAgIGs9ZGF0ZWUuZ2V0VGltZSgpIC1kYXRlYi5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5nYXlDb25sYWk9TWF0aC5mbG9vcihrLygyNCo2MCo2MCoxMDAwKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5nYXlDb25sYWkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH1cclxufSIsIm1vZHVsZSBhcHB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgQENvbnRyb2xsZXIoJ0VkaXRQYWdlQ29udHJvbGxlcicpXHJcbiAgICBleHBvcnQgY2xhc3MgRWRpdFBhZ2VDdHJse1xyXG4gICAgICAgIHByaXZhdGUgdXNlcnM6QXJyYXk8T2JqZWN0PjtcclxuICAgICAgICBwcml2YXRlIGludGVybnNoaXBJZDpzdHJpbmc7XHJcbiAgICAgICAgcHJpdmF0ZSBuYW1lOnN0cmluZztcclxuICAgICAgICBwcml2YXRlIGJpcnRoZGF5OnN0cmluZztcclxuICAgICAgICBwcml2YXRlIGRhdGU6c3RyaW5nO1xyXG4gICAgICAgIHByaXZhdGUgY2hlY2tfc2VhcmNoOmJvb2xlYW49ZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCRodHRwOiB7IGdldDogKHVybDogc3RyaW5nKSA9PiBQcm9taXNlPGFueT47IH0scHJpdmF0ZSAkc3RhdGU6IG5nLnVpLklTdGF0ZVNlcnZpY2Upe1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy51c2Vycz1uZXcgQXJyYXk8T2JqZWN0PigpO1xyXG4gICAgICAgICAgICAkaHR0cC5nZXQoJy4vLi8uLy4vZGF0YS9kYi91c2VyLmpzb24nKS50aGVuKChyZXMpPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXJzPXJlcy5kYXRhO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzZWFyY2goKTp2b2lke1xyXG4gICAgICAgICAgICBpZih0aGlzLmludGVybnNoaXBJZD09bnVsbCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJoYXkgbmhhcCBpbnRlcm5zaGlwSWRcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDtpPHRoaXMudXNlcnMubGVuZ3RoO2krKykgeyBcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IE9iamVjdC5rZXlzKHRoaXMudXNlcnNbaV0pLm1hcChrZXkgPT4gdGhpcy51c2Vyc1tpXVtrZXldKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih2YWx1ZXNbMV09PXRoaXMuaW50ZXJuc2hpcElkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tfc2VhcmNoPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcm5zaGlwSWQ9dmFsdWVzWzFdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmFtZT12YWx1ZXNbM107XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iaXJ0aGRheT12YWx1ZXNbNF07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlPXZhbHVlc1s1XTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy51c2Vyc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBhbGVydChcImtob25nIHRpbSB0aGF5IGtldCBxdWEgbmFvXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59IiwibW9kdWxlIGFwcCB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgQENvbnRyb2xsZXIoJ0hvbWVDb250cm9sbGVyJylcclxuICAgIGV4cG9ydCBjbGFzcyBIb21lQ3RybCB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJtb2R1bGUgYXBwe1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIEBDb250cm9sbGVyKCdMb2dpblBhZ2VDb250cm9sbGVyJylcclxuICAgIGV4cG9ydCBjbGFzcyBMb2dpblBhZ2VDdHJse1xyXG4gICAgICAgIHByaXZhdGUgaW50ZXJuc2hpcElkOnN0cmluZztcclxuICAgICAgICBwcml2YXRlIHBhc3N3b3JkOnN0cmluZztcclxuICAgICAgICBwcml2YXRlIHVzZXJzOkFycmF5PE9iamVjdD47XHJcbiAgICAgICAgcHJpdmF0ZSB1c2VyOmFueTtcclxuICAgICAgICAvL3ByaXZhdGUgJHN0YXRlOiBuZy51aS5JU3RhdGVTZXJ2aWNlO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigkaHR0cDogeyBnZXQ6ICh1cmw6IHN0cmluZykgPT4gUHJvbWlzZTxhbnk+OyB9LHByaXZhdGUgJHN0YXRlOiBuZy51aS5JU3RhdGVTZXJ2aWNlKXtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMudXNlcnM9bmV3IEFycmF5PE9iamVjdD4oKTtcclxuICAgICAgICAgICAgJGh0dHAuZ2V0KCcuLy4vLi8uL2RhdGEvZGIvdXNlci5qc29uJykudGhlbigocmVzKT0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2Vycz1yZXMuZGF0YTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBsb2dpbigpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYodGhpcy5pbnRlcm5zaGlwSWQ9PW51bGwgfHwgdGhpcy5wYXNzd29yZD09bnVsbCl7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlZ1aSBsb25nIG5oYXAgdGhvbmcgdGluXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmNoZWNrX2xvZ2luKHRoaXMuaW50ZXJuc2hpcElkLHRoaXMucGFzc3dvcmQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIlNhaSB0aG9uZyB0aW4gZGFuZyBuaGFwXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIkRhbmcgbmhhcCB0aGFuaCBjb25nXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyPXRoaXMuY2hlY2tfbG9naW4odGhpcy5pbnRlcm5zaGlwSWQsdGhpcy5wYXNzd29yZCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy51c2VyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHN0YXRlLmdvKCdtYWlucGFnZScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgY2hlY2tfbG9naW4oaWQ6IGFueSxwYXNzOiBhbnkpe1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwO2k8dGhpcy51c2Vycy5sZW5ndGg7aSsrKSB7IFxyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gT2JqZWN0LmtleXModGhpcy51c2Vyc1tpXSkubWFwKGtleSA9PiB0aGlzLnVzZXJzW2ldW2tleV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHZhbHVlc1sxXT09aWQgJiYgdmFsdWVzWzJdPT0gcGFzcylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwibmFtZVwiLHZhbHVlc1szXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImRhdGVcIix2YWx1ZXNbNV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnVzZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8vIGZ1bmN0aW9uKCRzY29wZTogeyB1c2VyczogYW55O2NoZWNrX2xvZ2luOmFueTsgbG9naW46YW55O2ludGVybnNoaXBJZDphbnkgOyBwYXNzd29yZDphbnk7cHJvZmlsZTphbnl9LCRodHRwOiB7IGdldDogKGFyZzA6IHN0cmluZykgPT4gUHJvbWlzZTxhbnk+OyB9KXtcclxuICAgICAgICAvLyAgICAgJHNjb3BlLmNoZWNrX2xvZ2luPWZhbHNlO1xyXG4gICAgICAgIC8vICAgICAkaHR0cC5nZXQoJy4vLi8uLy4vZGF0YS9kYi91c2VyLmpzb24nKS50aGVuKGZ1bmN0aW9uKHJlcyl7XHJcbiAgICAgICAgLy8gICAgICAgICAkc2NvcGUudXNlcnM9cmVzLmRhdGE7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUudXNlcnMpO1xyXG4gICAgICAgIC8vICAgICAgICAgLy9mdW50aW9uIGxvZ2luIGFjY291bnRcclxuXHJcbiAgICAgICAgLy8gICAgICAgICAkc2NvcGUubG9naW49ZnVuY3Rpb24oKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICB2YXIgY2hlY2s9Z2V0X2xvZ2luKCRzY29wZS5pbnRlcm5zaGlwSWQsICRzY29wZS5wYXNzd29yZCk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaWYoY2hlY2spe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBhbGVydChcIkRhbmcgbmhhcCB0aGFuaCBjb25nXCIpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAkc2NvcGUuY2hlY2tfbG9naW49dHJ1ZTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgJHNjb3BlLnByb2ZpbGU9Y2hlY2s7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5wcm9maWxlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGFsZXJ0KFwiVGhvbmcgdGluIHRhaSBraG9hbiBrIGhvcCBsZVwiKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICBmdW5jdGlvbiBnZXRfbG9naW4odXNlcjogYW55LHBhc3M6IGFueSl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgZm9yKHZhciBpPTA7IGk8JHNjb3BlLnVzZXJzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWYoJHNjb3BlLnVzZXJzW2ldLmludGVybnNoaXBJZD09dXNlciAmJiAkc2NvcGUudXNlcnNbaV0ucGFzc3dvcmQ9PXBhc3Mpe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRzY29wZS51c2Vyc1tpXTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cclxuICAgICAgICAvLyAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcbiAgICBcclxufSIsIm1vZHVsZSBhcHB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgQENvbnRyb2xsZXIoJ1Rhc2tCYXJDb250cm9sbGVyJylcclxuICAgIGV4cG9ydCBjbGFzcyBUYXNrQmFyQ3RybHtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24oJHNjb3BlOiB7IHRlc3Q6IHN0cmluZzsgfSkge1xyXG4gICAgICAgICAgICAkc2NvcGUudGVzdD1cIm5lXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19
