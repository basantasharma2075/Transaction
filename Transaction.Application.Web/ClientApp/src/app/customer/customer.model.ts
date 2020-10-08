export interface MvCustomer {
    OrganizationId: number;
    CustomerId: number;
    OrganizationName: string;
    Address: string;
    Phone: number;
    Email: string;

}

export interface MvNewCustomer {
    OrganizationName: string;
    Address: string;
    Phone: number;
    Email: string;
}