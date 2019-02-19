import {Component, HostListener, OnInit} from '@angular/core';
import {of, interval, Subject} from 'rxjs';
import {map, switchMap, take, takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  obs = new Subject();
  firstObservable = interval(1000)
    .pipe(
      map(value => {
        const data = ['fred', 'bob', 'gill', 'dave'];
        return data[value];
      })
    );

  constructor() { }

  ngOnInit() {
    this.obs.asObservable()
      .pipe(
        switchMap(() => {
          return this.firstObservable.pipe(
            takeWhile(value => value !== 'gill')
          );
        })
      )
      .subscribe(value => {
        console.log(value);
      });
  }

  @HostListener('click', ['$event'])
  clickHandler(event) {
    console.log('I have been clicked');
    this.obs.next(event);
  }
}
