import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ProductList } from 'src/app/contracts/product/product-list';
import { AlertifyMessagePosition, AlertifyMessageType } from 'src/app/contracts/serviceOptions/alertify';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    private productService: ProductService,
    spinner: NgxSpinnerService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = [
    'name',
    'stock',
    'price',
    'createdDate',
    'updatedDate',
    'photos',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<ProductList> =
    new MatTableDataSource<ProductList>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    await this.getProducts();
  }

  async getProducts() {
    this.spinnerShow(SpinnerType.BallScaleRippleMultiple);
    const allProducts: { totalProductCount: number; products: ProductList[] } =
      await this.productService.read(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5,
        () => this.spinnerHideManuel(SpinnerType.BallScaleRippleMultiple),
        (errorMessage) =>
          this.alertify.message(errorMessage, {
            messagePosition: AlertifyMessagePosition.TopRight,
            messageType: AlertifyMessageType.Error,
            dismissOthers: true,
          })
      );
    this.dataSource = new MatTableDataSource<ProductList>(
      allProducts.products
    );
    // debugger;
    this.paginator.length = allProducts.totalProductCount;
  }

  async pageChanged() { 
    await this.getProducts();
  }
}
