import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { MvNewCustomer } from './../customer.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit , AfterViewInit{

  customerForm: FormGroup;
  action: string;
  selectedCustomer: MvNewCustomer = <MvNewCustomer>{};


  
  constructor(public fb: FormBuilder,
    public dialogRef: MatDialogRef<CustomerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { 
      dialogRef.disableClose = true;
      this.action = data.action;
      this.selectedCustomer = data.data || {};
    }

    ngOnInit(): void {
      this.customerForm = this.fb.group({
        OrganizationName: ['', Validators.required],
        Address: ['', Validators.required],
        Phone: ['', [Validators.required]],
        Email: ['', [Validators.required]]
      });
    }

    onSubmit(){
      this.dialogRef.close(this.selectedCustomer);
    }
    onClose(){
      this.dialogRef.close();
    }
  
    ngAfterViewInit() {
      this.customerForm.updateValueAndValidity();
    }
  
  }