import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
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

  constructor(private route: ActivatedRoute, private servProduct: ProductService) {
    this.product = <IProduct>{};
    this.errors = new Array<{ type: string, field: string }>();
  }

  async ngOnInit(): Promise<void> {
    let id: string | null = this.route.snapshot.paramMap.get("id");
    if (id != null) this.product = await this.servProduct.get("ENTTEST", id)
  }

  async onSave(productForm: NgForm) {
    /*let self = this;
    self.errors = new Array<{ type: string, field: string }>();
    if (customerForm.form.status == "VALID") {
      await this.servCustomer.update(this.customer);
    }
    else {
      let _errors: { [key: string]: AbstractControl } = customerForm.form.controls;
      Object.keys(_errors).forEach(function (value) {
        var current = _errors[value];
        if (current.status == "INVALID" && current.errors != null) {
          Object.keys(current.errors).forEach(function (error) {
            self.errors.push({ type: error, field: value });
          });
        }
      });
    }*/
  }

}
