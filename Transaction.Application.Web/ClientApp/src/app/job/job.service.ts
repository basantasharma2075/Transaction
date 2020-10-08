import { Injectable } from '@angular/core';
import { WebApiService } from 'src/core/services/web-api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class JobService {
    constructor(private api: WebApiService) { }

    getAllJobDetail() {
        return this.api.get('job/AllJobDetail');
    }

    addJob(json): Observable<any>{
        return this.api.post('job/addjob', json);
      }
      updateJob(json): Observable<any>{
        return this.api.post('job/updatejob', json);
      }

}