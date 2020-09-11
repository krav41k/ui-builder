import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkTreeModule} from '@angular/cdk/tree';


import {ComponentsStorageService} from './shared/services/components-storage.service';
import {TreeControlService} from './shared/services/tree-control.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ComponentsLayoutComponent } from './components-layout/components-layout.component';
import { CanvasComponent } from './canvas/canvas.component';
import {ComponentsTreeComponent} from './components-tree/components-tree.component';
import {TreeBranchComponent} from './components-tree/tree-branch.component';
import { ComponentManagerComponent } from './component-manager/component-manager.component';
import {MaterialModule} from './shared/material.module';
import {CustomComponentModule} from './shared/custom-component.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ComponentsLayoutComponent,
    CanvasComponent,
    ComponentsTreeComponent,
    TreeBranchComponent,
    ComponentManagerComponent,
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
    TreeControlService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
