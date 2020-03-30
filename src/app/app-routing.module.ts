import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainGridComponent } from './components/main-grid/main-grid.component';


const routes: Routes = [
 // {path:"", redirectTo: "/home", pathMatch: 'full'},
 // {path:"home", component: MainGridComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
