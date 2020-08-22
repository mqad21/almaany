import { Component, OnInit, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {

  public menus: any[] = [
    {
      name: 'Cari Terjemahan',
      icon: 'search',
      uri: '/',
    },
    {
      name: 'Terjemahan Favorit',
      icon: 'favorite_outlined',
      uri: '/favorite',
    }
  ];

  @Input() drawer;
  constructor(
    @Inject('Constants') public Constants,
  ) { }

  ngOnInit() {
  }

  handleClose() {
    this.drawer.toggle();
  }

}
