import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import StorageService from '../../app/shared/services/storage.service';
import OrderCrudComponent from '../../app/shared/components/order-crud/order-crud.component';
import PurchaseOrder from '../../app/shared/classes/purchaseOrder';

@Component({
  selector: 'page-purchase-orders',
  templateUrl: 'purchase-orders.html'
})
export class PurchaseOrdersPage {

  purchaseOrders$: Promise<PurchaseOrder[]>

  constructor(
    public navCtrl: NavController,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getPurchaseOrders()
  }

  getPurchaseOrders() {
    // loading before data arrives
    let loading = this.loadingCtrl.create({
      content: "Chargement..."
    });
  
    loading.present();

    // get the stocks then show them in template with AsyncPipe
    this.purchaseOrders$ = this.storageService.get('PurchaseOrders')

    this.purchaseOrders$.then(() => loading.dismiss())
  }

  handleEditClick(id: string): void {
    // edits the chosen line

    // creates a modal to add a new type of wood
    let crudModal = this.modalCtrl.create(OrderCrudComponent, { action: 'edit', id, resource: 'PurchaseOrders' });

    crudModal.present();

    crudModal.onDidDismiss(isDone => {
      if (isDone) {
        // resource was added or modified, reload
        this.getPurchaseOrders()
      }
    });
  }

  handleDeleteClick(id: string): void {
    // deletes the chosen line

    this.storageService.delete('PurchaseOrders', id).then(() => {
      this.getPurchaseOrders();
    });
  }

  handleAddButtonClick() {
    // creates a modal to add a new type of wood
    let crudModal = this.modalCtrl.create(OrderCrudComponent, { action: 'add', resource: 'PurchaseOrders' });

    crudModal.present();

    crudModal.onDidDismiss(isDone => {
      if (isDone) {
        // resource was added or modified, reload
        this.getPurchaseOrders()
      }
    });
  }
}
