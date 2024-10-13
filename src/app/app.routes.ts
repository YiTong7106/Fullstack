import { Routes } from '@angular/router';
import { AddDriverComponent } from './components/add-driver/add-driver.component';
import { ListDriversComponent } from './components/list-drivers/list-drivers.component';
import { UpdateDriverComponent } from './components/update-driver/update-driver.component';

import { AddPackageComponent } from './components/add-package/add-package.component';
import { ListPackagesComponent } from './components/list-packages/list-packages.component';
import { UpdatePackageComponent } from './components/update-package/update-package.component';

import { StatsComponent } from './components/stats/stats.component';
import { InvalidDataComponent } from './components/invalid-data/invalid-data.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
export const routes: Routes = [
  { path: 'add-driver', component: AddDriverComponent },
  { path: 'list-drivers', component: ListDriversComponent },
  { path: 'update-driver', component: UpdateDriverComponent },

  { path: 'add-package', component: AddPackageComponent },
  { path: 'list-packages', component: ListPackagesComponent },
  { path: 'update-package', component: UpdatePackageComponent },

  { path: 'stats', component: StatsComponent },
  { path: 'invalid-data', component: InvalidDataComponent },
  { path: '**', component: PageNotFoundComponent }
];
