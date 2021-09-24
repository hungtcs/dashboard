import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Visualization } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class VisualizationsService {

  constructor(
      private readonly http: HttpClient) {

  }

  public getVisualization(id: string) {
    return this.http.get<Visualization>(`/api/visualization/${ id }`);
  }

  public createVisualization(data: any) {
    return this.http.post<any>(
      `/api/visualization`,
      data,
    );
  }

  public getVisualizations() {
    return this.http.get<Array<Visualization>>(
      `/api/visualizations`
    );
  }

}
