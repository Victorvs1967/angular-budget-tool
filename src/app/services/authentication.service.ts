import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public afAuth: AngularFireAuth) { }

  async createAccount(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return !!result;
    } catch (e) {
      return false;
    }
  }

  async login(email: string, password: string) {
    sessionStorage.clear();
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      const token: string = result.user?.getIdTokenResult() ? (await result.user!.getIdTokenResult()).token : '';
      sessionStorage.setItem('userToken', token);
      return !!result;
    } catch (e) {
      return false;
    }
  }
}
