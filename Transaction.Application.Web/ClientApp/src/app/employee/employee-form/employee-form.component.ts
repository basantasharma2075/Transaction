import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { MvNewEmployee } from './../employee.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit , AfterViewInit{

  employeeForm: FormGroup;
  action: string;
  selectedEmployee: MvNewEmployee = <MvNewEmployee>{};


  
  constructor(public fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
      dialogRef.disableClose = true;
      this.action = data.action;
      this.selectedEmployee = data.data || {};
    }

    ngOnInit(): void {
      this.employeeForm = this.fb.group({
        FirstName: ['', Validators.required],
        LastName: ['', Validators.required],
        Address: ['', Validators.required],
        Phone: ['', [Validators.required]],
        Email: ['', [Validators.required]]
      });
    }

    onSubmit(){
      this.dialogRef.close(this.selectedEmployee);
    }
    onClose(){
      this.dialogRef.close();
    }
  
    ngAfterViewInit() {
      this.employeeForm.updateValueAndValidity();
    }
  
  }