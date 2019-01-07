import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { map, filter, tap } from 'rxjs/operators';

import { ToastController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public events: Events, private toastCtrl: ToastController) {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let accessToken = localStorage.getItem("access_token");
        console.log("intercept" + accessToken);
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
                if (err.status === 401 || err.status === 403) {
                    //handle authorization errors
                    //in this example I am navigating to login.
                    //console.log("Error_Token_Expired: redirecting to login.");

                    localStorage.removeItem("access_token");
                    this.events.publish('user:logout');
                } else if (err.status === 0) {
                    let toast = this.toastCtrl.create({
                        message: 'خطا در شبکه. لطفا دوباره سعی کنید',
                        showCloseButton: true,
                        closeButtonText: 'تلاش مجدد',
                        position: 'bottom'
                    });
                    toast.onDidDismiss(() => {
                        this.events.publish('splash:refresh');
                    });

                    toast.present();
                }
            }
        }));
    }
}

