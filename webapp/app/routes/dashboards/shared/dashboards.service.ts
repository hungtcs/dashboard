import { Dashboard } from './interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService {

  constructor(
      private readonly http: HttpClient) {

  }

  public getDashboards() {
    return this.http.get<Array<Dashboard>>(`/api/dashboards`);
  }

  public getDashboardWidgets(id: string) {
    return this.http.get<Array<any>>(`/api/dashboard/${ id }/widgets`);
  }

  public setDashboardWidgets(id: string, widgets: Array<any>) {
    return this.http.put<void>(`/api/dashboard/${ id }/widgets`, widgets);
  }


}
