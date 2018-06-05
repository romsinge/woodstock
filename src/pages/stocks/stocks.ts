import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import Stock from '../../app/shared/classes/stock';
import StorageService from '../../app/shared/services/storage.service';

@Component({
  selector: 'page-stocks',
  templateUrl: 'stocks.html'
})
export class StocksPage {

  stocks$: Promise<Stock[]>

  constructor(
    public navCtrl: NavController,
    private storageService: StorageService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    // loading before data arrives
    let loading = this.loadingCtrl.create({
      content: "Chargement..."
    });
  
    loading.present();

    // get the stocks then show them in template with AsyncPipe
    this.stocks$ = this.storageService.get('Stocks')

    this.stocks$.then(() => loading.dismiss())
  }
}
