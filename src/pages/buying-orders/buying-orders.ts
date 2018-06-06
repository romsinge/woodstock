import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import StorageService from '../../app/shared/services/storage.service';
import OrderCrudComponent from '../../app/shared/components/order-crud/order-crud.component';
import BuyingOrder from '../../app/shared/classes/buyingOrder';

@Component({
  selector: 'page-buying-orders',
  templateUrl: 'buying-orders.html'
})
export class BuyingOrdersPage {

  buyingOrders$: Promise<BuyingOrder[]>

  constructor(
    public navCtrl: NavController,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getBuyingOrders()
  }

  getBuyingOrders() {
    // loading before data arrives
    let loading = this.loadingCtrl.create({
      content: "Chargement..."
    });
  
    loading.present();

    // get the stocks then show them in template with AsyncPipe
    this.buyingOrders$ = this.storageService.get('BuyingOrders')

    this.buyingOrders$.then(() => loading.dismiss())
  }

  handleEditClick(id: string): void {
    // edits the chosen line

    // creates a modal to add a new type of wood
    let crudModal = this.modalCtrl.create(OrderCrudComponent, { action: 'edit', id, resource: 'BuyingOrders' });

    crudModal.present();

    crudModal.onDidDismiss(isDone => {
      if (isDone) {
        // resource was added or modified, reload
        this.getBuyingOrders()
      }
    });
  }

  handleDeleteClick(id: string): void {
    // deletes the chosen line

    this.storageService.delete('BuyingOrders', id).then(() => {
      this.getBuyingOrders();
    });
  }

  handleAddButtonClick() {
    // creates a modal to add a new type of wood
    let crudModal = this.modalCtrl.create(OrderCrudComponent, { action: 'add', resource: 'BuyingOrders' });

    crudModal.present();

    crudModal.onDidDismiss(isDone => {
      if (isDone) {
        // resource was added or modified, reload
        this.getBuyingOrders()
      }
    });
  }
}
