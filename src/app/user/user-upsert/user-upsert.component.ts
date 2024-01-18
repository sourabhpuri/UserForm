import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { DataShareService } from 'src/app/data-share.service';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.css']
})
export class UserUpsertComponent {
  searchTerm: any
  breadCrumbItems!: Array<{}>;
  submit!: boolean;
  userForm!: FormGroup;
  submitted = false;
  FormValue: any[] = [];
  currentRoute!: string;
  show=false;
  @ViewChild(FormGroupDirective) formRef?: FormGroupDirective;



  constructor(private fb: FormBuilder,
    private dataService:DataShareService,
    private toast:ToastrService,
    private snackBar: MatSnackBar

  ) {
    this.breadCrumbItems = [
      { label: 'Master' },
      { label: 'City Master', active: true }
    ];
  }
  ngOnInit(): void {

  

    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9-_ ']+$")]],
      lastName:['', [Validators.required, Validators.pattern("^[a-zA-Z0-9-_ ']+$")]],
      address:['', [Validators.required, Validators.pattern("^[a-zA-Z0-9-_ ']+$")]],
      email:['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });


 

  }

  get f() { return this.userForm.controls; }


 


  saveCity  () {
 
    
  
  }
  onSubmit() {
    if (this.userForm.valid) {
        const userData = this.userForm.value;
        const result = this.dataService.addUserUp(userData);

        if (typeof result === 'string') {
            this.toast.error(result, 'Error');
        } else {
            this.toast.success('Saved successfully', 'Success');
            this.reload();
        }
    } else {
        this.toast.error('Something wrong with the form', 'Error');
    }
}

   generateUniqueId(): number {
    return new Date().getTime();
  }


  reload() {
    this.formRef?.resetForm();
    this.userForm.reset();

  }


}

