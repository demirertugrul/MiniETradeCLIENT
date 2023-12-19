import { HttpErrorResponse } from '@angular/common/http';
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteState } from 'src/app/contracts/dialogs';
import {
  AlertifyMessagePosition,
  AlertifyMessageType,
} from 'src/app/contracts/serviceOptions/alertify';
import { DeleteDialogComponent } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { DialogServiceService } from 'src/app/services/common/dialog-service.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

declare var $: any;

@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService: AlertifyService,
    private dialogService: DialogServiceService
  ) {
    const createdElement = _renderer.createElement('i');
    createdElement.setAttribute('class', 'fa fa-trash');
    _renderer.appendChild(element.nativeElement, createdElement);
    _renderer.setStyle(createdElement,"cursor", "pointer");
    //Worked
    //   $(createdElement).mouseover(function(){
    //     $(this).css('color', 'red');
    //     console.log("in");
    // });
    // $(createdElement).mouseout(function(){
    //   $(this).css('color', '#212121');
    //   console.log("out");
    //   });
    //Worked
    //Worked
    $(createdElement).on("mouseover", function() {
      $(this).css("color", "red");
    });
        
    $(createdElement).on("mouseout", function() {
      $(this).css("color", "#212121");
    });
    //Worked
  }
  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener('click')
  async onClick() {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallAtom);
        const sp: HTMLTableCellElement = this.element.nativeElement;
          
        await this.httpClientService
          .delete(
            {
              controller: this.controller,
            },
            this.id
          )
          .subscribe(
            async (data) => {
              await $(sp.parentElement).animate(
                {
                  opacitiy: 0,
                  left: '+=50',
                  height: 'toggle',
                },
                700,
                () => {
                  this.callback.emit();
                  this.alertifyService.message('Ürün başarıyla silindi!', {
                    messagePosition: AlertifyMessagePosition.TopRight,
                    messageType: AlertifyMessageType.Success,
                    dismissOthers: true,
                  });
                }
              );
            },
            (errorMessage: HttpErrorResponse) => {
              this.spinner.hide(SpinnerType.BallAtom);
              this.alertifyService.message('Ürün Silinemedi!!!', {
                messagePosition: AlertifyMessagePosition.TopCenter,
                messageType: AlertifyMessageType.Error,
                dismissOthers: true,
              });
            }
          );
      },
    });
  }
}
