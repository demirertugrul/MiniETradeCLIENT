import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { FileUploadOptions } from 'src/app/contracts/file-upload-options';
import { ProductCreate } from 'src/app/contracts/product/product-create';
import {
  AlertifyMessagePosition,
  AlertifyMessageType,
} from 'src/app/contracts/serviceOptions/alertify';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private alertify: AlertifyService,
    spinner: NgxSpinnerService
  ) {
    super(spinner);
  }

  ngOnInit(): void {}
  @Output() createdProduct: EventEmitter<ProductCreate> = new EventEmitter();
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    controller: 'products',
    action: 'upload',
    explanation: 'Seç veya sürükle...',
    isAdmin: true,
    accept: '.png,.jpg,.jpeg,.json',
  };

  create(
    name: HTMLInputElement,
    stock: HTMLInputElement,
    price: HTMLInputElement
  ) {
    this.spinnerShow(SpinnerType.BallAtom);
    const productCreate: ProductCreate = new ProductCreate();
    productCreate.name = name.value;
    productCreate.stock = parseInt(stock.value);
    productCreate.price = parseFloat(price.value);

    this.productService.create(
      productCreate,
      () => {
        this.spinnerHideManuel(SpinnerType.BallAtom);
        this.alertify.message('Succesfully added.', {
          dismissOthers: true,
          messageType: AlertifyMessageType.Success,
          messagePosition: AlertifyMessagePosition.BottomCenter,
        });
        this.createdProduct.emit(productCreate);
      },
      (errorMessage: string) => {
        this.spinnerHideManuel(SpinnerType.BallAtom);
        this.alertify.message(errorMessage, {
          dismissOthers: true,
          messagePosition: AlertifyMessagePosition.TopRight,
          messageType: AlertifyMessageType.Error,
        });
      }
    );
  }
}
