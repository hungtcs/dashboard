import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataSourceQueryResponse } from './data-sources.dto';

@Injectable({
  providedIn: 'root'
})
export class DataSourcesService {

  constructor(
      private readonly http: HttpClient) {

  }

  public getDataSources() {
    return this.http.get<DataSourceQueryResponse>(`/api/data-sources`);
  }

  public queryDataFromDataSource<T = any>(type: string, collection: string, dataSourceId: string) {
    return this.http.get<Array<T>>(
      `/api/data-source/query`,
      {
        params: {
          type,
          collection,
          dataSourceId,
        },
      },
    );
  }


}
