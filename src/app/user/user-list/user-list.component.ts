import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { shareReplay } from 'rxjs';
import { DataShareService } from 'src/app/data-share.service';
import { User } from 'src/app/user.interface';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent {
  edit = false;
  displayedColumns: string[] = ['select', 'position', 'name', 'last', 'email', 'address', 'mobileNumber', 'actions', 'id'];
  dataSource!: MatTableDataSource<any>;
  purchseReceiptItems: any;
  users: any[] = [];
  selection = new SelectionModel<Element>(true, []);


  TableForm!: FormGroup
  constructor(private dataService: DataShareService, private fb: FormBuilder) {

  }


  ngOnInit() {
    this.TableForm = this.fb.group({
      TableFormItem: this.fb.array([]),
    });

    this.dataSource = new MatTableDataSource();

    this.loadUsers();

  }
  loadUsers(): void {
    this.dataService.getUsers().subscribe(users => {
      this.users = users;
      this.dataSource.data = this.users;
      this.initializePurchaseReceiptDetailFormControls(this.users);
    });
  }



  onEdit(index: number): void {
    const data = this.dataSource.data;
    data[index].isEditing = true;
    this.dataSource.data = [...data];
  }

  onCancelEdit(index: number): void {
    const data = this.dataSource.data;
    data[index].isEditing = false;
    this.dataSource.data = [...data];
  }

  onSave(index: number): void {
    const data = this.dataSource.data;
    const editedItem = data[index];

    // Implement your save logic here
    data[index].isEditing = false;
    this.dataSource.data = [...data];
    this.dataService.updateUser(editedItem)
  }

  onDelete(index: number): void {
    const data = this.dataSource.data;
    const deletedUserId = data[index].id;

    // Call the delete method in your service
    this.dataService.deleteUser(deletedUserId);

    // Remove the deleted user from the MatTableDataSource
    data.splice(index, 1);
    this.dataSource.data = [...data];
  }
  getSerialNumber(index: number): number {
    return index + 1;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  

  initializePurchaseReceiptDetailFormControls(data: any) {

    console.log(data, "kkk ")
    for (let i = 0; i < data.length; i++) {

      var controlGroup = this.fb.group({
        firstName: [data[i].firstName],
        lastName: [data[i].lastName],
        address: [data[i].address],
        email: [data[i].email],
        mobileNumber: [data[i].mobileNumber],
        id: [data[i].id],

      });
      this.TableDetailControls.push(controlGroup);
      // (this.ReceiptForm.get('PurchaseDetailControls') as FormArray).push(controlGroup);

    }
    this.dataSource = new MatTableDataSource(this.TableDetailControls.controls);

    console.log('my data', this.dataSource.data);




  }



  get TableDetailControls() {
    return (this.TableForm?.get('TableFormItem') as FormArray);
  }






}
