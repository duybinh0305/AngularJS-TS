module app{
    'use strict'

    @Directive({
            name: 'teamplateHeader',
            restrict:'E',
            bindToController:{
                internDto:"="
            },
            link: (scope:angular.IScope, el:JQuery,attrs:angular.IAttributes, ctrl: headerCtrl) =>{
            },
            templateUrl: "page/header/header.html"
        })
        @Controller('HeaderCtrl')
        export class headerCtrl{
            private internDto:InternDto;
    
            constructor(){
    
            }
        }

        @Directive({
            name: 'teamplateTaskbar',
            restrict:'E',
            bindToController:{
                internDto:"="
            },
            link: (scope:angular.IScope, el:JQuery,attrs:angular.IAttributes, ctrl: taskbarCtrl) =>{
            },
            templateUrl: "page/taskbar/taskbar.html"
        })
        @Controller('TaskbarCtrl')
        export class taskbarCtrl{
            private internDto:InternDto;
    
            constructor(){
    
            }
        }

        
}