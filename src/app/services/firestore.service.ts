import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDocs, addDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Materia } from '../models/materia.model'; // Asegúrate de que esta ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  // Método para obtener materias
  getSubjects(): Observable<Materia[]> {
    const materiasCollection = collection(this.firestore, 'subjects');
    return from(getDocs(materiasCollection)).pipe(
      map(snapshot => 
        snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Materia))
      )
    );
  }

  // Método para registrar asistencia
  recordAttendance(subjectId: string, attendanceData: any): Promise<void> {
    const attendanceCollection = collection(doc(this.firestore, 'subjects', subjectId), 'attendance');
    return addDoc(attendanceCollection, attendanceData).then(() => {});
  }
}
