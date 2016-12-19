import { Component } from '@angular/core';
import { NavController,AlertController,NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Payment } from '../../providers/payment/payment';
import { HomePage } from '../home/home';
import { Camera, Transfer } from 'ionic-native';
import { ActionSheetController } from 'ionic-angular';

import {
 FormBuilder,
 Validators,  //
 ControlGroup,
 FORM_DIRECTIVES,
} from '@angular/common';

@Component({
  providers: [Payment],
  directives: [FORM_DIRECTIVES],
  templateUrl: 'build/pages/payment/payment.html',
})
export class PaymentPage {

    paymentForm: ControlGroup;
     id: number;
     booking_id: any;
     dorm_id: any;
     room_id: any;
    //  status: any;
    //  booking_status: any;
     items: Array<{}>; //ประกาศตัวแปร array เปล่า
     slip: string;
     slipSrc: string;
     prakan= 500;
     sum= 0;

  constructor(private navCtrl: NavController,private Formpayment:FormBuilder,private payment:Payment,
    private alertCtrl: AlertController,private navparam:NavParams, private http: Http,private actionSheetCtrl:ActionSheetController) {

      this.http = http;
      this.id = navparam.get("id");
      this.navCtrl=navCtrl;
      this.payment=payment;

      //ใช้ method get() เพื่อดึงข้อมูล
       //ใช้ method subscribe() เพื่อดึงค่า json object เข้ามาใช้งานใน component
       this.http.get("http://192.168.1.15/mydorm/connect/getinfo/get_book.php?id="+this.id).subscribe(
       (response) => {
       this.items = response.json().data; //ดึงข้อมูลที่ได้ แล้วกําหนดให้กับตัวแปร itmes ของคลาสนี้ *
       this.dorm_id = response.json().dorm_id;
       this.room_id = response.json().room_id;

       }
       );

       this.paymentForm = this.Formpayment.group({ //ใส่ข้อมูลลงฟอร์ม

       });

  } //ปิด constructor

  Payment(event,item) {

     //กําหนดตัวแปร body เพื่อส่งให้ method save() ของ provider เพื่อบันทึกข้อมูล
     let body = "id="+this.id+ "&booking_id="+item.booking_id;

     this.payment.save(body).then((response)=>{
      //สั่งให้ Alert ทํางานเมื่อบันทึกข้อมูลเรียบร้อย
     let alert = this.alertCtrl.create({
        title: 'อัพโหลด',
        subTitle: response.message, //message เป็นค่าที.ส่งกลับมาจาก Backend
        buttons: ['ตกลง']
        });
    let Idpayment = response.payment;
        this.uploadslip(Idpayment);
        alert.present(alert);
        this.navCtrl.setRoot(HomePage);

        }).catch((err)=>{
      let alert = this.alertCtrl.create({
            title: 'อัพโหลด',
            subTitle: 'ไม่สำเร็จ',
            buttons: ['ตกลง']
          });
          alert.present(alert);
      });
        event.preventDefault();
    }


    uploadslip(Idpayment){

      let imageURI = this.slipSrc;
      let fileTransfer = new Transfer();

      let server = "http://localhost/mydorm/connect/putinfo/slip.php?id="+Idpayment;
      let options = {
      fileKey:"mySlip",
      fileName:imageURI.substr(imageURI.lastIndexOf('/')+1),
      mimeType:"image/jpeg",
      chunkedMode:false,
      headers: {'Content-Type' : undefined}
           };
     fileTransfer.upload(imageURI, server, options)
}

    takeslip (){
     let cameraOptions = {
       sourceType: Camera.PictureSourceType.CAMERA,
       destinationType: Camera.DestinationType.FILE_URI,
       quality: 100, //คุณภาพของรูป
       targetWidth: 1000,
       targetHeight: 1000,
       encodingType: Camera.EncodingType.JPEG,
       correctOrientation: true
     }

     Camera.getPicture(cameraOptions)
       .then(file_uri => this.slipSrc = file_uri,
       err => console.log(err));
   } // takeslip

} //PaymentPage
