import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Http } from '@angular/http';


@Component({
  templateUrl: 'build/pages/detailrepair/detailrepair.html',
})
export class DetailrepairPage {
  id : any;
  repair: any;
  status: any;
  items: Array<{}>; //ประกาศตัวแปร array เปล่า

  constructor(private navCtrl: NavController,private http: Http,private navparam: NavParams) {
    this.http = http; //สร้างตัวแปร http เพื่อไว้ใช้ในการส่งข้อูลระหว่างกัน
    this.id = navparam.get("id"); //เป็นการเรียกใช้ id เพื่อที่จะรับค่า member_id ของ detailrepair
    this.navCtrl=navCtrl;

    console.log('รหัสผู้ใช้='+this.id);

    this.http.get("http://192.168.1.15/mydorm/connect/getinfo/get_detailrepair.php?id="+this.id).subscribe(
    (response) => {
        this.items = response.json().data;
        this.repair = response.json().repair;
      }
    );

 } //constructor

}
