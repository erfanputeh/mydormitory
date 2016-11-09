import { Component } from '@angular/core';
import { NavController,AlertController,NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Repair } from '../../providers/repair/repair';
import { HomePage } from '../home/home';
import { DetailrepairPage } from '../detailrepair/detailrepair';

import {
 FormBuilder,
 Validators,  //
 ControlGroup,
 FORM_DIRECTIVES,
} from '@angular/common';

@Component({
  providers: [Repair],
  directives: [FORM_DIRECTIVES],
  templateUrl: 'build/pages/repair/repair.html',
})
export class RepairPage {
    repairForm: ControlGroup;
    repair_id: any;
    id: any;
    dorm_id: any; //สร้างตัวแปร dorm_id เพื่อไว้ดึงข้อมูลไปยังแอพ
    floor_id: any;
    room_id: any;
    material_id: any;
    items: Array<{}>; //ประกาศตัวแปร array เปล่า
    material: Array<{}>;

  constructor(private navCtrl: NavController,private Formrepair:FormBuilder,private repairs:Repair,
    private alertCtrl: AlertController,private navparam:NavParams,
     private http: Http) {

    this.http = http; //สร้างตัวแปร http เพื่อไว้ใช้ในการส่งข้อูลระหว่างกัน
    this.id = navparam.get("id"); //เป็นการเรียกใช้ id เพื่อที่จะรับค่า member_id ของ repair
    this.navCtrl=navCtrl;
    this.repairs=repairs; //ตัวแปร repairs เป็นตัวแปรที่ส่งข้อมูลยัง providers ของ repair

     //ใช้ method get() เพื่อดึงข้อมูล
     //ใช้ method subscribe() เพื่อดึงค่า json object เข้ามาใช้งานใน component
     this.http.get("http://localhost/mydorm/connect/getinfo/get_repair.php?id="+this.id).subscribe(
     (response) => {
       this.items = response.json().data; //ดึงข้อมูลที่ได้ แล้วกําหนดให้กับตัวแปร itmes ของคลาสนี้ *
       this.dorm_id = response.json().dorm_id;
       this.floor_id = response.json().floor_id;
       this.room_id = response.json().room_id;

       console.log('dorm_id= '+this.dorm_id);
       console.log('floor_id= '+this.floor_id);
       console.log('room_id= '+this.room_id);
       
       this.http.get("http://localhost/mydorm/connect/getinfo/get_material.php?dorm_id="+this.dorm_id).subscribe(
       (response) => {
         this.material = response.json().material;
        }
       );
      }
     );


    this.repairForm = this.Formrepair.group({ //ใส่ข้อมูลลงฟอร์ม
      detail_repair:  ["",Validators.required],
      material:  ["",Validators.required],
    });

  } //ปิด constructor

  repair(event) {
     //ดึงค่ามาจากฟอร์มแต่ละตัว
     let detail_repair = this.repairForm.controls['detail_repair'].value;
    //  let material_id = met.material_id;
    let material_id = this.repairForm.controls['material'].value;


     //กําหนดตัวแปร body เพื่อส่งให้ method save() ของ provider เพื่อบันทึกข้อมูล
     //"&room="+this.room_id+ "&material="+this.material_id+
     let body = "id="+this.id+ "&dorm="+this.dorm_id+ "&room="+this.room_id+ "&floor="+this.floor_id+ "&material="+material_id+"&detail_repair="+detail_repair;

     console.log(body);
     this.repairs.save(body).then((response)=>{
      //สั่งให้ Alert ทํางานเมื่อบันทึกข้อมูลเรียบร้อย
     let alert = this.alertCtrl.create({
        title: 'ผลการทํางาน',
        subTitle: response.message, //message เป็นค่าที.ส่งกลับมาจาก Backend
        buttons: ['ตกลง']
        });

        alert.present(alert);
        this.navCtrl.setRoot(HomePage);

        }).catch((err)=>{
        console.log(err);
      });
        event.preventDefault();
    } //ปิดฟังก์ชัน repair

    goToDetailRepair() {
      this.navCtrl.push(DetailrepairPage,{
        id:this.id,
        // member_id: this.member_id
      });
    }

} // ปิด RepairPage
