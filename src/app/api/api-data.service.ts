import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  getData(endpoint: string): Observable<any[]> {
    //const bearerToken: string = this.cookieService.get('token');
    // const userFromLocal = this.cookieService.get(USER_LOCAL_STORAGE_KEY);
    // const {token}:LoginUser = JSON.parse(userFromLocal) as LoginUser;

    // localStorage.setItem('access_token', token);

    //This is the authentication about
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      })
    };
    return this.http.get<any[]>( 'http://localhost:4000/' + endpoint) 
  }

 

  postData(endpoint: string, body: any): Promise<boolean> {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    
    return new Promise<boolean>((resolve, reject) => {
      this.http.post('http://localhost:4000/' + endpoint, body, httpOptions)
      .subscribe(
        response => {
          console.log('Insertado con éxito');
          resolve(true);
        },
        error => {
          console.log('Error al insertar los datos:', error);
          reject(error);
        }
      );
    });
  }

  // updateData(endpoint: string, body: any): Promise<boolean> {
  //   return new Promise<boolean>((resolve, reject) => {
  //     this.http.post( 'http://localhost:4000/' + endpoint, body, {
  //       headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  //     })
  //       .subscribe(
  //         response => {
  //           console.log('Insertado con éxito');
  //           resolve(true);
  //         },
  //         error => {
  //           console.log('Error al insertar los datos:', error);
  //           resolve(false);
  //         }
  //       );
  //   });
  // }



}
