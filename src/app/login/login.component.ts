import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authService'





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  
  constructor(
    
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder:FormBuilder,
    
    ) 
    {
      if (this.authenticationService.loggedIn=="true") { 
        this.router.navigate(['vehicles']);
      }
      this.createForm();
    }

  ngOnInit(): void {
  }
  hide = true;

  Submit(username, password){
    this.authenticationService.login(username,password)
    //location.reload()
  }

  createForm(){
    this.angForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required,]]
    });
  }
}
