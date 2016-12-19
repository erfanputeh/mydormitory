import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'build/pages/notifi/notifi.html',
})
export class NotifiPage {
    numbers: any;
    notifications: any;
    member_id : any;
    items : Array<{}>;
    // notifi_id: any;

    updatenotifi = "http://192.168.1.15/mydorm/connect/getinfo/putnotifi.php";

  constructor(private navCtrl: NavController,private http : Http,private navparam: NavParams) {
      this.navCtrl = navCtrl;
      this.http = http;
      this.member_id = navparam.get("member_id");
      this.http.get("http://192.168.1.15/mydorm/connect/getinfo/get_notifi.php?member_id="+this.member_id).subscribe(
      (response) => {
      this.items = response.json().data; //ดึงข้อมูลที่ได้ แล้วกําหนดให้กับตัวแปร itmes ของคลาสนี้ *
      this.notifications = response.json().notifications;
      this.numbers = response.json().numbers;
        }
      );
       console.log('member_id= '+this.member_id);
  } //constructor

  goToHome() {
    // this.http.get(this.updatenotifi+item.notifi_id).subscribe(
    //   (response) => {
    //     console.log("เตือน="+item.booking_id+': '+response.json().message);
    //   }
    // );
    this.navCtrl.setRoot(HomePage,{
      id:this.member_id
    });

  } //goToHome


} //NotifiPage
