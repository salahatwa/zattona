import { Component, OnInit } from '@angular/core';
import { GitConfig } from './login.const';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  githubUrl: string = 'https://github.com/login/oauth/authorize?client_id=' + GitConfig.client_id + '&scope=user%20repo%20repo:status%20repo_deployment%20public_repo%20repo:invite%20security_events&redirect_uri=' + GitConfig.redirect_uri;

  ngOnInit() {
  }

}
