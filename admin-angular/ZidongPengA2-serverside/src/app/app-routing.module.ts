import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InsertFundraiserComponent } from './insert-fundraiser/insert-fundraiser.component';
import { UpdateFundraiserComponent } from './update-fundraiser/update-fundraiser.component';

/**
 * Setup our routes to the different pages. Each route connects to a different component
 * URL: http://localhost:4200/ -> goes to Home page
 * URL: http://localhost:4200/insert-fundraiser -> goes to insert fundraiser page
 * URL: http://localhost:4200/update-fundraiser -> goes to update fundraiser page
 */
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'insert-fundraiser', component: InsertFundraiserComponent },
  { path: 'update-fundraiser', component: UpdateFundraiserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
