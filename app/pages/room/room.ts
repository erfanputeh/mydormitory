import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { HTTP_PROVIDERS, Http } from '@angular/http'; //นําเข้า HTTP_PROVIDERS, Http เข้ามาใช้งาน
import { SuccessPage } from '../success/success';
import { DetailroomPage } from '../detailroom/detailroom';



@Component({
  templateUrl: 'build/pages/room/room.html',
})
export class RoomPage {

    @ViewChild('room') roomElement : ElementRef;

    items: Array<{}>; //ประกาศตัวแปร array เปล่า
    member_id: any;
    dorm_id: any;
    dorm_name: any;
    floor_id: any;
    floor_name: any;
    name_member: any;
    surname_member: any;

    booking: any[];




  constructor(private navCtrl: NavController, private http: Http, private navparam: NavParams) {  //ประกาศตัวแปร http
    this.http = http; //นํา http มากําหนดให้ http ของคลาส
    this.dorm_id = navparam.get("dorm_id");
    this.dorm_name = navparam.get("dorm_name");
    this.floor_id = navparam.get("floor_id");
    this.floor_name = navparam.get("floor_name");
    this.member_id = navparam.get("member_id");
    this.name_member = navparam.get("name_member");
    this.surname_member = navparam.get("surname_member");


    //ใช้ method get() เพื่อดึงข้อมูล
     //ใช้ method subscribe() เพื่อดึงค่า json object เข้ามาใช้งานใน component
     this.http.get("http://localhost/mydorm/connect/getinfo/get_room.php?id="+this.floor_id+"&dorm_id="+this.dorm_id).subscribe(
     (response) => {
       this.items = response.json(); //ดึงข้อมูลที่ได้ แล้วกําหนดให้กับตัวแปร itmes ของคลาสนี้ *
      }
     );
      console.log('dorm_id= '+this.dorm_id);
      console.log('dorm_name= '+this.dorm_name);
      console.log('floor_id= '+this.floor_id);
      console.log('floor_name= '+this.floor_name);
      console.log('name_member= '+this.name_member);
      console.log('surname_member= '+this.surname_member);
   }

  goToDetailroom(item) {
    this.navCtrl.push(DetailroomPage,{
      room_id: item.room_id,
      room_name: item.room_name,
      dorm_id: this.dorm_id,
      dorm_name: this.dorm_name,
      floor_id: item.floor_id,
      floor_name: this.floor_name,
      member_id: this.member_id,
      name_member: this.name_member,
      surname_member: this.surname_member
    });
  }

}
