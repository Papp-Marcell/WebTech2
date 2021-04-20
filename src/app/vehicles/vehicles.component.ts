import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authService'
import { VehicleService } from '../services/vehicleService'
import { Vehicle } from '../models/vehicle.model'
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource,} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component'


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  displayedColumns: string[] = ['number_plate','make','modell','color','horsepower','date','actions'];
  vehicles:Vehicle[];
  dataSource : MatTableDataSource<Vehicle>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private vehicleService: VehicleService,
    public dialog: MatDialog
  ) {  }

  ngOnInit(): void {
    this.vehicleService.getVehicle().subscribe((data: Vehicle[]) => {
      this.vehicles = data;
      console.log(this.vehicles);
      this.dataSource = new MatTableDataSource(this.vehicles);
    });
  }


  ngAfterViewInit() {
    
    setTimeout(() => this.dataSource.paginator = this.paginator,100);
    setTimeout(() => this.dataSource.sort = this.sort,100);
  }

  logOut(){
    
    this.authenticationService.logout()
  }

  addVehicle(){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '20%',
      minWidth : '200px',
      
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log("Dialog output:", data);
      if(data != null){
        this.vehicleService.addVehicle(data);
        setTimeout(() => location.reload(),100);
      }
    });
    
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }

  deleteItem(element){
    console.log(element._id);
    this.vehicleService.deleteVehicle(element._id);
    setTimeout(() => location.reload(),100);
  }

  editItem(element){
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '20%',
      minWidth : '200px',
      data : element
    });
    dialogRef.afterClosed().subscribe(data =>{
      console.log("Edit dialog output:",data);
      if(data != null){
        this.vehicleService.updateVehicle(data,element._id);
        setTimeout(() => location.reload(),100);
      }
    });
  }
}
