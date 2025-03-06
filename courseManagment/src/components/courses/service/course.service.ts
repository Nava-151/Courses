import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../../models/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/api/courses';
  private token:string=''
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    if (typeof window !== 'undefined') {
      this.token = sessionStorage.getItem('token') || '';
    }
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl, { headers: this.getHeaders() });
  }

addStudentToCourse(courseId:number,userId:number):Observable<void>{
  console.log("joined");
  return this.http.post<void>(`http://localhost:3000/api/courses/${courseId}/enroll`,userId,{ headers: this.getHeaders() });
}
deleteCourseFromStudent(courseId:number,userId:number):Observable<void>{
  const body={userId};
  return this.http.delete<void>(`http://localhost:3000/api/courses/${courseId}/unenroll/`,{ body,headers: this.getHeaders() });
}
  getCourseById(id: number): Observable<Course> {
    console.log("in get course by id");
    
    return this.http.get<Course>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course, { headers: this.getHeaders() });
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course, { headers: this.getHeaders() });
  }

  deleteCourse(id: number): Observable<void> {
    console.log("in delete");
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
