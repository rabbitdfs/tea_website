import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../core/services/product.service";
import {Router} from "@angular/router";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy{
  constructor(private productService: ProductService, private router: Router) {
  }

  private subscription: Subscription | null = null;
  public products: ProductType[] = [];
  loading: boolean = false;


  ngOnInit() {
    this.loading = true
    this.subscription = this.productService.getProducts().pipe(
      tap(() => {
        this.loading = false
      })
    )
      .subscribe({
        next: (data) => {
          console.log(data)
          this.products = data
        },
        error: (error) => {
          console.log(error);
          this.router.navigate([''])
        }
      })
  }


  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

}
