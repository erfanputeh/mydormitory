import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { LoginPage } from './pages/login/login';
import { HomePage } from './pages/home/home';
import { HistoryPage } from './pages/history/history';
import { ContactPage } from './pages/contact/contact';
import { NotifiPage } from './pages/notifi/notifi';
import { Storage, LocalStorage } from 'ionic-angular';
import { Http } from '@angular/http';


@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

   numbers: any;
   items : Array<{}>;
  //  member_id: any;
   public local: Storage;
   public person: any;
   public surname_person: any;
   public id_person: any;
   public historybook: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,private http : Http) {
    this.http = http;
    this.initializeApp();
    this.local = new Storage(LocalStorage);
    this.local.get('person').then ((data)=>this.person = data); //ส่วนที่แสดงข้อมูลที่รับมาจากหลังร้าน
    this.local.get('surname_person').then ((data)=>this.surname_person = data);
    this.local.get('id_person').then ((data)=>this.id_person = data);
    this.local.get('historybook').then ((data)=>this.historybook = data);
    this.pages = [

      { title: 'เกี่ยวกับ', component: ContactPage },
    ];

    this.local.get('id_person').then((data) =>{
      this.http.get("http://192.168.1.15/mydorm/connect/getinfo/get_notifi.php?member_id="+data).subscribe(
        (response) => {
          this.numbers = response.json().numbers;
        }
      );
    });

    console.log("id_person="+this.id_person);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  home(){
    this.nav.setRoot(HomePage);
  }

  history(){
    this.nav.setRoot(HistoryPage,{
      id: this.id_person
    });
  }

  notifications(){
    this.nav.setRoot(NotifiPage,{
      member_id: this.id_person
    });
  }

  login(){
    this.nav.setRoot(LoginPage);
  }

  logout(){
    this.local.clear();
    this.nav.setRoot(LoginPage);
  }


} // ปิด MyApp



ionicBootstrap(MyApp);
