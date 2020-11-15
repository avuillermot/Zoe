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
            label: "Recherche client",
            routerLink: "./search/customer"
          },
          {
            label: "Mise à jour client"
          },
          {
            label: "Suivi client"
          }
        ]
      },
      {
        label: "Articles",
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: "Créer un article",
          },
          {
            label: "Mise à jour article",
          }
        ]
      },
      {
        label: "Devis",
        icon: 'pi pi-fw pi-file',
        items: [
          {
            label: "Créer"
          },
          {
            label: "Suivre",
          }
        ]
      },
      {
        label: "Bon de livraison",
        icon: 'pi pi-fw pi-bookmark',
        items: [
          {
            label: "Créer"
          },
          {
            label: "Suivre",
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
