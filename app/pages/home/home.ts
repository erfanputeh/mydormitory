import { Component } from '@angular/core';
import { NavController,NavParams,AlertController,ToastController } from 'ionic-angular';
import { DormPage } from '../dorm/dorm';
import { DormbenefitsPage } from '../dormbenefits/dormbenefits';
import { DormactivityPage } from '../dormactivity/dormactivity';
import { RepairPage } from '../repair/repair';
import { PaymentPage } from '../payment/payment';
import { RulePage } from '../rule/rule';
import { ProfilePage } from '../profile/profile';
import { Storage, LocalStorage } from 'ionic-angular';
import { HTTP_PROVIDERS, Http } from '@angular/http';

@Component({
  templateUrl: 'build/pages/home/home.html',

})

export class HomePage {
  id: number; //สร้างตัวแปร id เพื่อไว้ส่งข้อมูลไปหลังร้าน
  book: any[];
  booking_status: any;
  public member_id: any;
  public booking: any;
  public local: Storage;
  public person: any;
  public surname_person: any;
  // public dorm_id: any;

  constructor(private navCtrl: NavController, private http: Http,private navparam:NavParams,
              public alertCtrl: AlertController,public toastCtrl: ToastController ) {
    this.id = navparam.get("id"); //เป็นการเรียกใช้ id เพื่อที่จะรับค่า member_id ของ repair
    this.navCtrl = navCtrl;
    this.http = http;
    this.local = new Storage(LocalStorage);
    this.local.get('id_person').then ((data)=>this.member_id = data);
    this.local.get('person').then ((data)=>this.person = data); //ส่วนที่แสดงข้อมูลที่รับมาจากหลังร้าน
    this.local.get('surname_person').then ((data)=>this.surname_person = data);
    this.local.get('book').then ((data)=>this.booking = data);



  }

  goToDorm() {
    this.navCtrl.push(DormPage,{
      id:this.member_id,
      name:this.person,
      surname:this.surname_person
    });
  }

  goTodormbenefits() {
    this.navCtrl.push(DormbenefitsPage,{
      id:this.member_id
    });

  }

  goTodormactivity() {
    this.navCtrl.push(DormactivityPage,{
      id:this.member_id
    });

  }

  goToRepair() {
    this.navCtrl.push(RepairPage,{
      id:this.member_id
    });
  }

  goToPayment() {
    this.navCtrl.push(PaymentPage,{
      id:this.member_id
    });
  }

  goToRule() {
    this.navCtrl.push(RulePage,{
      id:this.member_id
    });
  }

  goToProfile() {
    this.navCtrl.push(ProfilePage,{
      id:this.member_id
    });
  }

  showToast() {
  let toast = this.toastCtrl.create({
    message: 'กรุณาเข้าสู่ระบบก่อนครับ',
    duration: 1300,
    position: 'top'
  });
  toast.present();
}

  show() {
  let toast = this.toastCtrl.create({
    message: 'กรุณาจองหอพักก่อนครับ',
    duration: 1300,
    position: 'top'
  });
  toast.present();
  }

  showbooking() {
  let toast = this.toastCtrl.create({
    message: 'ปีนี้คุณได้ทำทำการจองเรียบร้อยแล้ว',
    duration: 1300,
    position: 'top'
  });
  toast.present();
  }

  showpayment() {
  let toast = this.toastCtrl.create({
    message: 'กรุณาจองหอพักก่อนครับ',
    duration: 1300,
    position: 'top'
  });
  toast.present();
  }





}
