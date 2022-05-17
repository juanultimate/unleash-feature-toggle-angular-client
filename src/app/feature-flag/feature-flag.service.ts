import { Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { UnleashClient } from 'unleash-proxy-client';
import { Toggle } from './config';
import { FlagEvent, FlagEvents } from './event';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService {
  private unleash: any = new UnleashClient({
    url: 'https://app.unleash-hosted.com/demo/proxy',
    clientKey: 'proxy-123',
    appName: 'mad-hattr',
  });

  private readonly togglesSubject = new ReplaySubject<Toggle[]>(1);

  private readonly eventSubject = new Subject<FlagEvent>();

  readonly events$ = this.eventSubject.asObservable();

  constructor() {
    this.unleash.updateContext({ userId: '1233' });

    this.unleash.on('ready', () => {
      this.updateToggles();
      this.eventSubject.next(FlagEvents.Ready);
    });

    this.unleash.on('update', () => {
      this.updateToggles();
      this.eventSubject.next(FlagEvents.Update);
    });

    this.unleash.start();
  }

  isEnabled(toggleName: string): Observable<boolean> {
    return this.togglesSubject.asObservable().pipe(
      map(
        (toggles) =>
          toggles.find((toggle) => toggle.name === toggleName)?.enabled || false
      ),
      distinctUntilChanged()
    );
  }

  private updateToggles() {
    this.togglesSubject.next(this.unleash.toggles);
  }
}
