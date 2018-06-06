import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import Stock from '../../app/shared/classes/stock';
import StorageService from '../../app/shared/services/storage.service';
import ProviderCrudComponent from '../../app/shared/components/provider-crud/provider-crud.component';

@Component({
  selector: 'page-providers',
  templateUrl: 'providers.html'
})
export class ProvidersPage {

  providers$: Promise<Stock[]>

  constructor(
    public navCtrl: NavController,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getProviders()
  }

  getProviders() {
    // loading before data arrives
    let loading = this.loadingCtrl.create({
      content: "Chargement..."
    });
  
    loading.present();

    // get the stocks then show them in template with AsyncPipe
    this.providers$ = this.storageService.get('Providers')

    this.providers$.then(() => loading.dismiss())
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

  handleDeleteClick(id: string): void {
    // deletes the chosen line

    this.storageService.delete('Providers', id).then(() => {
      this.getProviders();
    });
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