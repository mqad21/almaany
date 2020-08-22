import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'almaany';

  constructor(
    @Inject('Constants') private Constants
  ) {}

  ngOnInit() {}

  isDarkMode(): Boolean {
    return localStorage.getItem(this.Constants.THEME) === this.Constants.DARK_MODE;
  }

}
