import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Predict } from './predict/predict';
import { Result } from './result/result';

export const routes: Routes = [
    {
        path: "home",
        component: Home
    },
    {
        path:"",
        component:Home
    },
    {
        path: "predict",
        component: Predict
    },
    {
        path: "result",
        component: Result
    }
];
