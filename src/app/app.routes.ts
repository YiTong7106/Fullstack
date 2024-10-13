import { Routes } from '@angular/router';
import { AddDriverComponent } from './components/add-driver/add-driver.component';
import { ListDriversComponent } from './components/list-drivers/list-drivers.component';
import { UpdateDriverComponent } from './components/update-driver/update-driver.component';
import { DeleteDriversComponent } from './components/delete-driver/delete-driver.component';


import { AddPackageComponent } from './components/add-package/add-package.component';
import { ListPackagesComponent } from './components/list-packages/list-packages.component';
import { UpdatePackageComponent } from './components/update-package/update-package.component';
import { DeletePackagesComponent } from './components/delete-package/delete-package.component';

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { InvalidDataComponent } from './components/invalid-data/invalid-data.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { TranslateDescriptionComponent } from './components/translate-description/translate-description.component';
import { TextToSpeechComponent } from './components/text-to-speech/text-to-speech.component';
import { GenerativeAIComponent } from './components/generative-ai/generative-ai.component';
import { AuthGuard } from './guards/auth.guard';
export const routes: Routes = [
  { path: 'add-driver', component: AddDriverComponent,canActivate: [AuthGuard] },
  { path: 'list-drivers', component: ListDriversComponent ,canActivate: [AuthGuard]},
  { path: 'update-driver', component: UpdateDriverComponent ,canActivate: [AuthGuard]},
  { path: 'delete-driver', component: DeleteDriversComponent ,canActivate: [AuthGuard]},

  { path: 'add-package', component: AddPackageComponent ,canActivate: [AuthGuard]},
  { path: 'list-packages', component: ListPackagesComponent ,canActivate: [AuthGuard]},
  { path: 'update-package', component: UpdatePackageComponent ,canActivate: [AuthGuard]},
  { path: 'delete-package', component: DeletePackagesComponent ,canActivate: [AuthGuard]},

  { path: 'generativeAI', component: GenerativeAIComponent ,canActivate: [AuthGuard]},
  { path: 'texttospeechcomponent', component: TextToSpeechComponent,canActivate: [AuthGuard] },
  { path: 'translatedescription', component: TranslateDescriptionComponent ,canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'statistics', component: StatisticsComponent ,canActivate: [AuthGuard]},
  { path: 'invalid-data', component: InvalidDataComponent },
  { path: '**', component: PageNotFoundComponent }
];
