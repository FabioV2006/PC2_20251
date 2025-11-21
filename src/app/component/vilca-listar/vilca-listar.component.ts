import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ClimaService } from '../../service/clima.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIcon, MatIconModule } from '@angular/material/icon';

// 1. IMPORTAR MatDialog y MatDialogModule
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// 2. IMPORTAR tu componente de confirmación (ajusta la ruta según donde lo creaste)
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-vilca-listar',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule, // Es mejor usar MatIconModule que solo MatIcon
    MatDialogModule // 3. AGREGAR MatDialogModule a los imports
  ],
  templateUrl: './vilca-listar.component.html',
  styleUrl: './vilca-listar.component.css'
})
export class VilcaListarComponent implements OnInit {
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private climaService: ClimaService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.climaService.listarClima().subscribe({
      next: (climas) => {
        this.dataSource.data = climas;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error("error al cargar los climas", err);
      }
    });
  }

  eliminar(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.climaService.eliminarClima(id).subscribe(() => {
          this.cargarDatos(); // Refrescar lista
          this.snackBar.open('Se eliminó correctamente', 'Cerrar', { duration: 3000 });
        });
      }
    });
  }

  editar(id: number) {
    this.router.navigate(['/editar/'+id]);
  }
}
