import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MvCustomer } from 'src/app/customer/customer.model';
import { CustomerService } from 'src/app/customer/customer.service';
import { MvJob } from '../job.model';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {
  jobForm: FormGroup;
  customers = [];
  action: string;
  job: MvJob = {} as MvJob;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<JobFormComponent>,
    private cs: CustomerService,
  ) {
    this.action = data.action;
    this.job = data.data || {};
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.jobForm = this.fb.group({
      CustomerId: [this.job.CustomerId, Validators.required],
      PayPerHour: [this.job.PayPerHour, Validators.required],
      JobTitle: [this.job.JobTitle, Validators.required],
      });
    this.fetchCustomers();

  }

  fetchCustomers(): void {
    this.cs.getAllCustomerDetail().subscribe(res => {
      if (res && res.data) {
        res.data.forEach(item => {
          if (item.CustomerId) {
            this.customers.push({
              value: item.CustomerId,
              viewValue: `${item.CustomerId}`
            });
          }
        });
      }
    }, err => console.log(err));
  }

  cancelClick(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    this.job.CustomerId = this.jobForm.get('CustomerId').value;
    this.job.PayPerHour = this.jobForm.get('PayPerHour').value;
    this.job.JobTitle = this.jobForm.get('JobTitle').value;
    this.dialogRef.close(this.job);
  }

}