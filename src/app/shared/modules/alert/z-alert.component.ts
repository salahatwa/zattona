import { Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert, AlertType, MsgType } from './z-alert.model';
import { AlertService } from './z-alert.service';

@Component({
  selector: 'z-alert',
  templateUrl: './z-alert.component.html',
  styleUrls: ['./z-alert.component.scss']
})
export class ZAlertComponent implements OnInit {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts: Alert[] = [];
  msgType: typeof MsgType = MsgType;
  alertType: typeof AlertType = AlertType;


  alertSubscription: Subscription;
  routeSubscription: Subscription;

  constructor(private router: Router, private alertService: AlertService) { }

  ngOnInit() {
    // subscribe to new alert notifications
    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(alert => {
        // clear alerts when an empty alert is received
        if (!alert.message) {
          // filter out alerts without 'keepAfterRouteChange' flag
          this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

          // remove 'keepAfterRouteChange' flag on the rest
          this.alerts.forEach(x => delete x.keepAfterRouteChange);
          return;
        }

        // add alert to array
        if (!alert.duplicat) {
          this.alerts = [];
          this.alerts.push(alert);
        } else {
          this.alerts.push(alert);
        }

        // auto close alert if required
        if (alert.autoClose) {
          setTimeout(() => this.removeAlert(alert), 10000);
        }
      });

    // clear alerts on location change
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    });
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    if (this.alertSubscription)
      this.alertSubscription.unsubscribe();
    if (this.routeSubscription)
      this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    // check if already removed to prevent error on auto close
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {
      // fade out alert
      this.alerts.find(x => x === alert).fade = true;

      // remove alert after faded out
      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    } else {
      // remove alert
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }


  cssClass(alert: Alert) {
    if (!alert) return;

    //'alert', 'alert-dismissable'
    const classes = [];

    let msgTypeClass = {
    }


    if (alert.alertType == AlertType.DEFAULT) {
      msgTypeClass = {
        [MsgType.Success]: 'alert alert-success',
        [MsgType.Error]: 'alert alert-danger',
        [MsgType.Info]: 'alert alert-info',
        [MsgType.Warning]: 'alert alert-warning'
      }
    } else {
      msgTypeClass = {
        [MsgType.Success]: 'text-green',
        [MsgType.Error]: 'text-red',
        [MsgType.Info]: 'text-sky-blue',
        [MsgType.Warning]: 'text-sunny-yellow'
      }
    }

    classes.push(msgTypeClass[alert.msgType]);

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }


  iconClass(alert: Alert) {
    if (!alert) return;

    //'alert', 'alert-dismissable'
    const classes = [];

    let msgTypeClass = {
      [MsgType.Success]: 'fa fa-check-circle-o fa-2x',
      [MsgType.Error]: 'fa fa-times-circle-o fa-2x',
      [MsgType.Info]: 'fa fa-info-circle fa-2x',
      [MsgType.Warning]: 'fa fa-bell-o fa-2x'
    }


    classes.push(msgTypeClass[alert.msgType]);


    return classes.join(' ');
  }

}
