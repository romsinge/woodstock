import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, LoadingController, ModalController } from 'ionic-angular';

import { ProvidersPage } from './providers';
import StorageService from '../../app/shared/services/storage.service';
import { IonicStorageModule } from '@ionic/storage';

describe('ProvidersPage Component', () => {
  let fixture;
  let component;
  let title;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProvidersPage],
      imports: [
        IonicModule.forRoot(ProvidersPage),
        IonicStorageModule.forRoot({
          name: '__mydb',
          driverOrder: ['localstorage', 'sqlite', 'websql', 'indexeddb']
        })
      ],
      providers: [
        NavController,
        StorageService,
        LoadingController,
        ModalController
      ]
    })
  }));

  beforeEach((done) => {
    fixture = TestBed.createComponent(ProvidersPage);
    component = fixture.componentInstance;
    title = fixture.nativeElement.querySelector('ion-title');

    component.storageService.resetStorageResources().then(() => done());
  });

  it('should be created', () => {
    expect(component instanceof ProvidersPage).toBe(true);
  });

  it('should have a title saying "Fournisseurs"', () => {
    expect(title.textContent).toEqual('Fournisseurs');
  });

  it('should get providers from database', (done) => {
    let providers$ = component.getProviders();
    expect(providers$).toBeDefined();
    providers$.then(providers => {
      providers.forEach(provider => {
        expect(provider instanceof Object).toBe(true, 'instance of Object');
      });
    });

    done();
  });

  it('should delete a provider', (done) => {
    component.handleDeleteClick(0).then((res) => {
      expect(res).toEqual('Providers with id 0 was deleted');
    });

    done();
  });

});