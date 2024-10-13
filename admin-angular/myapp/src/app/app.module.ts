import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// HTTP client module for API communication
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// API Service
import { DataService } from './data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { InsertFundraiserComponent } from './insert-fundraiser/insert-fundraiser.component';
import { UpdateFundraiserComponent } from './update-fundraiser/update-fundraiser.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InsertFundraiserComponent,
    UpdateFundraiserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
