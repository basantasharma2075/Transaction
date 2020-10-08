import { Component, OnInit } from '@angular/core';
import { MvEmployee, MvNewEmployee } from './employee.model';
import { EmployeeService } from './employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  userMessage = '';
  displayedColumns: string[];
  dataSource: MatTableDataSource<MvEmployee>;
  selectedEmployee: MvNewEmployee = <MvNewEmployee>{};
  selection = new SelectionModel<MvEmployee>(false, []);

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.displayedColumns = ['PersonId','EmployeeId', 'FirstName', 'LastName', 'Address', 'Phone', 'Email'];
    this.getAllEmployees();
  }
  getAllEmployees() {
    this.employeeService.getAllEmployeeDetail().subscribe((response: any) => {
      if (response && response.data) {
        this.dataSource = new MatTableDataSource<MvEmployee>(response.data);
      } else {
        this.dataSource = new MatTableDataSource<MvEmployee>();;
        this.userMessage = 'No Employee available !';
      }
    });

  }

  addEmployee(){
    this.selection.clear();
    this.selectedEmployee = <MvEmployee>{};
    this.openDialog('Add');
  }

  editEmployee(){
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
    dialogConfig.data = { data: this.selectedEmployee, action: action };
    const dialogRef = this.dialog.open(EmployeeFormComponent, dialogConfig);


 

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (action === 'Edit'){
          this.employeeService.updateEmployee(result).subscribe(res => {
            this.getAllEmployees();
          });

        } else {
          this.employeeService.addEmployee(result).subscribe(res => {
            this.getAllEmployees();
          });
        }
      }

    });
  }

 selectRow(e: any, row: MvEmployee) {
    this.selectedEmployee = { ...row };
    this.selection.toggle(row);
  }





}
