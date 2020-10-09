import { Injectable } from '@angular/core';
import { WebApiService } from 'src/core/services/web-api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    constructor(private api: WebApiService) { }

    getAllTransactionDetail() {
        return this.api.get('transaction/AllTransactionDetail');
    }

    addTransaction(json): Observable<any>{
        return this.api.post('transaction/addTransaction', json);
      }
 
}