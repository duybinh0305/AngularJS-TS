module app{
    'use strict';

    @Controller('EditPageController')
    export class EditPageCtrl{
        private internDto:InternDto;
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
                $http.get('http://localhost:8081/getallintern').then((res)=>{
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

                if(values[0]==this.internshipId)
                {
                    this.check_show=true;
                    this.internshipId=values[0];
                    this.name=values[1];
                    this.birthday=values[2];
                    this.date=values[3];
                    this.log="addEmployeeModal";
                     console.log(this.users[i]);
                     return;
                }
                    
                 

             }
             alert("khong tim thay ket qua nao");
        }

        private update($http: { post: (url: string) => Promise<any>; }):void{

            this.internDto= new InternDto();
            this.internDto.internId=this.internshipId;
            this.internDto.internName=this.name;
            this.internDto.internBirthday=this.birthday;
            this.internDto.internInCompanyDay=this.date;
            this.internDto.internPassword=this.internshipId;

             $http.post('http://localhost:8081/updateintern').then((res)=>{
                if(res.data){
                    alert("Update thanh cong");
                }
            },
            function (res) {
                alert("Update that bai");
                });
            
            
            
                    

        }
    }
    
}