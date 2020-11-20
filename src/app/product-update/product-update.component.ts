import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { IProduct } from '../_services/product/product.model';
import { ProductService } from '../_services/product/product.service';
import { NgForm, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: IProduct;
  errors: { type: string, field: string }[];
  updateOrAddMode: string = "";
  blocked: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private servProduct: ProductService ) {
    this.product = <IProduct>{};
    this.errors = new Array<{ type: string, field: string }>();
  }

  async ngOnInit(): Promise<void> {
    let id: string | null = this.route.snapshot.paramMap.get("id");
    this.updateOrAddMode = ((id == null || id == undefined) ? "ADD" : "UPDATE");
    if (id != null) this.product = await this.servProduct.get(id);
  }

  async onSave(productForm: NgForm) {
    let self = this;
    
    self.errors = new Array<{ type: string, field: string }>();
    if (productForm.form.status == "VALID") {
      if (this.updateOrAddMode == "UPDATE") await this.servProduct.update(this.product);
      else {
        this.blocked = true;
        let back: IProduct = <IProduct>await this.servProduct.create(this.product);
        this.router.navigate(['product/update/' + back._id]);
      }
    }
    else {
      let _errors: { [key: string]: AbstractControl } = productForm.form.controls;
      Object.keys(_errors).forEach(function (value) {
        var current = _errors[value];
        if (current.status == "INVALID" && current.errors != null) {
          Object.keys(current.errors).forEach(function (error) {
            self.errors.push({ type: error, field: value });
          });
        }
      });
    }
  }

}
