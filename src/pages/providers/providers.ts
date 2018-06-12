import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import StorageService from '../../app/shared/services/storage.service';
import ProviderCrudComponent from '../../app/shared/components/provider-crud/provider-crud.component';
import Provider from '../../app/shared/classes/provider';

@Component({
  selector: 'page-providers',
  templateUrl: 'providers.html'
})
export class ProvidersPage {

  providers$: Promise<Provider[]>

  constructor(
    public navCtrl: NavController,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    // loading before data arrives
    let loading = this.loadingCtrl.create({
      content: "Chargement..."
    });
  
    loading.present();

    this.getProviders().then(() => loading.dismiss())
  }

  getProviders(): Promise<Provider[]> {
    
    // get the stocks then show them in template with AsyncPipe
    this.providers$ = this.storageService.get('Providers');

    return this.providers$;
  }

  handleEditClick(id: string): void {
    // edits the chosen line

    // creates a modal to add a new type of wood
    let crudModal = this.modalCtrl.create(ProviderCrudComponent, { action: 'edit', id });

    crudModal.present();

    crudModal.onDidDismiss(isDone => {
      if (isDone) {
        // resource was added or modified, reload
        this.getProviders()
      }
    });
  }

  handleDeleteClick(id: string): Promise<any> {
    // deletes the chosen line

    let promise$ = this.storageService.delete('Providers', id);

    promise$.then(() => {
      this.getProviders();
    });

    return promise$;
  }

  handleAddButtonClick() {
    // creates a modal to add a new type of wood
    let crudModal = this.modalCtrl.create(ProviderCrudComponent, { action: 'add' });

    crudModal.present();

    crudModal.onDidDismiss(isDone => {
      if (isDone) {
        // resource was added or modified, reload
        this.getProviders()
      }
    });
  }
}
