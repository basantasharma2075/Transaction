import { Injectable } from '@angular/core';
import { WebApiService } from 'src/core/services/web-api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    constructor(private api: WebApiService) { }

    getAllEmployeeDetail() {
        return this.api.get('person/AllEmpoyeeDetail');
    }

    addEmployee(json): Observable<any>{
        return this.api.post('person/AddEmployee', json);
      }
      updateEmployee(json): Observable<any>{
        return this.api.post('person/UpdateEmployee', json);
      }

}