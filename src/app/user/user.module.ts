import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserUpsertComponent } from './user-upsert/user-upsert.component';
import { UserListComponent } from './user-list/user-list.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    UserUpsertComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      timeOut: 10000,
      easing: 'ease-in',
      closeButton: true,
    }),
  ],
  exports: [
    UserUpsertComponent,
    UserListComponent,
  ],

})
export class UserModule { }
