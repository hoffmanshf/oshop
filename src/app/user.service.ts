import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
import { AppUser } from "./models/app-user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    })
  }

  get(uid: string) {
    return this.db.object<AppUser>('/users/' + uid).valueChanges();
  }
}
