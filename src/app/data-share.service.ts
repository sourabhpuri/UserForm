import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.interface';
import { SelectionModel } from '@angular/cdk/collections';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  private users: User[] = [];


 


  private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users);
  public users$: Observable<User[]> = this.usersSubject.asObservable();

  private selectedUser = new BehaviorSubject<User | null>(null);
  userObservable = this.selectedUser.asObservable();

  constructor() {
    // Initialize users array with sample data or fetch from a service
    this.users = [
      { id: 1, firstName: 'John Doe', lastName: 'jo', email: 'john@example.com', mobileNumber: 909, address: 'opi', isEditing: true },
      { id: 2, firstName: 'Jane Doe', lastName: 'ja', email: 'jane@example.com', mobileNumber: 909, address: 'opi', isEditing: true }
      // Add more sample users as needed
    ];

    // Notify observers about the initial state of users
    this.usersSubject.next(this.users);
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  addUser(newUser: User) {
    const userWithId = { ...newUser, id: this.generateUniqueId() };
    this.users.push(userWithId);

    // Notify observers about the updated users
    this.usersSubject.next(this.users);
  }
  addUserUp(newUser: User): string | void {
    const emailExists = this.users.some(user => user.email === newUser.email);

    if (emailExists) {
        // Email already exists, return a message
        return "Email already exists. User not added.";
    }

    // Email does not exist, add the user
    const userWithId = { ...newUser, id: this.generateUniqueId() };
    this.users.push(userWithId);

    // Notify observers about the updated users
    this.usersSubject.next(this.users);

    // Return void (no error) if user added successfully
}



  updateUser(updatedUser: User) {
    const existingUserIndex = this.users.findIndex((u) => u.id === updatedUser.id);

    if (existingUserIndex !== -1) {
      // Update existing user based on ID
      this.users[existingUserIndex] = updatedUser;

      // Notify observers about the updated users
      this.usersSubject.next(this.users);

    }
  }

  deleteUser(userId: number): void {
    console.log('Deleting user with ID:', userId);
  
    // Find the user with the specified ID
    const userToDelete = this.users.find((user) => user.id === userId);
  
    if (userToDelete) {
      // Get the index of the user in the array
      const index = this.users.indexOf(userToDelete);
  
      // Remove the user from the array
      this.users.splice(index, 1);
  
      // Log the updated users array
      console.log('Updated users array:', this.users);
  
      // Notify observers about the updated users
      this.usersSubject.next([...this.users]);
      console.log(this.users,"delete")
    } else {
      console.log('User not found with ID:', userId);
    }
  }
  
  
  

  selectUser(user: User | null) {
    this.selectedUser.next(user);
  }

  generateUniqueId(): number {
    return new Date().getTime();
  }
}
