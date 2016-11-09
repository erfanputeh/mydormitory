import { Component } from '@angular/core';
import { NavController,LoadingController,AlertController  } from 'ionic-angular';
import { Register } from '../../providers/register/register';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import {
 FormBuilder,
 Validators,  //
 ControlGroup,
 FORM_DIRECTIVES,
} from '@angular/common';

@Component({
  providers: [Register],
  directives: [FORM_DIRECTIVES],
  templateUrl: 'build/pages/register/register.html',
})

export class RegisterPage {
  registerForm: ControlGroup;
  constructor(private navCtrl: NavController,private Formregister:FormBuilder,private register:Register,
    private alertCtrl: AlertController,public loading: LoadingController ) {

    this.navCtrl=navCtrl;
    this.register=register;
    this.registerForm = this.Formregister.group({

      username: ["",Validators.required],
      password: ["", Validators.compose([Validators.required,Validators.minLength(5)])],
      student_id: ["",Validators.required],
      name:     ["",Validators.required],
      surname:  ["",Validators.required],
      faculty:  ["",Validators.required],
      major:    ["",Validators.required],
      email:    ["",Validators.required],
      address:  ["",Validators.required]

    });
  } // constructor

  addmember(event) {

     //ดึงค่ามาจากฟอร์มแต่ละตัว
     let username     = this.registerForm.controls['username'].value;
     let password     = this.registerForm.controls['password'].value;
     let student_id   = this.registerForm.controls['student_id'].value;
     let name         = this.registerForm.controls['name'].value;
     let surname      = this.registerForm.controls['surname'].value;
     let faculty      = this.registerForm.controls['faculty'].value;
     let major        = this.registerForm.controls['major'].value;
     let email        = this.registerForm.controls['email'].value;
     let address      = this.registerForm.controls['address'].value;


     //กําหนดตัวแปร body เพื่อส่งให้ method save() ของ provider เพื่อบันทึกข้อมูล
     let body = "username="+username+ "&password="+password+ "&student_id="+student_id+ "&name="+name+ "&surname="+surname+ "&faculty="+faculty+ "&major="+major+ "&email="+email+ "&address="+address;
     this.register.save(body).then((response)=>{

      //สั่งให้ Alert ทํางานเมื่อบันทึกข้อมูลเรียบร้อย
     let alert = this.alertCtrl.create({
        title: 'ผลการทํางาน',
        subTitle: response.message, //message เป็นค่าที.ส่งกลับมาจาก Backend
        buttons: ['ตกลง']
        });

        if(response.message == 'ล็อกอินสำเร็จ'){
          let loader = this.loading.create({
          content: "Please wait...",
          duration: 700
        });
        loader.present();

      }else{
        alert.present(alert);
        this.navCtrl.setRoot(LoginPage);
      }

        }).catch((err)=>{
        console.log(err);
      });
        event.preventDefault();
    }
} // class RegisterPage
