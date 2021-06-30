module app{
    'use strict';

    @Controller('LoginPageController')
    export class LoginPageCtrl{
        private internshipId:string;
        private password:string;
        private users:Array<Object>;
        private user:any;
        private status:string="";
        private test:string="nene";

        constructor(private $http: ng.IHttpService,private $state: ng.ui.IStateService){

            $http.get('http://192.168.11.114:8081/getallintern').then((res)=>{
                if(res){
                    this.users=new Array<Object>();
                    this.users=res.data as Array<Object>;
                    console.log(this.users);
                }
            });         
        }
        
        private login(): void {

            $("#dialog").dialog({
                autoOpen: true,
                modal: true,
                show: true,
                
            });

            if(this.internshipId==null || this.password==null){
                this.status="Vui long nhap thong tin";
                return;
            }
            if(!this.check_login(this.internshipId,this.password))
            {
                this.status="Sai thong tin dang nhap";
            }
            else{
                this.status="Dang nhap thanh cong";
                this.user=this.check_login(this.internshipId,this.password);
                
            }             
        }
        
        private check_login(id: any,pass: any){
            for(var i = 0;i<this.users.length;i++) { 
                const values = Object.keys(this.users[i]).map(key => this.users[i][key]);

                if(values[0]==id && values[4]== pass)
                {
                    sessionStorage.setItem("name",values[1]);
                    sessionStorage.setItem("date",values[3]);
                    sessionStorage.setItem("isAdmin",values[5]);
                    return this.users[i];
                }
             }
             return false;
        }

        //ok dialog
        public okDialog(){
            $("#dialog").dialog("close");
            if(this.check_login(this.internshipId,this.password))
            {
                this.$state.go('mainpage',{id:this.internshipId});
            }
            
        }

        //cancle dialog
        public cancleDialog(){
            $("#dialog").dialog("close");
            if(this.check_login(this.internshipId,this.password))
            {
                this.$state.go('mainpage',{id:this.internshipId});
            }
        }
    }
    
}