import { Injectable } from '@angular/core';
import { WebApiService } from 'src/core/services/web-api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    constructor(private api: WebApiService) { }

    getAllCustomerDetail() {
        return this.api.get('customer/AllCustomerDetail');
    }

    addCustomer(json): Observable<any>{
        return this.api.post('customer/addcustomer', json);
      }
      updateCustomer(json): Observable<any>{
        return this.api.post('customer/updatecustomer', json);
      }

}