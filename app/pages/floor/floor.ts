import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { HTTP_PROVIDERS, Http } from '@angular/http'; //นําเข้า HTTP_PROVIDERS, Http เข้ามาใช้งาน
import { RoomPage } from '../room/room';


@Component({
  templateUrl: 'build/pages/floor/floor.html',
})
export class FloorPage {
    items: Array<{}>; //ประกาศตัวแปร array เปล่า
    id: any;
    member_id: any;
    dorm_id: any;
    dorm_name: any;
    name_member: any;
    surname_member: any;


  constructor(private navCtrl: NavController, private http: Http, private navparam: NavParams) {  //ประกาศตัวแปร http
    this.http = http; //นํา http มากําหนดให้ http ของคลาส
    this.id = navparam.get("dorm_id");
    this.dorm_name = navparam.get("dorm_name");
    this.member_id = navparam.get("member_id");
    this.name_member = navparam.get("name_member");
    this.surname_member = navparam.get("surname_member");

    //ใช้ method get() เพื่อดึงข้อมูล
     //ใช้ method subscribe() เพื่อดึงค่า json object เข้ามาใช้งานใน component
     this.http.get("http://192.168.1.15/mydorm/connect/getinfo/get_dorm_detail.php?id="+this.id).subscribe(
     (response) => {
     this.items = response.json(); //ดึงข้อมูลที่ได้ แล้วกําหนดให้กับตัวแปร itmes ของคลาสนี้ *
     }
     );
     console.log('dorm_id= '+this.id);
     console.log('dorm_name= '+this.dorm_name);
     console.log('member_id= '+this.member_id);
     console.log('name_member= '+this.name_member);
     console.log('surname_member= '+this.surname_member);

   } //constructor

   goToRoom(item) {
     this.navCtrl.push(RoomPage,{
       dorm_id: this.id,
       dorm_name: this.dorm_name,
       floor_id: item.floor_id,
       floor_name: item.floor_name,
       member_id: this.member_id,
       name_member: this.name_member,
       surname_member: this.surname_member
     });
   }



}
