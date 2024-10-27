import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Materia {
  id?: string;
  nombre: string;
  hora: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuario: string = ''; // Inicializar el usuario como vacío
  materias$: Observable<Materia[]>;

  constructor(private router: Router, private firestoreService: FirestoreService) {
    this.materias$ = this.firestoreService.getSubjects(); // Cargar materias desde Firestore

    // Comprobar si hay datos pasados a través de la navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.usuario = navigation.extras.state['user']; // Obtener el nombre de usuario
      if (navigation?.extras.state) {
        this.usuario = navigation.extras.state['user'];
        console.log('Usuario recibido:', this.usuario); // Añadir esta línea para verificar
      }
      
    }
  }

  // Método para obtener la materia según la hora actual
  obtenerMateriaActual(materias: Materia[]): Materia | null {
    const horaActual = this.obtenerHoraActual();
    return materias.find(materia => materia.hora === horaActual) || null;
  }

  // Método para obtener la hora actual en formato 'HH:mm'
  obtenerHoraActual(): string {
    const now = new Date();
    const horas = String(now.getHours()).padStart(2, '0');
    const minutos = String(now.getMinutes()).padStart(2, '0');
    return `${horas}:${minutos}`;
  }

  // Método para escanear un código QR y registrar la asistencia
  escanearQR() {
    this.materias$.subscribe(materias => {
      const materiaActual = this.obtenerMateriaActual(materias);
      if (materiaActual && materiaActual.hora) {
        const attendanceData = {
          usuario: this.usuario,
          hora: this.obtenerHoraActual(),
          fecha: new Date()
        };

        if (materiaActual.id) {
          this.firestoreService.recordAttendance(materiaActual.id, attendanceData)
            .then(() => {
              console.log(`Asistencia registrada para la materia: ${materiaActual.nombre}`);
              this.router.navigate(['/asistencia']);
            })
            .catch(error => {
              console.error('Error al registrar la asistencia:', error);
            });
        } else {
          console.log('ID de materia no disponible.');
        }
      } else {
        console.log('No hay materias en este horario.');
      }
    });
  }
}
