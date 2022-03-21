import { Component, OnInit } from '@angular/core';
import { GitConfig } from './login.const';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  githubUrl: string = 'https://github.com/login/oauth/authorize?client_id=' + GitConfig.client_id + '&scope=public_repo,user,delete_repo&redirect_uri=' + GitConfig.redirect_uri;

  ngOnInit() {
  }

  onNavigate(){
    window.open(this.githubUrl, "_self");
}
}
