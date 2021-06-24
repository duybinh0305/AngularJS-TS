module app{
    'use strict';

    @Controller('LogoutPageController')
    export class LogoutPageCtrl{

        constructor(private $state: ng.ui.IStateService){
            if(sessionStorage.getItem("name") && sessionStorage.getItem("date")){
               
                sessionStorage.removeItem("name");            
                sessionStorage.removeItem("date");
                $("#dialoglogout").dialog({
                    autoOpen: true,
                    modal: true,
                    show: true,
                    
                });
                
            }
            else{
                this.$state.go('login');
            }
            
        }

        //ok dialog
        private okDialog(){
            $("#dialoglogout").dialog("close");
            this.$state.go('login');
        }

        //cancle dialog
        private cancleDialog(){
            $("#dialoglogout").dialog("close");
            this.$state.go('login');
        }
    }

}