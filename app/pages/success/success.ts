import { Component } from '@angular/core';
import { NavController,NavParams,AlertController } from 'ionic-angular';
import { HTTP_PROVIDERS, Http } from '@angular/http'; //นําเข้า HTTP_PROVIDERS, Http เข้ามาใช้งาน
import { Booking } from '../../providers/booking/booking';
import { HomePage } from '../home/home';



@Component({
  providers: [Booking],
  templateUrl: 'build/pages/success/success.html',
})
export class SuccessPage {

    public booking: any[]; //ประกาศตัวแปร arrayไว้แสดงผลข้อมูลที่เลือกไว้

  constructor(private navCtrl: NavController, private http: Http, private navparam: NavParams,private bookings: Booking,private alertCtrl: AlertController) {  //ประกาศตัวแปร http
    this.http = http; //นํา http มากําหนดให้ http ของคลาส
    this.bookings=bookings; //ตัวแปร bookings เป็นตัวแปรที่ส่งข้อมูลยัง providers ของ bookings

    this.booking = navparam.get("booking");

        for(let i = 0; i < this.booking.length; i++){
            console.log(this.booking[i]);
        } // ปิด for

   } //constructor

   gotoBooking(){
     //กําหนดตัวแปร body เพื่อส่งให้ method save() ของ provider เพื่อบันทึกข้อมูล
     let body = "booking="+JSON.stringify(this.booking);

     for(let i = 0; i < this.booking.length; i++){
         console.log(this.booking[i]);
     }

        console.log(body);
        //console.log('booking= '+this.booking);

     this.bookings.save(body).then((response)=>{
      //สั่งให้ Alert ทํางานเมื่อบันทึกข้อมูลเรียบร้อย
     let alert = this.alertCtrl.create({
        title: 'ผลการทํางาน',
        subTitle: response.message, //message เป็นค่าที.ส่งกลับมาจาก Backend
        buttons: ['ตกลง']
        });

        alert.present(alert);
        this.navCtrl.setRoot(HomePage);

        }).catch((err)=>{
        console.log(err);
      });
        event.preventDefault();

   } //ปิดฟังก์ชัน gotobooking
} //ปิดฟังก์ชัน  class SuccessPage
