import { Component } from '@angular/core';
import { Lesson } from '../../../models/lesson';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../service/lessons.service';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-lesson-form',
  imports: [ReactiveFormsModule,
    FormsModule],
  templateUrl: './lesson-form.component.html',
  styleUrl: './lesson-form.component.css'
})
export class LessonFormComponent {
  lessonId: number = 0;
  s!: string
  lesson!: Lesson
  constructor(private lessonService: LessonService, private router: ActivatedRoute, private lesssonService: LessonService) {

    this.router.params.subscribe(params => {
      this.lessonId = +params['id'];
      if (this.lessonId > 0) {
        console.log(this.lessonId);
        lessonService.getLessonById(this.lessonId).subscribe((data: Lesson) => {
          this.lesson = data
          this.populateForm({ title: this.lesson.title, content: this.lesson.content });

        });
      }
    });



  }
  closeModal() {
    throw new Error('Method not implemented.');
  }
  onSubmit() {
    if (this.lessonId > 0) {
      this.lesssonService.updateLesson(this.lessonId, this.lessonForm.value).subscribe(data => console.log(data));
    }
    else {
      this.lesssonService.createLesson(this.lessonForm.value).subscribe(data => console.log(data));
    }
  }

  lessonForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    content: new FormControl('')
  });


  populateForm(data: any) {
    Object.keys(data).forEach(key => {
      if (this.lessonForm.controls[key]) {
        this.lessonForm.controls[key].setValue(data[key]);
      }
    });
  }
}
