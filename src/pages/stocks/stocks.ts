import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import Stock from '../../app/shared/classes/stock';
import StorageService from '../../app/shared/services/storage.service';
import StockCrudComponent from '../../app/shared/components/stock-crud/stock-crud.component';

@Component({
  selector: 'page-stocks',
  templateUrl: 'stocks.html'
})
export class StocksPage {

  stocks$: Promise<Stock[]>

  constructor(
    public navCtrl: NavController,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getStocks()
  }

  getStocks() {
    // loading before data arrives
    let loading = this.loadingCtrl.create({
      content: "Chargement..."
    });
  
    loading.present();

    // get the stocks then show them in template with AsyncPipe
    this.stocks$ = this.storageService.get('Stocks')

    this.stocks$.then(() => loading.dismiss())
  }

  handleAddButtonClick() {
    // create a modal to add a new type of wood
    let crudModal = this.modalCtrl.create(StockCrudComponent, { action: 'add' });

    crudModal.present();

    crudModal.onDidDismiss(isDone => {
      if (isDone) {
        // resource was added or modified, reload
        this.getStocks()
      }
    });
  }
}
