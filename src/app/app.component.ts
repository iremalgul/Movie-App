import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService : AuthService){
    console.log(environment.production)
    console.log(environment.value)
  }
  
  ngOnInit(): void {
    this.authService.autoLogin()
  }
  title = 'movieapp';
}
