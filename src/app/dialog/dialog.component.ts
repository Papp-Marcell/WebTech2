import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
  ) { 
    this.createForm();
    if(data != null){
      console.log(data);
      this.fillForm(data);
    }
  }

  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  createForm(){
    this.form = this.formBuilder.group({
      make: ['', [Validators.required,Validators.pattern('^[A-Za-z]*$')]],
      model: ['', [Validators.required,Validators.pattern('^[A-Za-z0-9 ]*$')]],
      number_plate: ['', [Validators.required,Validators.minLength(7),Validators.pattern('^[A-Za-z]{3}-[0-9]{3}')]],
      color: ['', [Validators.required,Validators.pattern('^[A-Za-z]*$')]],
      horsepower: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      date: ['', [Validators.required,Validators.pattern('^[0-9-]*$')]]
    });
  }
  fillForm(data){
    this.form.get("make").setValue(data.make);
    this.form.get("number_plate").setValue(data.number_plate);
    this.form.get("model").setValue(data.model);
    this.form.get("color").setValue(data.color);
    this.form.get("date").setValue(data.date);
    this.form.get("horsepower").setValue(data.horsepower);
  }
}
