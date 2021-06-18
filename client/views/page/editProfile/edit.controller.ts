module app{
    'use strict';

    @Controller('EditPageController')
    export class EditPageCtrl{
        private users:Array<Object>;
        private internshipId:string;
        private name:string;
        private birthday:string;
        private date:string;
        private check_search:boolean=false;

        constructor($http: { get: (url: string) => Promise<any>; },private $state: ng.ui.IStateService){
            
            this.users=new Array<Object>();
            $http.get('././././data/db/user.json').then((res)=>{
                this.users=res.data;
                
            });
        }

        private search():void{
            if(this.internshipId==null) {
                alert("hay nhap internshipId");
                return;
            }
            for(var i = 0;i<this.users.length;i++) { 
                const values = Object.keys(this.users[i]).map(key => this.users[i][key]);

                if(values[1]==this.internshipId)
                {
                    this.check_search=true;
                    this.internshipId=values[1];
                    this.name=values[3];
                    this.birthday=values[4];
                    this.date=values[5];
                    
                     console.log(this.users[i]);
                     return;
                }
                    
                 

             }
             alert("khong tim thay ket qua nao");
        }
    }
    
}