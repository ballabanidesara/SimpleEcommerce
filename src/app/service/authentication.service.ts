import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, from, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(public auth: AngularFireAuth) { }

  signUp(email: string, password: string): Observable<any> {
    return from(
      this.auth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      catchError((error: any) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  signIn(email: string, password: string): Observable<any> {
    return from(
      this.auth.signInWithEmailAndPassword(email, password)
    ).pipe(
      catchError((error: any) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  recoverPassword(email: string): Observable<void> {
    return from(this.auth.sendPasswordResetEmail(email)).pipe(
      catchError((error: any) =>
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  private translateFirebaseErrorMessage(error: any) {
    // Translate Firebase error messages
    return error.message || 'Unknown error occurred';
  }
}
