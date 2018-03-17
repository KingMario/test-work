import { HttpClientModule } from '@angular/common/http';
import { TestComponent } from './name-form/test.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NameFormComponent } from './name-form/name-form.component';
import { NameService } from './name.service';

export const ROUTES: Routes = [
  {path: 'test', component: TestComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    NameFormComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [NameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
