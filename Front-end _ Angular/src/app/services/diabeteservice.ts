import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DiabetesInput {
  Pregnancies: number;
  Glucose: number;
  BloodPressure: number;
  SkinThickness: number;
  Insulin: number;
  BMI: number;
  DiabetesPedigreeFunction: number;
  Age: number;
}

export interface PredictionResult {
  prediction: string;
  risk_level: string;
  probabilities: {
    non_diabetic: number;
    diabetic: number;
  };
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Diabeteservice {

  private baseUrl = "http://localhost:5000"
  private apiUrl = 'http://localhost:5000/predict';

  private apiUrl1 = 'http://localhost:5000/api/time';

  constructor(private http: HttpClient) {}

  predict(input: DiabetesInput): Observable<PredictionResult> {
    return this.http.post<PredictionResult>(this.apiUrl, input);
  }

  getServerTime() {
    return this.http.get(`${this.baseUrl}/api/time`);
  }

}
