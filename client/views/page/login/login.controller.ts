module app{
    'use strict';

    @Controller('LoginPageController')
    export class LoginPageCtrl{
        private internshipId:string;
        private password:string;
        private users:Array<Object>;
        private user:any;
        

        constructor($http: { get: (url: string) => Promise<any>; },private $state: ng.ui.IStateService){
            this.users=new Array<Object>();
            $http.get('http://localhost:8081/categories').then((res)=>{
                this.users=res.data;
                
            });
        }
        
        private login(): void {
            if(this.internshipId==null || this.password==null){
                alert("Vui long nhap thong tin");
                return;
            }
            if(!this.check_login(this.internshipId,this.password))
            {
                alert("Sai thong tin dang nhap");
            }
            else{
                alert("Dang nhap thanh cong");
                this.user=this.check_login(this.internshipId,this.password);
                this.$state.go('mainpage');
            }

             
        }
        
        private check_login(id: any,pass: any){
            for(var i = 0;i<this.users.length;i++) { 
                const values = Object.keys(this.users[i]).map(key => this.users[i][key]);

                if(values[1]==id && values[2]== pass)
                {
                    sessionStorage.setItem("name",values[3]);
                    sessionStorage.setItem("date",values[5]);
                    return this.users[i];
                }
                    
             }
             return false;
        }
    }
    
}