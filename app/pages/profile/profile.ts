import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
})
export class ProfilePage {
      id: any; //สร้างตัวแปร id เพื่อไว้ส่งข้อมูลไปหลังร้าน
      items: Array<{}>; //ประกาศตัวแปร array เปล่า
      constructor(private navCtrl: NavController,private http: Http,private navparam: NavParams) {

      this.http = http; //สร้างตัวแปร http เพื่อไว้ใช้ในการส่งข้อูลระหว่างกัน
      this.id = navparam.get("id"); //เป็นการเรียกใช้ id เพื่อที่จะรับค่า member_id ของ repair
      this.navCtrl=navCtrl;

      console.log("member_id="+this.id);
      //ใช้ method get() เพื่อดึงข้อมูล
      //ใช้ method subscribe() เพื่อดึงค่า json object เข้ามาใช้งานใน component
      this.http.get("http://192.168.1.15/mydorm/connect/getinfo/get_profile.php?id="+this.id).subscribe(
      (response) => {
      this.items = response.json().data; //ดึงข้อมูลที่ได้ แล้วกําหนดให้กับตัวแปร itmes ของคลาสนี้ *
       }
      );

    } //constructor

  } //ProfilePage
