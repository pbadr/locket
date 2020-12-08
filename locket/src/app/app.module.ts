// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { LocketComponent } from './locket/locket.component';
import { UploadComponent } from './upload/upload.component';

// Services / Providers
import { LocketService } from './services/locket.service';
import { HttpProcessingService } from './services/http-processing.service';

import { serverURL } from './util/serverURL';
import { TextsComponent } from './texts/texts.component';
import { TextComponent } from './text/text.component';
import { DateComponent } from './date/date.component';

@NgModule({
  declarations: [
    AppComponent,
    LocketComponent,
    UploadComponent,
    TextsComponent,
    TextComponent,
    DateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
