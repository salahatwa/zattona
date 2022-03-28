import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { Constants } from '../../helpers/constants';
import { AlertService } from '../alert/z-alert.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {

  alert = {
    id: 'subscribe-component-alert'
  }

  emailPattern = Constants.EMAIL_PATTERN;
  subscriberEmail: any = {};

  constructor(private userService: UserService, private alertService: AlertService) { }

  ngOnInit(): void {
  }

  emailError: any = "";
  addSubscribe(form: NgForm, email) {
    if (form.invalid) {
      return;
    }

    this.alertService.success("Thanks for your subscribtion",this.alert)
    // this.userService.subscribe(email).subscribe((response) => {
    //   console.log(response);
    // });
  }


  displayCssFor(field: NgModel, isField?: boolean) {
    return (field.invalid && (field.touched || field.dirty)&&!field.pristine) ? (isField ? (!field.pristine ? 'has-danger' : '') : (!field.pristine ? 'is-invalid' : '')) : (isField ? (!field.pristine ? 'has-success' : '') : (!field.pristine ? 'is-valid' : ''));
  }




}
