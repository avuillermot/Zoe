import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: [
    './menu.component.css'
  ]
})
export class MenuComponent implements OnInit {

  items: MenuItem[];

  constructor() {
    this.items = new Array<MenuItem>();
  }

  ngOnInit(): void {
    this.items = [
      {
        label: "Client",
        icon: 'pi pi-fw pi-id-card',
        items: [
          {
            label: "Recherche clients",
            routerLink: "./customer/search",
            icon: 'pi pi-fw pi-search'
          },
          {
            label: "Nouveau client",
            routerLink: "./customer/add",
            icon: 'pi pi-fw pi-plus-circle'
          }
        ]
      },
      {
        label: "Articles",
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: "Recherche articles",
            routerLink: "./product/search",
            icon: 'pi pi-fw pi-search'
          },
          {
            label: "Nouveau article",
            routerLink: "./product/add",
            icon: 'pi pi-fw pi-plus-circle'
          }
        ]
      },
      {
        label: "Devis",
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: "Recherche devis",
            routerLink: "./quote/search",
            icon: 'pi pi-fw pi-search'
          },
          {
            label: "Créer",
            routerLink: "./quote/create",
            icon: 'pi pi-fw pi-plus-circle'
          }
        ]
      },
      {
        label: "Bon de livraison",
        icon: 'pi pi-fw pi-bookmark',
        items: [
          {
            label: "Recherche BL",
            routerLink: "./quote/search",
            icon: 'pi pi-fw pi-search'
          },
          {
            label: "Créer",
            icon: 'pi pi-fw pi-plus-circle'
          }
        ]
      },
      {
        label: "Facturation",
        icon: 'pi pi-fw pi-shopping-cart',
        items: [
          {
            label: "Créer"
          },
          {
            label: "Suivre",
          }
        ]
      }
    ];
  }
}
