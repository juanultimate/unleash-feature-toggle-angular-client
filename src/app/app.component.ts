import { Component, VERSION } from '@angular/core';
import { take } from 'rxjs/operators';
import { FeatureFlagService } from './feature-flag/feature-flag.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  constructor(private readonly featureFlagService: FeatureFlagService) {

    this.featureFlagService
      .isEnabled('library')
      .subscribe((val) => console.log(val));
  }
}
