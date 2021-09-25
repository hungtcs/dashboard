import 'systemjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, from, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExtensionsService {
  public extensions: Array<any> = [];

  constructor(
      private readonly http: HttpClient) {

  }

  public loadExtensions() {
    return this.http.get<Array<any>>('/api/extensions')
      .pipe(switchMap(extensions => {
        return forkJoin(
          extensions.map(extension => {
            return from(
              System.import(`/api/extensions/${ extension.id }/entrypoint`)
                .then(module => {
                  return {
                    ...extension,
                    status: 'success',
                    entrypoint: module.default,
                  };
                }),
            ).pipe(catchError((err) => {
              console.log(err);
              return of({
                ...extension,
                error: err,
                status: 'error',
              });
            }));
          }),
        );
      }))
      .pipe(tap((extensions) => {
        // console.log(extensions);
        this.extensions = extensions;
      }));
  }

}
