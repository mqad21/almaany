import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  private mainPages: string[] = [
    '/favorite/'
  ];
  showHamburger: Boolean;

  @Input() drawer: MatDrawer;

  constructor(
    @Inject('Constants') public Constants,
    private router: Router,
    private location: Location
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        const isMainPage = this.mainPages.filter(mainPage => {
          return event.url.includes(mainPage);
        }).length === 0;
        this.showHamburger = isMainPage;
      }
    });
  }

  ngOnInit() {}

  toggleDrawer() {
    this.drawer.toggle();
  }

  handleBack() {
    const location = this.location.path(true);
    this.router.navigateByUrl('/' + location.split('/')[1]);
  }

  isDarkMode() {
    return (localStorage.getItem(this.Constants.THEME) || this.Constants.LIGHT_MODE) === this.Constants.DARK_MODE;
  }

  toggleMode() {
    if (this.isDarkMode()) {
      localStorage.setItem(this.Constants.THEME, this.Constants.LIGHT_MODE);
    } else {
      localStorage.setItem(this.Constants.THEME, this.Constants.DARK_MODE);
    }
  }

  getIcon() {
    return this.isDarkMode() ? 'brightness_7' : 'brightness_4';
  }

}
