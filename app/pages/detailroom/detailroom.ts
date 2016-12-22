import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { HTTP_PROVIDERS, Http } from '@angular/http'; //นําเข้า HTTP_PROVIDERS, Http เข้ามาใช้งาน
import { SuccessPage } from '../success/success';




@Component({
  templateUrl: 'build/pages/detailroom/detailroom.html',
})
export class DetailroomPage {
    items: Array<{}>; //ประกาศตัวแปร array เปล่า
    member_id: any;
    dorm_id: any;
    dorm_name: any;
    room_id: any;
    room_name: any;
    floor_id: any;
    floor_name: any;
    name_member: any;
    surname_member: any;

    count: any;
    booking: any[];
    room_status: any;
    status: any;



  constructor(private navCtrl: NavController, private http: Http, private navparam: NavParams) {  //ประกาศตัวแปร http
    this.http = http; //นํา http มากําหนดให้ http ของคลาส
    this.dorm_id = navparam.get("dorm_id");
    this.dorm_name = navparam.get("dorm_name");
    this.floor_id = navparam.get("floor_id");
    this.floor_name = navparam.get("floor_name");
    this.room_id = navparam.get("room_id");
    this.room_name = navparam.get("room_name");
    this.member_id = navparam.get("member_id");
    this.name_member = navparam.get("name_member");
    this.surname_member = navparam.get("surname_member");


    //ใช้ method get() เพื่อดึงข้อมูล
     //ใช้ method subscribe() เพื่อดึงค่า json object เข้ามาใช้งานใน component
     this.http.get("http://localhost/mydorm/connect/getinfo/get_detailroom.php?id="+this.room_id).subscribe(
     (response) => {
       this.items = response.json().data;
       this.room_status = response.json().room_status;

       if(this.room_status == 1){
         this.status = "ห้องไม่ว่าง";
       }else if(this.room_status == 2){
         this.status = "ห้องว่าง";
     }
      }
     );

     this.http.get("http://localhost/mydorm/connect/getinfo/count_booking.php?id="+this.room_id).subscribe(
     (response) => {
       this.count = response.json(); //ดึงข้อมูลที่ได้ แล้วกําหนดให้กับตัวแปร itmes ของคลาสนี้ *
      }
     );

      console.log('dorm_id= '+this.dorm_id);
      console.log('dorm_name= '+this.dorm_name);
      console.log('floor_id= '+this.floor_id);
      console.log('floor_name= '+this.floor_name);
      console.log('room_id= '+this.room_id);
      console.log('room_name= '+this.room_name);
      console.log('name_member= '+this.name_member);
      console.log('surname_member= '+this.surname_member);

   }

    goToSuccess(item) {
      this.booking=[];
      this.booking.push({
        member_id: this.member_id,
        name_member: this.name_member,
        surname_member: this.surname_member,
        dorm_id: this.dorm_id,
        dorm_name: this.dorm_name,
        floor_id: this.floor_id,
        floor_name: this.floor_name,
        room_id: this.room_id,
        room_name: this.room_name
      });

      this.navCtrl.push(SuccessPage,{
        booking: this.booking
      });

    } //  goToSuccess
}
