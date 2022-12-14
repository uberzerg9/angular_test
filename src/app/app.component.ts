import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ItemsService } from './services/users.service';
import { trigger, transition, query, style, animate, group } from '@angular/animations';
const left = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.6s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.6s ease-out', style({ transform: 'translateX(100%)' }))], {
      optional: true,
    }),
  ]),
];

const right = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)' }), animate('.6s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.6s ease-out', style({ transform: 'translateX(-100%)' }))], {
      optional: true,
    }),
  ]),
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('animSwipe', [
      transition(':increment', right),
      transition(':decrement', left),
    ]),
  ],
})
export class AppComponent implements OnInit {
  counter:number = 0;
  loaded:boolean;

  usersJson:any;
  postsJson:any;

  userLink:any;

  constructor(private itemsService:ItemsService) {
    this.loaded = false;
  }
  ngOnInit() {
    this.getUsers();
    this.getPosts();
  }

  getUsers():void {
    this.loaded = false;
    this.itemsService.getItems('https://jsonplaceholder.typicode.com/users')
      .subscribe(
        users => {
          this.usersJson = users;
          this.loaded = true;
        }
      )
  }

  getPosts():void {
    this.loaded = false;
    this.itemsService.getItems('https://jsonplaceholder.typicode.com/posts')
      .subscribe(
        users => {
          this.postsJson = users;
          this.loaded = true;
        }
      )
  }

  onSwipe() {
    this.counter++;
  }
}
