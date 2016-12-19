import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class Login {
data: any = null;
  constructor(private http: Http) {}
  load() {
    if (this.data) {
    // already loaded data
    return Promise.resolve(this.data);
}
return new Promise(resolve => {
  this.http.get('http://192.168.1.15/mydorm/connect/putinfo/login.php') //localhost //192.168.139.237
  .map(res => res.json())
  .subscribe(data => {

     this.data = data;
     resolve(this.data);
      });
    });
    }

    //method สําหรับส่งข้อมูลจากฟอร์มไปบันทึกที่ Backend
       save(body:string) {
         let headers = new Headers();
         headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
         if (this.data) {
           // already loaded data
           return Promise.resolve(this.data);
         }
         //don't have the data yet
          return new Promise(resolve => {
           this.http.post('http://192.168.1.15/mydorm/connect/putinfo/login.php',body,{headers: headers})
           .map(res => res.json())
           .subscribe(data => {
              this.data = data;
              resolve(this.data);
            });
          });
}
}
