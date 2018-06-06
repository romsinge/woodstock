import { BuyingOrdersPage } from './../pages/buying-orders/buying-orders';
import { PurchaseOrdersPage } from './../pages/purchase-orders/purchase-orders';
import { ClientsPage } from './../pages/clients/clients';
import { Storage } from '@ionic/storage';
import { HomePage } from './../pages/home/home';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { StocksPage } from '../pages/stocks/stocks';
import StorageService from './shared/services/storage.service';
import { ProvidersPage } from '../pages/providers/providers';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = BuyingOrdersPage;

  isDBInitialized: boolean = false;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private storageService: StorageService,
    private storage: Storage,
    public loadingCtrl: LoadingController
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Stocks', component: StocksPage},
      { title: 'Fournisseurs', component: ProvidersPage},
      { title: 'Clients', component: ClientsPage},
      { title: 'Bons de commande', component: PurchaseOrdersPage},
      { title: 'Bons d\'achat', component: BuyingOrdersPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      let loading = this.loadingCtrl.create({
        content: "Chargement..."
      });
    
      loading.present();

      // check if db is initialized in storage
      this.storage.get('isDBInitialized').then(isDBInitialized => {
        if (isDBInitialized) {
          loading.dismiss()
        } else {
          // initialize MOCK data
          this.storageService.resetStorageResources().then(() => {
            loading.dismiss()
          })
        }
      })
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
