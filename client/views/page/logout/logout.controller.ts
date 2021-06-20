module app{
    'use strict';

    @Controller('LogoutPageController')
    export class LogoutPageCtrl{
        constructor(private $state: ng.ui.IStateService){
            if(sessionStorage.getItem("name") && sessionStorage.getItem("date")){
                sessionStorage.removeItem("name");            
                sessionStorage.removeItem("date");
                alert("Dang xuat thanh cong");
                this.$state.go('login');
            }
            else{
                this.$state.go('login');
            }
            
        }
    }

}