import { Injectable } from '@angular/core';

import { filter, from, map, Observable, of, switchMap } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';


interface User{
  uid: string,
  email: string,
  bdate?:string,
  fullName: string,
  photoUrl?:string,
  notificationPrefernce?:[]
}

@Injectable({
  providedIn: 'root',
})

export class UsersService {

  user: Observable<User>;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private router: Router) {
    this.user= this.afAuth.authState.pipe(
      switchMap((user)=>{
        if(user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        }
      })

    )

  }







}