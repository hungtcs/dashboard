
export interface DataSource {
  id: string;
  name: string;
  connectionString: string;
}

export interface DataSourceQueryResponse {
  data: Array<DataSource>;
  count: number;
}
