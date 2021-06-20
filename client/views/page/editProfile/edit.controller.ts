module app{
    'use strict';

    @Controller('EditPageController')
    export class EditPageCtrl{
        private users:Array<Object>;
        private internshipId:string;
        private name:string;
        private birthday:string;
        private date:string;
        private check_show:boolean=false;
        private log:string="";

        constructor($http: { get: (url: string) => Promise<any>; },private $state: ng.ui.IStateService){
            
            if(sessionStorage.getItem("name") && sessionStorage.getItem("date")){
                this.users=new Array<Object>();
                $http.get('././././data/db/user.json').then((res)=>{
                    this.users=res.data;
                    
                });
            }
            else{
                this.$state.go('login');
            }
            
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
                    this.check_show=true;
                    this.internshipId=values[1];
                    this.name=values[3];
                    this.birthday=values[4];
                    this.date=values[5];
                    this.log="addEmployeeModal";
                     console.log(this.users[i]);
                     return;
                }
                    
                 

             }
             alert("khong tim thay ket qua nao");
        }

        private update($http: { post: (url: string) => Promise<any>; }):void{

            $http.post('././././data/db/user.json').then((res)=>{
                this.users=res.data;
                
            });
            

            console.log(this.internshipId);
            console.log(this.name);
            console.log(this.birthday);
            console.log(this.date);
        }
    }
    
}