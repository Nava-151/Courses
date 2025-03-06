import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../../../models/lesson';
import { ActivatedRoute } from '@angular/router';
import { log } from 'node:console';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  courseId!: number;
  private apiUrl = `http://localhost:3000/api/courses/${this.courseId}/lessons`;
  a!: number;
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    console.log("in lessons service");
    this.route.params.subscribe(
      params => {
        console.log(params+"gf");
        this.courseId = +params['courseId']
      }
    )
    console.log(this.courseId+" hh " + this.a);

  }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    console.log(token);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getAllLessons(): Observable<Lesson[]> {
    console.log("t: " + this.getHeaders());
    return this.http.get<Lesson[]>(this.apiUrl, { headers: this.getHeaders() });
  }


  getLessonById(idLesson: number): Observable<Lesson> {
    return this.http.get<Lesson>(`${this.apiUrl}/${idLesson}`, { headers: this.getHeaders() });
  }


  createLesson(lesson: Lesson): Observable<Lesson> {
    return this.http.post<Lesson>(`${this.apiUrl}`, lesson, { headers: this.getHeaders() });
  }


  updateLesson(id: number, Lesson: Partial<Lesson>): Observable<Lesson> {
    return this.http.put<Lesson>(`${this.apiUrl}/${id}`, Lesson, { headers: this.getHeaders() });
  }

  deleteLesson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
