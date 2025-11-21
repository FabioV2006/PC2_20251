import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';// Agrega OnInit
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
import { ActivatedRoute, Router } from '@angular/router'; // Importar Router y ActivatedRoute


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
export class VilcaCrearComponent implements OnInit {
  climaForm: FormGroup;
  condicionclima = ['Soleado', 'Nublado', 'Lluvia', 'Tormenta', 'Nieve'];
  id: number = 0; // Variable para guardar el ID si estamos editando
  edicion: boolean = false; // Bandera para saber si es edición

  constructor(
    private fb: FormBuilder,
    private climaService: ClimaService,
    private snackBar: MatSnackBar,
    private router: Router,        // Inyectar Router
    private route: ActivatedRoute  // Inyectar ActivatedRoute
  ) {
    this.climaForm = this.fb.group({
      idWeather: [0], // Es bueno incluir el ID en el form aunque esté oculto
      conditionWeather: ['', Validators.required],
      ubicationWeather: ['', Validators.required],
      timeWeather: ['', Validators.required],
      dateWeather: ['', Validators.required],
      temperatureWeather: [0],
      humidityWeather: [0]
    });
  }

  ngOnInit(): void {
    // Verificar si hay un ID en la URL
    this.route.params.subscribe((data) => {
      this.id = data['id'];
      if (this.id != null) {
        this.edicion = true;
        this.init();
      }
    });
  }

  init() {
    // Traer los datos del backend y ponerlos en el formulario
    this.climaService.listarId(this.id).subscribe((data) => {
      this.climaForm.patchValue({
        idWeather: data.idWeather,
        conditionWeather: data.conditionWeather,
        ubicationWeather: data.ubicationWeather,
        timeWeather: data.timeWeather,
        dateWeather: data.dateWeather,
        temperatureWeather: data.temperatureWeather,
        humidityWeather: data.humidityWeather
      });
    });
  }

  registrarClima(): void {
    if (this.climaForm.valid) {
      if (this.edicion) {
        // Lógica de ACTUALIZAR
        // Aseguramos que el objeto a enviar tenga el ID correcto
        const climaActualizado = { ...this.climaForm.value, idWeather: this.id };

        this.climaService.actualizarClima(this.id, climaActualizado).subscribe(() => {
          this.snackBar.open("Clima actualizado con éxito", 'Cerrar', { duration: 3000 });
          this.router.navigate(['/vilca/listar']);
        });
      } else {
        // Lógica de REGISTRAR (la que ya tenías)
        this.climaService.registrarClima(this.climaForm.value).subscribe(() => {
          this.snackBar.open("Clima registrado con éxito", 'Cerrar', { duration: 3000 });
          this.climaForm.reset();
          this.router.navigate(['/vilca/listar']); // Opcional: volver a la lista
        });
      }
    }
  }
}
// export class VilcaCrearComponent {
//   climaForm: FormGroup;
//   condicionclima = ['Soleado', 'Nublado', 'Lluvia', 'Tormenta','Nieve'];
//
//   constructor(
//     private fb: FormBuilder,
//     private climaService: ClimaService,
//     private snackBar: MatSnackBar
//   ) {
//     this.climaForm = this.fb.group({
//       conditionWeather: ['', Validators.required],
//       ubicationWeather: ['', Validators.required],
//       timeWeather: ['', Validators.required],
//       dateWeather: ['', Validators.required],
//       temperatureWeather: [0],
//       humidityWeather: [0]
//     });
//   }
//
//   registrarClima(): void {
//     if (this.climaForm.valid) {
//       this.climaService.registrarClima(this.climaForm.value).subscribe({
//         next: (clima) => {
//           this.snackBar.open("Clima resgistrado con exito", 'Cerrar', { duration: 3000 });
//           this.climaForm.reset();
//         }
//       });
//     }
//   }
// }
