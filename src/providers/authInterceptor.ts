import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { tap } from 'rxjs/operators';
import { Events } from 'ionic-angular';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public events: Events) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let accessToken = localStorage.getItem("access_token");
        //console.log("intercept" + accessToken);
        if (accessToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + accessToken
                }
            });
        }

        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status == 401) {
                    //handle authorization errors
                    //in this example I am navigating to login.
                    //console.log("Error_Token_Expired: redirecting to login.");
                    this.events.publish('user:logout');
                }
            }
        }));
    }
}

