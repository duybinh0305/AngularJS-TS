module app{
    'use strict';

    export function Controller(name:string){
        return function(clazz:any){
            clazz.$name=name;
            angularModule.controller(name, clazz);
        }
    }
}