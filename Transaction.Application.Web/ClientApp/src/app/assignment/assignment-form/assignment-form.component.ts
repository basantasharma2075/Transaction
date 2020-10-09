import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MvEmployee } from 'src/app/employee/employee.model';
import { EmployeeService } from 'src/app/employee/employee.service';
import { MvJob } from 'src/app/job/job.model';
import { JobService } from 'src/app/job/job.service';
import { MvAssignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.scss']
})
export class AssignmentFormComponent implements OnInit {
  assignmentForm: FormGroup;
  employees = [];
  jobs = [];
  action: string;
  assignment: MvAssignment = {} as MvAssignment;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AssignmentFormComponent>,
    private es: EmployeeService,
    private js: JobService,
  ) {
    this.action = data.action;
    this.assignment = data.data || {};
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.assignmentForm = this.fb.group({
      AssignmentName: [this.assignment.AssignmentName, Validators.required],
      StartDate: [this.assignment.StartDate, Validators.required],
      EndDate: [this.assignment.EndDate, Validators.required],
      EmployeeId: [this.assignment.EmployeeId, Validators.required],
      JobId: [this.assignment.JobId, Validators.required],
      });
    this.fetchEmployees();
    this.fetchJobs();

  }

  fetchEmployees(): void {
    this.es.getAllEmployeeDetail().subscribe(res => {
      if (res && res.data) {
        res.data.forEach(item => {
          if (item.EmployeeId) {
            this.employees.push({
              value: item.EmployeeId,
              viewValue: `${item.EmployeeId}`
            });
          }
        });
      }
    }, err => console.log(err));
  }

  fetchJobs(): void {
    this.js.getAllJobDetail().subscribe(res => {
      if (res && res.data) {
        res.data.forEach(item => {
          if (item.JobId) {
            this.jobs.push({
              value: item.JobId,
              viewValue: `${item.JobTitle}`
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
    this.assignment.AssignmentName = this.assignmentForm.get('AssignmentName').value;
    this.assignment.StartDate = this.assignmentForm.get('StartDate').value;
    this.assignment.EndDate = this.assignmentForm.get('EndDate').value;
    this.assignment.EmployeeId = this.assignmentForm.get('EmployeeId').value;
    this.assignment.JobId = this.assignmentForm.get('JobId').value;
    this.dialogRef.close(this.assignment);
  }

}