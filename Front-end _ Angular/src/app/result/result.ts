import { Component, OnInit } from '@angular/core';
import { PredictionResult } from '../services/diabeteservice';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result',
  imports: [CommonModule],
  templateUrl: './result.html',
  styleUrl: './result.css',
})
export class Result implements OnInit{
  result: PredictionResult | null=null;

  clientTime: Date | null = null;

  constructor(private router: Router ,) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    //const state = nav?.extras.state as { result: PredictionResult } | null;
    const stat = history.state ;
    console.log("hahahaa")
    
    this.result = stat.result || null;
    console.log(this.result)
    this.clientTime = stat.timestamp;
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
