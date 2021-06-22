module app{
    'use strict';

    @Controller('LoginPageController')
    export class LoginPageCtrl{
        private internshipId:string;
        private password:string;
        private users:Array<Object>;
        private user:any;
        

        constructor($http: { get: (url: string) => Promise<any>; },private $state: ng.ui.IStateService){
            
            $http.get('http://192.168.11.114:8081/getallintern').then((res)=>{
                this.users=new Array<Object>();
                this.users=res.data;
                console.log(this.users);
            });
        }
        
        private login(): void {
            if(this.internshipId==null || this.password==null){
                alert("Vui lòng nhập thông tin");
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

                if(values[0]==id && values[4]== pass)
                {
                    sessionStorage.setItem("name",values[1]);
                    sessionStorage.setItem("date",values[3]);
                    
                    return this.users[i];

                }
                    
             }
             return false;
        }
    }
    
}