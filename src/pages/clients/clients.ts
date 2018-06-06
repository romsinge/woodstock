import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import Stock from '../../app/shared/classes/stock';
import StorageService from '../../app/shared/services/storage.service';
import ClientCrudComponent from '../../app/shared/components/client-crud/client-crud.component';

@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html'
})
export class ClientsPage {

  clients$: Promise<Stock[]>

  constructor(
    public navCtrl: NavController,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getClients()
  }

  getClients() {
    // loading before data arrives
    let loading = this.loadingCtrl.create({
      content: "Chargement..."
    });
  
    loading.present();

    // get the stocks then show them in template with AsyncPipe
    this.clients$ = this.storageService.get('Clients')

    this.clients$.then(() => loading.dismiss())
  }

  handleEditClick(id: string): void {
    // edits the chosen line

    // creates a modal to add a new type of wood
    let crudModal = this.modalCtrl.create(ClientCrudComponent, { action: 'edit', id });

    crudModal.present();

    crudModal.onDidDismiss(isDone => {
      if (isDone) {
        // resource was added or modified, reload
        this.getClients()
      }
    });
  }

  handleDeleteClick(id: string): void {
    // deletes the chosen line

    this.storageService.delete('Clients', id).then(() => {
      this.getClients();
    });
  }

  handleAddButtonClick() {
    // creates a modal to add a new type of wood
    let crudModal = this.modalCtrl.create(ClientCrudComponent, { action: 'add' });

    crudModal.present();

    crudModal.onDidDismiss(isDone => {
      if (isDone) {
        // resource was added or modified, reload
        this.getClients()
      }
    });
  }
}
