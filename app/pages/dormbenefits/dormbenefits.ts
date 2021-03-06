import { Component } from '@angular/core';
import { NavController,NavParams  } from 'ionic-angular';
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { BenefitsPage } from '../benefits/benefits';

@Component({
  templateUrl: 'build/pages/dormbenefits/dormbenefits.html',
})
export class DormbenefitsPage {
  member_id: number; //สร้างตัวแปร id เพื่อไว้ส่งข้อมูลไปหลังร้าน
  dorm_id: any;
  items: Array<{}>; //ประกาศตัวแปร array เปล่า

  constructor(private navCtrl: NavController, private http: Http,private navparam:NavParams) {  //ประกาศตัวแปร http
    this.member_id = navparam.get("id"); //เป็นการเรียกใช้ id เพื่อที่จะรับค่า member_id
    this.http = http; //นํา http มากําหนดให้ http ของคลาส

  //ใช้ method get() เพื่อดึงข้อมูล
   //ใช้ method subscribe() เพื่อดึงค่า json object เข้ามาใช้งานใน component
   this.http.get("http://localhost/mydorm/connect/getinfo/get_dormbenefits.php").subscribe(
   (response) => {
   this.items = response.json().data; //ดึงข้อมูลที่ได้ แล้วกําหนดให้กับตัวแปร itmes ของคลาสนี้ *
   }
   );
   console.log('id_member= '+this.member_id);
     }

     goTobenefits(item) {
       this.navCtrl.push(BenefitsPage,{
         member_id: this.member_id,
         dorm_id: item.dorm_id,
       });
     }
 }
