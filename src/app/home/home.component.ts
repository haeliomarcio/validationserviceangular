import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../services/validation.service';
import { NullTemplateVisitor } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data = {
    nome: null,
    email: null,
  };

  validation = {
    nome: 'required|min:5|max:255|name,Nome',
    email: 'required',
  };

  constructor(private serviceValidation: ValidationService) {  }

  validar(){
    try{
      this.serviceValidation.make(this.data, this.validation);
    }catch(e){
      alert(e);
    }
  }

  ngOnInit() {
  }

  

}
