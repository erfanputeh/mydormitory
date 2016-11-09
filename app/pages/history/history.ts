import { Component } from '@angular/core';
import { NavController,NavParams  } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  templateUrl: 'build/pages/history/history.html',
})
export class HistoryPage {
      id: number; //สร้างตัวแปร id เพื่อไว้ส่งข้อมูลไปหลังร้าน
      date: number;
      book: any;

      status: any;
      booking_status: any;

      items: Array<{}>; //ประกาศตัวแปร array เปล่า
  constructor(private navCtrl: NavController,private http: Http,private navparam: NavParams) {

    this.http = http; //สร้างตัวแปร http เพื่อไว้ใช้ในการส่งข้อูลระหว่างกัน
    this.id = navparam.get("id"); //เป็นการเรียกใช้ id เพื่อที่จะรับค่า member_id ของ repair
    this.navCtrl=navCtrl;
    console.log('รหัสผู้ใช้='+this.id);

    //ใช้ method get() เพื่อดึงข้อมูล
    //ใช้ method subscribe() เพื่อดึงค่า json object เข้ามาใช้งานใน component
    this.http.get("http://localhost/mydorm/connect/getinfo/get_book.php?id="+this.id).subscribe(
    (response) => {
    this.items = response.json().data; //ดึงข้อมูลที่ได้ แล้วกําหนดให้กับตัวแปร itmes ของคลาสนี้ *
    this.date = response.json().date;
    this.book = response.json().book;
    this.booking_status = response.json().booking_status;

    if(this.booking_status == 1){
      this.status = "ชำระเงินค่าหอแล้ว";
    }else if(this.booking_status == 2){
      this.status = "ยังไม่ชำระเงินค่าหอพัก";
  }

     }
    );

  } //constructor

} //HistoryPage
