import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeLandingPageComponent } from 'src/app/component/home-landing-page/home-landing-page.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HomePageComponent, HomeLandingPageComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {}
