import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ClimaService} from '../../service/clima.service';

@Component({
  selector: 'app-vilca-crear',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    MatSnackBarModule,

  ],

  templateUrl: './vilca-crear.component.html',
  styleUrl: './vilca-crear.component.css'
})
export class VilcaCrearComponent {
  climaForm: FormGroup;
  condicionclima= ['Soleado', 'Nublado', 'Lluvia', 'Tormenta','Nieve'];

  constructor(
    private fb: FormBuilder,
    private climaService: ClimaService,
    private snackBar: MatSnackBar
  ) {
    this.climaForm = this.fb.group({
      condicion:['', Validators.required],
      ubicacion:['', Validators.required],
      hora:['', Validators.required],
      fecha:['', Validators.required],
      temperatura:[0],
      humedad:[0]
    })
  }
  registrarClima(): void{
    if(this.climaForm.valid){
      this.climaService.registrarClima(this.climaForm.value).subscribe(
        {
          next: (clima) =>{
            this.snackBar.open("Clima resgistrado con exito",'Cerrar',{ duration: 3000});
            this.climaForm.reset();
          }
        }
      )
    }
  }
}
