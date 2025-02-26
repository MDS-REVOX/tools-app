import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CBotMainComponent } from './copybot/main/main.component';
import { AccessGuard } from './AccessGuard';

export const routes: Routes = [
    { path: "", component: LoginComponent }
    ,{path: "cbot", component: CBotMainComponent, canActivate: [AccessGuard]}
];
//, canActivate: [AccessGuard]
