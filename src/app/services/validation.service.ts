import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  _value: any;
  _data: any;
  _filder: any;

  constructor() { }

  /**
   * Make starts the whole validation process called the functions passed in validation.
   **/
  make(data, validation){
    this._data = data;
    
    Object.keys(validation).map((key, i) => {  
      let rules = validation[key].split('|');
    
      for(let i = 0; i < rules.length; i++){
        
        try{
          if(rules[i].indexOf(":") != -1){
            let rulesParameters = rules[i].split(':');
            let index = `${rulesParameters[0]}`;
            if (typeof this[index] !== "undefined") {
              this._filder = key;
              this._value = this._data[key];
              this[index](rulesParameters[1]);
            }
          } else {
            let index = `${rules[i]}`;
            if (typeof this[index] !== "undefined") {
              this._filder = key;
              this._value = this._data[key];
              this[index]();
            }
          }
        }catch(e){
          this.messageAlert(e);
        }
        

      }
    });
  }

  /**
   * Field Requirement
   **/
  required(){
      if(this._value === null || this._value.trim() === ''){
          throw(`O campo ${this._filder} obrigatório`);
      }
  }

  /**
   * Required minimum field length
   **/
  min(qtde){
    if(this._value.length < qtde){
      throw(`O campo ${this._filder} deve conter no mínimo ` + qtde +` caracteres.`);
    }
  }

  /**
   * Maximum field length requirement
   **/
  max(qtde){
    if(this._value.length > qtde){
      throw(`O campo ${this._filder} deve conter no máximo ` + qtde +` caracteres.`);
    }
  }

  /**
   * Message Alert SweetAlert2
   **/
  messageAlert(msg = null){
    Swal.fire({
      title: 'Oops!',
      text: msg,
      type: 'error',
      confirmButtonText: 'OK'
    });
  }

}
