import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VisualizationsService {

  constructor(private readonly http: HttpClient) {

  }

  public createVisualization(data: any) {
    return this.http.post<any>(
      `/api/visualization`,
      data,
    );
  }

  public getVisualizations() {
    return this.http.get<Array<any>>(
      `/api/visualizations`
    );
  }

}
