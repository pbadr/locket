// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LocketComponent } from './locket/locket.component';
import { UploadComponent } from './upload/upload.component';

// Services / Providers
import { LocketService } from './services/locket.service';
import { HttpProcessingService } from './services/http-processing.service';

import { serverURL } from './util/serverURL';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LocketComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    LocketService,
    HttpProcessingService,
    {
      provide: 'ServerURL', useValue: serverURL,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
