import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../core/services/product.service";
import {Subject, Subscription, take, takeUntil} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomValidator} from "../../shared/custom-validator";


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit, OnDestroy {
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private fb: FormBuilder) {
  }

  public completeOrder: boolean = false;
  public orderError: boolean = false;
  private $onDestroy = new Subject<void>;


  formValues = this.fb.group({
    name: ['', [Validators.required, CustomValidator.nameValidator]],
    lastname: ['', [Validators.required, CustomValidator.nameValidator]],
    phone: ['', [Validators.required, CustomValidator.phoneValidator]],
    productTitle: [''],
    comment: [''],
    country: ['', Validators.required],
    zip: ['', [Validators.required, CustomValidator.zipValidator]],
    address: ['', [Validators.required, CustomValidator.addressValidator]]
  })


  ngOnInit() {
    this.formValues.get('productTitle')?.disable();
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.$onDestroy))
      .subscribe((params) => {
        if (params['product']) {
          this.formValues.patchValue({
            productTitle: params['product']
          });
        }
      })
  }

  ngOnDestroy() {
    this.$onDestroy.next()
    this.$onDestroy.complete();
  }

  public createOrder() {
    this.formValues.get('productTitle')?.enable();

    if (this.formValues.invalid) {
      this.formValues.get('productTitle')?.disable();
      this.markFormGroupAsTouched(this.formValues);
      alert('Заполните все обязательные поля, помеченные красным цветом');
      return;
    }

    const formValues = this.formValues.value

    const orderData = {
      name: formValues.name!,
      last_name: formValues.lastname!,
      phone: formValues.phone!,
      country: formValues.country!,
      zip: formValues.zip!,
      product: formValues.productTitle!,
      address: formValues.address!,
      comment: formValues.comment || null
    }


    this.productService.createOrder(orderData)
      .pipe(takeUntil(this.$onDestroy))
      .subscribe(response => {
        if (response.success && !response.error) {
          this.completeOrder = true;

          this.formValues.reset();
        } else {
          this.orderError = true;
        }
      })
  }

  private markFormGroupAsTouched(formGroup: FormGroup)
  {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupAsTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}

