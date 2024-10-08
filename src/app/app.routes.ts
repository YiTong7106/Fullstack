import { Routes } from '@angular/router';
import { ListDriversComponent } from './components/list-drivers/list-drivers.component';
import { AddDriverComponent } from './components/add-driver/add-driver.component';
import { DeleteDriverComponent } from './components/delete-driver/delete-driver.component';
import { UpdateDriverComponent } from './components/update-driver/update-driver.component';
import { AddPackageComponent } from './components/add-package/add-package.component';
import { ListPackagesComponent } from './components/list-packages/list-packages.component';
import { DeletePackageComponent } from './components/delete-package/delete-package.component';
import { UpdatePackageComponent } from './components/update-package/update-package.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { InvalidDataComponent } from './components/invalid-data/invalid-data.component';


export const routes: Routes = [
  { path: '', redirectTo: '/list-drivers', pathMatch: 'full' },
  { path: 'list-drivers', component: ListDriversComponent },
  { path: 'add-driver', component: AddDriverComponent },
  { path: 'delete-driver', component: DeleteDriverComponent },
  { path: 'update-driver', component: UpdateDriverComponent },
  { path: 'add-package', component: AddPackageComponent },
  { path: 'list-packages', component: ListPackagesComponent },
  { path: 'delete-package', component: DeletePackageComponent },
  { path: 'update-package', component: UpdatePackageComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'invalid-data', component: InvalidDataComponent },
  { path: '**', component: PageNotFoundComponent }
];
