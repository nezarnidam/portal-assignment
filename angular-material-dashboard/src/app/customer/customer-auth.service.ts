import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

interface CustProfileViewResponseData {
    custAuth_status: string;
}


@Injectable({ providedIn: 'root' })
export class CustomerAuthService {
    constructor(private http: HttpClient) { }

    custLogin(username: string, password: string) {
        return this.http.post<CustProfileViewResponseData>(
            '/api/custLogin',
            {
                username: username,
                password: password,
            }
        );
    }

    loggedin() {
        return this.http.post<any>(
            '/api/loggedin', {

        }
        )
    }

    signout() {
        return this.http.post<any>(
            '/api/signout', {

        }
        )
    }
}