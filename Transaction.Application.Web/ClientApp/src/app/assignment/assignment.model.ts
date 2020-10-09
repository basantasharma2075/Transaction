export interface MvAssignment {
    AssignmentId: number;
    AssignmentName: string;
    StartDate: Date;
    EndDate: Date;
    EmployeeId: number;
    JobId: number;
    Status: number;
}

export interface MvNewAssignment {
    AssignmentId: number;
    AssignmentName: string;
    StartDate: Date;
    EndDate: Date;
    EmployeeId: number;
    JobId: number;
 //   WorkHours: string;
  //  PayPerHour: number;
    
}
