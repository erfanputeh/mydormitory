import { Component } from '@angular/core';
import { NavController,LoadingController,AlertController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { Login } from '../../providers/login/login';
import { Storage, LocalStorage } from 'ionic-angular';


import {
 FormBuilder,
 Validators,  //
 ControlGroup, //ตัวควบคุม formlogin
 FORM_DIRECTIVES,
} from '@angular/common';


@Component({
  providers: [Login],
  directives: [FORM_DIRECTIVES],
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
loginForm: ControlGroup;
public local: Storage;
  constructor(private nav: NavController,private Formlogin:FormBuilder,private login:Login,
    private alertCtrl: AlertController,public loading: LoadingController )  {
     this.nav=nav;
     this.login=login;
     this.local = new Storage(LocalStorage);
     this.loginForm = this.Formlogin.group({

       username: ["",Validators.required],
       password: ["", Validators.compose([Validators.required,Validators.minLength(5)])]
     });
}

checklogin(event){

    let username     = this.loginForm.controls['username'].value;
    let password     = this.loginForm.controls['password'].value;

    let body = "username="+username+ "&password="+password;
    this.login.save(body).then((response)=>{

      //สั่งให้ Alert ทํางานเมื่อบันทึกข้อมูลเรียบร้อย
      let alert = this.alertCtrl.create({

        title: 'ผลการทำงาน',
        subTitle: response.message, //message เป็นค่าที.ส่งกลับมาจาก Backend
        buttons: ['ตกลง']
        });

        if(response.message == 'ล็อกอินสำเร็จ'){
          let loader = this.loading.create({
          content: "Please wait...",
          duration: 500
        });
        loader.present();

        this.local.set('person',response.name); // รับข้อมูลชื่อมาจาก server
        this.local.set('surname_person',response.surname); // รับข้อมูลนามสกุลมาจาก server
        this.local.set('id_person',response.member_id); // รับข้อมูลมาจาก server
        this.local.set('book',response.book);

        this.nav.setRoot(HomePage);

      }else{
        alert.present(alert);
        this.nav.setRoot(LoginPage);
      }

        }).catch((err)=>{
        console.log(err);
      });
        event.preventDefault();
    }

    goToRegister() {
        this.nav.push(RegisterPage);
      }
}
