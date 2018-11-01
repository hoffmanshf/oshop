import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  observableCategories$: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.observableCategories$ = this.db.list('/categories', ref => ref.orderByChild('name'))
      .snapshotChanges();
  }

  getCategories() {
    // // you can do manual unsubscribe with this approach
    // return this.observableCategories$.pipe(map(actions =>
    //   actions.map(a => ({ key: a.key, ...a.payload.val() }))
    // )).subscribe(items => {
    //   return items.map(item => item.key);
    // });
    return this.observableCategories$.pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }));
  }
}
