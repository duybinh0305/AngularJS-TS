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
        private pass:string;
        private check_show:boolean=false;
        private log:string="";
        private check:boolean=true;
        

        constructor(private $http:ng.IHttpService,private $state: ng.ui.IStateService){
            
            if(sessionStorage.getItem("name") && sessionStorage.getItem("date")){
                
                $http.get('http://192.168.11.114:8081/getallintern').then((res)=>{
                    this.users=new Array<Object>();
                    this.users =res.data as Array<Object>;
                    console.log(this.users);
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
                    this.pass=values[4];
                    this.log="addEmployeeModal";
                     return;
                }
                    
             }
             alert("khong tim thay ket qua nao");
        }

        private update():void{

            if(this.name==null || this.birthday==null || this.date==null)
            {
                alert("Cac truong khong duoc de trong");
                return;
            }
            this.internDto= new InternDto();
            this.internDto.id=this.internshipId;
            this.internDto.name=this.name;
            this.internDto.birthday=this.birthday;
            this.internDto.getInCompanyDay=this.date;
            this.internDto.password=this.pass;

            this.$http.post('http://192.168.11.114:8081/updateintern', JSON.stringify(this.internDto))
            .then(function(response) {
                alert("Update thanh cong");
            }, 
            function(response) { 
                alert("Update that bai");
            });

        }
    }
    
}
