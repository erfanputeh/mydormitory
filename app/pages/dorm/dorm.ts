import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { HTTP_PROVIDERS, Http } from '@angular/http'; //นําเข้า HTTP_PROVIDERS, Http เข้ามาใช้งาน
import { FloorPage } from '../floor/floor';


@Component({
  templateUrl: 'build/pages/dorm/dorm.html',
})
export class DormPage {
    member_id: number; //สร้างตัวแปร id เพื่อไว้ส่งข้อมูลไปหลังร้าน
    name_member: any;
    surname_member: any;
    items: Array<{}>; //ประกาศตัวแปร array เปล่า


  constructor(private navCtrl: NavController, private http: Http,private navparam:NavParams) {  //ประกาศตัวแปร http
    this.member_id = navparam.get("id"); //เป็นการเรียกใช้ id เพื่อที่จะรับค่า member_id
    this.name_member = navparam.get("name");
    this.surname_member = navparam.get("surname");
    this.http = http; //นํา http มากําหนดให้ http ของคลาส

    //ใช้ method get() เพื่อดึงข้อมูล
     //ใช้ method subscribe() เพื่อดึงค่า json object เข้ามาใช้งานใน component
     this.http.get("http://localhost/mydorm/connect/getinfo/get_dorm.php").subscribe(
     (response) => {
     this.items = response.json().data; //ดึงข้อมูลที่ได้ แล้วกําหนดให้กับตัวแปร itmes ของคลาสนี้ *
     }
     );
     console.log('id_member= '+this.member_id);
   } // constructor

   goToFloor(item) {
     this.navCtrl.push(FloorPage,{
       member_id: this.member_id,
       dorm_id: item.dorm_id,
       dorm_name: item.dorm_name,
       name_member: this.name_member,
       surname_member: this.surname_member
     });
   }
}
