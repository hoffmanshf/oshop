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
    // return this.db.list('/categories', {query: {orderByChild: 'name'}});
    return this.observableCategories$.pipe(map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }));
  }
}
