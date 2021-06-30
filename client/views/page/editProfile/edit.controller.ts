module app {
    'use strict';

    @Controller('EditPageController')
    export class EditPageCtrl {
        private internDto: InternDto;
        private users: Array<Object>;
        private internshipIdForm: string;
        private nameForm: string;
        private birthdayForm: string;
        private dateForm: string;
        private internshipId: string;
        private name: string;
        private birthday: string;
        private date: string;
        private pass: string;
        private isAdmin: string;
        private notAdmin: boolean = true;
        private check_show: boolean = false;
        private log: string = "";
        private check: boolean = true;
        private status: string = "";
        private updateValue: string = "Update thanh cong";
        private check_edit: boolean = true;
        private check_birthday: boolean = true;
        private check_add: boolean = true;
        private idDelete: string;
        private statusDelete: string;


        constructor(private $http: ng.IHttpService, private $state: ng.ui.IStateService) {

            if (sessionStorage.getItem("name") && sessionStorage.getItem("date")) {
                $http.get('http://192.168.11.114:8081/getallintern').then((res) => {
                    if (res) {
                        if (sessionStorage.getItem("isAdmin") == "1") {
                            this.notAdmin = false;
                        }
                        console.log(this.notAdmin);
                        this.users = new Array<Object>();
                        this.users = res.data as Array<Object>;
                    }
                });

            }
            else {
                this.$state.go('login');
            }

        }

        private search(): void {


            if (this.internshipId == null) {
                this.status = "hay nhap internshipId";
                $("#dialogedit").dialog({
                    autoOpen: true,
                    modal: true,
                    show: true,

                });

                return;
            }

            for (var i = 0; i < this.users.length; i++) {
                const values = Object.keys(this.users[i]).map(key => this.users[i][key]);

                if (values[0] == this.internshipId) {
                    this.internshipIdForm = values[0];
                    this.nameForm = values[1];
                    this.birthdayForm = values[2];
                    this.dateForm = values[3];
                    this.pass = values[4];
                    this.isAdmin = values[5];
                    this.log = "addEmployeeModal";

                    return;
                }

            }
            this.status = "khong tim thay ket qua nao";
            $("#dialogedit").dialog({
                autoOpen: true,
                modal: true,
                show: true,

            });

        }

        private OK(): void {
            this.check_show = true;
            this.internshipId = this.internshipIdForm;
            this.name = this.nameForm;
            this.birthday = this.birthdayForm;
            this.date = this.dateForm;
        }
        private update(): void {

            if (this.name == null || this.birthday == null || this.date == null) {
                this.updateValue = "Cac truong khong duoc de trong";
                $("#dialogupdate").dialog({
                    autoOpen: true,
                    modal: true,
                    show: true,

                });
                return;
            }
            this.internDto = new InternDto();
            this.internDto.id = this.internshipId;
            this.internDto.name = this.name;
            this.internDto.birthday = this.birthday;
            this.internDto.getInCompanyDay = this.date;
            this.internDto.password = this.pass;
            this.internDto.isAdmin = this.isAdmin;

            this.$http.post('http://192.168.11.114:8081/updateintern', JSON.stringify(this.internDto)).then((res) => {
                if (res) {
                    this.status = "Update thanh cong";

                    this.$http.get('http://192.168.11.114:8081/getallintern').then((res) => {
                        if (res) {
                            this.users = new Array<Object>();
                            this.users = res.data as Array<Object>;
                            console.log(this.users);

                            $("#dialogupdate").dialog({
                                autoOpen: true,
                                modal: true,
                                show: true,
                            });
                        }
                    });
                }
            })
                .catch((error) => {
                    this.status = "Update that bai";
                    $("#dialogupdate").dialog({
                        autoOpen: true,
                        modal: true,
                        show: true,
                    });
                });


        }

        //ok dialog edit
        private okDialogEdit() {
            $("#dialogedit").dialog("close");
        }

        //cancle dialog edit
        private cancleDialogEdit() {
            $("#dialogedit").dialog("close");
        }

        //ok dialog update
        private okDialogUpdate() {

            $("#dialogupdate").dialog("close");
        }

        //cancle dialog update
        private cancleDialogUpdate() {
            $("#dialogupdate").dialog("close");
        }

        //ok dialog delete
        private okDialogDelete() {
            this.$http.get('http://192.168.11.114:8081/deleteById?id=' + this.idDelete).then((res) => {
                if (res) {
                    this.statusDelete = "Xoa thanh cong";
                    $("#statusdelete").dialog({
                        autoOpen: true,
                        modal: true,
                        show: true,
                    });
                    this.getAllUsers();
                }
            })
                .catch((error) => {
                    this.statusDelete = "Xoa that bai";
                    $("#statusdelete").dialog({
                        autoOpen: true,
                        modal: true,
                        show: true,
                    });
                });

            $("#dialogdelete").dialog("close");
        }

        //ok dialog status delete
        private okDialogStatusDelete() {
            $("#statusdelete").dialog("close");
        }

        //cancle dialog update
        private cancleDialogDelete() {
            $("#dialogdelete").dialog("close");
        }

        //edit form
        private edit(id: any) {
            this.check_add = true;
            this.check_birthday = true;

            for (var i = 0; i < this.users.length; i++) {
                const values = Object.keys(this.users[i]).map(key => this.users[i][key]);
                console.log(values[0]);
                if (values[0] == id) {

                    this.internshipId = values[0];
                    this.name = values[1];
                    this.birthday = values[2];
                    this.date = values[3];
                    this.pass = values[4];
                    this.isAdmin = values[5];
                    if (sessionStorage.getItem("isAdmin") == "1") {
                        this.check_edit = false;
                    }

                    return;
                }

            }
        }

        //delete
        private delete(id: any) {
            this.idDelete = id;
            $("#dialogdelete").dialog({
                autoOpen: true,
                modal: true,
                show: true,
            });
        }


        //check birthday
        private checkBirthday() {
            var regex = /^[0-9]{4}[\/](0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])$/g;
            if (!regex.test(this.birthday)) this.check_birthday = false;
            else this.check_birthday = true;
        }

        //create new
        private new() {
            this.check_add = false;
            this.check_birthday = true;
            this.internshipId = "";
            this.name = "";
            this.birthday = "";
            this.date = "";
            this.pass = "";
            this.isAdmin = "";
        }

        //add intern
        private add(){
            this.internDto = new InternDto();
            this.internDto.id = this.internshipId;
            this.internDto.name = this.name;
            this.internDto.birthday = this.birthday;
            this.internDto.getInCompanyDay = this.date;
            this.internDto.password = this.pass;
            this.internDto.isAdmin = this.isAdmin;

            this.$http.post('http://192.168.11.114:8081/addintern', JSON.stringify(this.internDto)).then((res) => {
                if (res) {
                    alert("Them thanh cong");
                    this.getAllUsers();
                }
            })
                .catch((error) => {
                    alert("Them that bai");
                });
                
            this.new();
        }

        //getAllIntern while add delete edit update ...
        private getAllUsers() {
            this.$http.get('http://192.168.11.114:8081/getallintern').then((res) => {
                if (res) {
                    this.users = new Array<Object>();
                    this.users = res.data as Array<Object>;
                    console.log(this.users);
                }
            });
        }

        //refesh data
        private refesh(){
            this.getAllUsers();
        }
    }



}

