import { Component, OnInit } from '@angular/core';
import { MvJob, MvNewJob } from './job.model';
import { JobService } from './job.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobFormComponent } from './job-form/job-form.component';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  userMessage = '';
  displayedColumns: string[];
  dataSource: MatTableDataSource<MvJob>;
  selectedJob: MvNewJob = <MvNewJob>{};
  selection = new SelectionModel<MvJob>(false, []);

  constructor(
    private jobService: JobService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['JobId','JobTitle', 'CustomerId', 'PayPerHour'];
    this.getAllJobs();
  }
  getAllJobs() {
    this.jobService.getAllJobDetail().subscribe((response: any) => {
      if (response && response.data) {
        this.dataSource = new MatTableDataSource<MvJob>(response.data);
      } else {
        this.dataSource = new MatTableDataSource<MvJob>();;
        this.userMessage = 'No Job available !';
      }
    });

  }

  addJob(){
    this.selection.clear();
    this.selectedJob = <MvJob>{};
    this.openDialog('Add');
  }

  editJob(){
    this.openDialog('Edit');
  }

  openDialog(action: string){
    if (action === 'Edit' && !this.selection.hasValue()){
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '25%';
    dialogConfig.panelClass = 'mat-form-dialog';
    dialogConfig.data = { data: this.selectedJob, action: action };
    const dialogRef = this.dialog.open(JobFormComponent, dialogConfig);


 

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === 'Edit'){
          this.jobService.updateJob(result).subscribe(res => {
            this.getAllJobs();
          });

        } else {
          this.jobService.addJob(result).subscribe(res => {
            this.getAllJobs();
          });
        }
      }

    });
  }

 selectRow(e: any, row: MvJob) {
    this.selectedJob = { ...row };
    this.selection.toggle(row);
  }





}
