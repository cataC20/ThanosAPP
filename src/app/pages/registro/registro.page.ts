import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registroForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // Inicializar el formulario
    this.registroForm = this.formBuilder.group({
      nombreCompleto: ['', Validators.required],
      rut: ['', [Validators.required, Validators.pattern('^[0-9]+-[0-9Kk]$')]], // Formato RUT
      curso: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(4)]], // Contraseña mínima de 4 caracteres
    });
  }

  ngOnInit() {}

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.registroForm.valid) {
      const datosRegistro = this.registroForm.value;
      console.log('Datos de registro:', datosRegistro);
      // Aquí puedes agregar lógica para manejar el registro (enviar datos a una API, etc.)
    } else {
      console.log('Formulario inválido');
    }
  }
}

