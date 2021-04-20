import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';
import { AlertService } from '../services/alert.service';


@Injectable({
  providedIn: 'root'
})
export class VehicleService {
    uri = environment.apiUrl;
    options = {
      autoClose: true,
      keepAfterRouteChange: true
    };  
    constructor(private httpClient: HttpClient,protected alertService: AlertService,) {}

    getVehicle(){
        return this.httpClient.get(`${this.uri}/app/getVehicle/`);
    }
    addVehicle(obj){
      return this.httpClient.post(`${this.uri}/app/VehicleAdd`, obj).subscribe(
        res => console.log(res),
        error => this.alertService.error("Something went wrong",this.options)
      );
    }
    deleteVehicle(id){
      return this.httpClient.post(`${this.uri}/app/VehicleDelete`,{_id : id}).subscribe(
        res => console.log(res),
        
      );
    }

    updateVehicle(data,id){
      const obj ={
        vehicle:data,
       _id : id,   
      }
      return this.httpClient.post(`${this.uri}/app/VehicleUpdate`, obj).subscribe(
        res => console.log(res),
        
      );
    }
}