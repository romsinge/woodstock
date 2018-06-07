import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ProvidersPage } from './providers';
import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock
} from '../../../test-config/mocks-ionic';

describe('ProvidersPage Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProvidersPage],
      imports: [
        IonicModule.forRoot(ProvidersPage)
      ],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock }
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof ProvidersPage).toBe(true);
  });

  it('should have two pages', () => {
    expect(component.pages.length).toBe(2);
  });

});