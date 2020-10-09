import { Injectable } from '@angular/core';
import { WebApiService } from 'src/core/services/web-api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AssignmentService {
    constructor(private api: WebApiService) { }

    getAllAssignmentDetail() {
        return this.api.get('assignment/AllAssignmentDetail');
    }

    addAssignment(json): Observable<any>{
        return this.api.post('assignment/AddAssignment', json);
      }
      updateAssignment(json): Observable<any>{
        return this.api.post('assignment/UpdateAssignment', json);
      }

      completeAssignment(json): Observable<any>{
        return this.api.post('assignment/CompleteAssignment', json);
      }

}