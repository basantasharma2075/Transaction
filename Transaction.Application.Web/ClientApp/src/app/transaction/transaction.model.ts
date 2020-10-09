export interface MvTransaction {
    TransactionId: number;
    AssignmentId: number;
    WorkHours: number;
    PayPerHour: number;
    Amount: number;
    InvoiceId: number;
    

}

export interface MvNewTransaction {
    AssignmentId: number;
    WorkHours: number;
    PayPerHour: number;
    
    
}