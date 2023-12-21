//Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Project's
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

//Materail Modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SelectProductImageDialogComponent } from './select-product-image-dialog/select-product-image-dialog.component';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [DeleteDialogComponent, SelectProductImageDialogComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule,FileUploadModule,MatCardModule],
})
export class DialogModule {} 
