import { Component } from '@angular/core';
import { LoginComponent } from '../components/connection/login/login.component';
import {  RouterModule, RouterOutlet } from '@angular/router';
import { AllCoursesComponent } from "../components/courses/all-courses/all-courses.component";
@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet, LoginComponent],
    templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
  export class AppComponent {

  title = 'courseManagment';

}
