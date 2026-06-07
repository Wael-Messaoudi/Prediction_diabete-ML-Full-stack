import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Diabeteservice } from '../services/diabeteservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-predict',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './predict.html',
  styleUrl: './predict.css',
})
export class Predict {
  form: FormGroup;
  isLoading = false;
  errorMessage = '';


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private diabetesService: Diabeteservice
  ) {
    this.form = this.fb.group({
      Pregnancies: [0, [Validators.min(0), Validators.max(20)]],
      Glucose: [0, [Validators.required, Validators.min(50), Validators.max(250)]],
      BloodPressure: [0, [Validators.min(30), Validators.max(150)]],
      SkinThickness: [0, [Validators.min(0), Validators.max(100)]],
      Insulin: [0, [Validators.min(0), Validators.max(900)]],
      BMI: [0, [Validators.required, Validators.min(10), Validators.max(60)]],
      DiabetesPedigreeFunction: [0, [Validators.required, Validators.min(0), Validators.max(2.5)]],
      Age: [0, [Validators.required, Validators.min(15), Validators.max(100)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.diabetesService.predict(this.form.value).subscribe({
        next: (result) => {
          console.log('Résultat reçu:', result);
          this.isLoading = false;
          const currentTime = new Date().getTime();

          this.router.navigate(['/result'], {
            state: {
              result: result,
              timestamp: currentTime
            }
          });
        },
        error: (error) => {
          console.error('Erreur API:', error);
          this.isLoading = false;
          this.errorMessage = "Erreur : vérifiez que l'API Flask est lancée sur le port 5000.";
        }
      });
    }
  }
}
