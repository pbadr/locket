import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LocketComponent } from './locket/locket.component';

import { LocketService } from './services/locket.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LocketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    LocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
