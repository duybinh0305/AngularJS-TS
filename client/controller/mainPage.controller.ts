module app{
    'use strict';

    @Controller('MainPageController')
    export class MainPageCtrl{
        private enddate:string="08/14/2021";
        private ngayConlai:number;
        private name:string;
        private date:string;

        constructor(){
            if(sessionStorage.getItem("name") && sessionStorage.getItem("date")){

                this.name=sessionStorage.getItem("name");
                this.date=sessionStorage.getItem("date");
                var dateb=new Date();
                var datee=new Date(this.enddate);
                var k=0;
                k=datee.getTime() -dateb.getTime();
                this.ngayConlai=Math.floor(k/(24*60*60*1000));
                console.log(this.ngayConlai);
            }
            
        }
        
        
    }
}