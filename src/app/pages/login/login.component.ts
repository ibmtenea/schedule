import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, NgModel } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataserviceService } from '../../services/dataservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  angForm: FormGroup;
  datosphp: string;
  mail = '';

  constructor(private fb: FormBuilder, private dataService: DataserviceService, private router: Router) {
    this.angForm = this.fb.group({

      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      password: ['', Validators.required]

    });

    // this.wsService.loginWS( this.mail )
    // .then( () =>{
    //    // this.router.navigateByUrl('/mensajes');
    // });

  }

  ngOnInit() {
    if (localStorage.removeItem('id_persona') != null) {
      const keysToRemove = ["token", "id_persona", "usuario", "id_rol"];
      for (const key of keysToRemove) {
        localStorage.removeItem(key);
      }
      this.router.navigateByUrl('');
    }
  }


  postdata(angForm: FormGroup) {
    var patronEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    var emailResult = patronEmail.test(angForm.value.email);
    if (emailResult == false) {
      Swal.fire({
        text: 'El campo E-mail debe cumplir con el formato adecuado',
        icon: 'error',
        showConfirmButton: true
      });
    } else {

      this.dataService.userlogin(angForm.value.email, angForm.value.password)
        .pipe(first())
        .subscribe(
          data => {
            const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/home';
            this.router.navigate([redirect]);
          },
          error => {
            Swal.fire({
              text: 'El campo E-mail o el password son erróneos. revise los datos.',
              icon: 'error',
              showConfirmButton: true
            });
          });
    }
  }
  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }
}