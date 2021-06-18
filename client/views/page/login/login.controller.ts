module app{
    'use strict';

    @Controller('LoginPageController')
    export class LoginPageCtrl{
        private internshipId:string;
        private password:string;
        private users:Array<Object>;
        private user:any;
        //private $state: ng.ui.IStateService;
        

        constructor($http: { get: (url: string) => Promise<any>; },private $state: ng.ui.IStateService){
            
            this.users=new Array<Object>();
            $http.get('././././data/db/user.json').then((res)=>{
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
                
                //console.log(this.user);
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
        

        // function($scope: { users: any;check_login:any; login:any;internshipId:any ; password:any;profile:any},$http: { get: (arg0: string) => Promise<any>; }){
        //     $scope.check_login=false;
        //     $http.get('././././data/db/user.json').then(function(res){
        //         $scope.users=res.data;
        //         console.log($scope.users);
        //         //funtion login account

        //         $scope.login=function(){
        //             var check=get_login($scope.internshipId, $scope.password);
        //             if(check){
        //                 alert("Dang nhap thanh cong");
        //                 $scope.check_login=true;
        //                 $scope.profile=check;
        //                 console.log($scope.profile);
                        
        //             }
        //             else{
        //                 alert("Thong tin tai khoan k hop le");
        //             }
        //         }
        //         function get_login(user: any,pass: any){
        //             for(var i=0; i<$scope.users.length; i++){
        //                 if($scope.users[i].internshipId==user && $scope.users[i].password==pass){
        //                     return $scope.users[i];
        //                 }
        //             }
        //             return false;
        //         }
        //     });
            
        // }
    }
    
}