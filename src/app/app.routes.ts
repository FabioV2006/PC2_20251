import { Routes } from '@angular/router';
import {VilcaCrearComponent} from './component/vilca-crear/vilca-crear.component';
import {VilcaListarComponent} from './component/vilca-listar/vilca-listar.component';

export const routes: Routes = [
  {path: '', redirectTo: 'vilca/listar', pathMatch: 'full'},
  {path: 'vilca/listar', component: VilcaListarComponent},
  {path: 'vilca/nuevo', component: VilcaCrearComponent},
];
