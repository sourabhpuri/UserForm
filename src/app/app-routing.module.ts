import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserUpsertComponent } from './user/user-upsert/user-upsert.component';
import { UserListComponent } from './user/user-list/user-list.component';

const routes: Routes = [{path:'user-upsert',component:UserUpsertComponent},
{path:'user-list',component:UserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
