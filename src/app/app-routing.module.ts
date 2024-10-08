import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddDriverComponent } from './components/add-driver/add-driver.component';
import { ListDriversComponent } from './components/list-drivers/list-drivers.component';
import { DeleteDriverComponent } from './components/delete-driver/delete-driver.component';
import { UpdateDriverComponent } from './components/update-driver/update-driver.component';
import { AddPackageComponent } from './components/add-package/add-package.component';
import { ListPackagesComponent } from './components/list-packages/list-packages.component';
import { DeletePackageComponent } from './components/delete-package/delete-package.component';
import { UpdatePackageComponent } from './components/update-package/update-package.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { InvalidDataComponent } from './components/invalid-data/invalid-data.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AddDriverComponent,
    ListDriversComponent,
    DeleteDriverComponent,
    UpdateDriverComponent,
    AddPackageComponent,
    ListPackagesComponent,
    DeletePackageComponent,
    UpdatePackageComponent,
    StatisticsComponent,
    PageNotFoundComponent,
    InvalidDataComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
