import { Injectable } from '@angular/core';
import { WebApiService } from 'src/core/services/web-api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {
    constructor(private api: WebApiService) { }

    getAllInvoiceDetail() {
        return this.api.get('invoice/AllInvoiceDetail');
    }

     addInvoice(json): Observable<any>{
        return this.api.post('invoice/addinvoice', json);
      }
 
}