import { Component, OnInit } from '@angular/core';
import { MvAssignment, MvNewAssignment } from './assignment.model';
import { AssignmentService } from './assignment.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignmentFormComponent } from './assignment-form/assignment-form.component';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {
  userMessage = '';
  displayedColumns: string[];
  dataSource: MatTableDataSource<MvAssignment>;
  selectedAssignment: MvNewAssignment = <MvNewAssignment>{};
  selection = new SelectionModel<MvAssignment>(false, []);

  constructor(
    private assignmentService: AssignmentService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['AssignmentId','AssignmentName', 'StartDate', 'EndDate', 'EmployeeId','JobId', 'Status'];
    this.getAllAssignments();
  }
  getAllAssignments() {
    this.assignmentService.getAllAssignmentDetail().subscribe((response: any) => {
      if (response && response.data) {
        this.dataSource = new MatTableDataSource<MvAssignment>(response.data);
      } else {
        this.dataSource = new MatTableDataSource<MvAssignment>();;
        this.userMessage = 'No Assignment available !';
      }
    });

  }

  addAssignment(){
    this.selection.clear();
    this.selectedAssignment = <MvAssignment>{};
    this.openDialog('Add');
  }

  editAssignment(){
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
    dialogConfig.data = { data: this.selectedAssignment, action: action };
    const dialogRef = this.dialog.open(AssignmentFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === 'Edit'){
          this.assignmentService.updateAssignment(result).subscribe(res => {
            this.getAllAssignments();
          });

        } else {
          this.assignmentService.addAssignment(result).subscribe(res => {
            this.getAllAssignments();
          });
        }
      }

    });
  }

 selectRow(e: any, row: MvAssignment) {
    this.selectedAssignment = { ...row };
    this.selection.toggle(row);
  }





}
