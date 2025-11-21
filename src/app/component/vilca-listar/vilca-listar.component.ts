import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {ClimaService} from '../../service/clima.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {elementAt} from 'rxjs';
import {MatIcon, MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-vilca-listar',
  standalone: true,
  imports: [CommonModule, //imports
    MatTableModule,
    MatPaginatorModule, MatIcon,

  ],
  templateUrl: './vilca-listar.component.html',
  styleUrl: './vilca-listar.component.css'
})
export class VilcaListarComponent implements OnInit {
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  snackBar: any;

  constructor(private climaService: ClimaService, private router: Router) {
  }

  ngOnInit(): void {
    this.cargarDatos();
  }
  cargarDatos() {
    this.climaService.listarClima().subscribe(
      {
        next:(climas) => {
          this.dataSource.data = climas;
          this.dataSource.paginator = this.paginator;
        },
        error:(err) =>
        {
          console.error("error al cargar los climas", err)
        }

      })
  }

  eliminar(id: number) {
    this.climaService.eliminarClima(id).subscribe(() => {
      this.cargarDatos(); // Refrescar lista
      this.snackBar.open('Se eliminó correctamente', 'Cerrar', { duration: 3000 });
    });
  }
}
