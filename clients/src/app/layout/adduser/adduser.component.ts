import {Component, OnInit} from '@angular/core';
import * as faker from 'faker';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../users/user';
import {UsersService} from '../users/users.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  users: User[] = [];
  singleModel = 0;

  constructor(private userService: UsersService) {
  }

  ngOnInit() {
    this.userService.users$.subscribe(value => {
      this.users = value;
    });
  }

  onSubmit() {
    this.userService.add(this.userForm.value).subscribe(value => {
      this.users.unshift(value);
      this.userService.setUsers(this.users);

      this.userForm.controls['name'].setValue('');
      this.userForm.controls['email'].setValue('');
    }, error1 => {
    });
  }


}
