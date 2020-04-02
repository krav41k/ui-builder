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
import { ComponentsTreeComponent } from './components-tree/components-tree.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ComponentsLayoutComponent,
    PreviewComponent,
    ComponentsTreeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule,
    MaterialModule,
    CustomComponentModule
  ],
  providers: [
    ComponentsStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
