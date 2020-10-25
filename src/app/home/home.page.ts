import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
selector: 'app-home',
templateUrl: 'home.page.html',
styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

validations_form: FormGroup;
validation_messages = {
  'dni': [
  { type: 'required', message: 'dni is required.' },
  { type: 'minlength', message: 'tiene que tener 9 caracteres' },
  { type: 'maxlength', message: 'Has superado el límite de 9 caracteres' },
  { type: 'pattern', message: 'El dni se compone de 8 numeros y una letra.' }
  ],
  'iban': [
    { type: 'required', message: 'Debes rellenar este campo'},
    { type: 'minlength', message: 'tiene que tener 24 caracteres' },
    { type: 'maxlength', message: 'Has superado el límite de 24 caracteres' },
    { type: 'pattern', message: 'Has introducido mal el ISBN' }
  ]
  }
  
constructor(
public formBuilder: FormBuilder,
private navCtrl: NavController,
) { }

ngOnInit() {
  
this.validations_form = this.formBuilder.group({
dni: new FormControl('', Validators.compose([
Validators.maxLength(9),
Validators.minLength(9),
Validators.pattern('[0-9]{8}[A-Za-z]{1}'),
Validators.required
])),
iban: new FormControl('', Validators.compose([
  Validators.maxLength(24),
  Validators.minLength(24),
  Validators.pattern('[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}'),
  Validators.required
]))
});
}
onSubmit(values){
  console.log(values);
  let navigationExtras: NavigationExtras = {
  queryParams: {
  user: JSON.stringify(values)
  }
  };
  this.navCtrl.navigateForward('/user', navigationExtras);
  }
}