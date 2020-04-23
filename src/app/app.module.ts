import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ComponentsLayoutComponent } from './components-layout/components-layout.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from './shared/material.module';
import { PreviewComponent } from './preview/preview.component';
import {ComponentsStorageService} from './shared/services/components-storage.service';
import {CustomComponentModule} from './shared/custom-component.module';
import {ComponentsTreeComponent} from './components-tree/components-tree.component';
import {HttpClientModule} from '@angular/common/http';
import {CdkTreeModule} from '@angular/cdk/tree';
import {TreeBranchComponent} from './components-tree/tree-branch.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ComponentsLayoutComponent,
    PreviewComponent,
    ComponentsTreeComponent,
    TreeBranchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule,
    MaterialModule,
    CustomComponentModule,
    HttpClientModule,
    CdkTreeModule,
  ],
  providers: [
    ComponentsStorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
