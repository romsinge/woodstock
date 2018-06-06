import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import StorageService from '../../services/storage.service';
import Order from '../../classes/order';
import WoodType from '../../classes/WoodType';
import PurchaseOrder from '../../classes/purchaseOrder';
import BuyingOrder from '../../classes/buyingOrder';

@Component({
  templateUrl: './order-crud.component.html'
})
export default class OrderCrudComponent {
  
  actionName: string;
  action: string;
  order: FormGroup;
  woodTypes$: Promise<WoodType[]>;
  providers$: Promise<WoodType[]>;
  clients$: Promise<WoodType[]>;
  resourceName: string;
  resource: string;

  constructor(
    private params: NavParams, 
    public viewCtrl: ViewController,
    private storageService: StorageService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {

    // determines the action we're doing and generate the right form
    this.action = params.get('action') ? params.get('action') : 'add';
    this.actionName = this.action == 'add' ? 'Ajouter' : 'Modifier';
    this.resource = params.get('resource');
    switch(this.resource) {
      case 'PurchaseOrders':
        this.resourceName = 'bon de commande';
      break;
      case 'BuyingOrders':
        this.resourceName = 'bon d\'achat';
      break;
      default:
      break;
    }
  }

  ngOnInit() {
    this.order = new FormGroup({
      woodTypeId: new FormControl(null, Validators.required),
      quantity: new FormControl(1, Validators.required)
    });

    this.woodTypes$ = this.storageService.get('WoodTypes');

    switch(this.resource) {
      case 'PurchaseOrders':
        this.order.addControl('clientId', new FormControl('', Validators.required));
        this.clients$ = this.storageService.get('Clients');
      break;
      case 'BuyingOrders':
        this.order.addControl('providerId', new FormControl('', Validators.required));
        this.providers$ = this.storageService.get('Providers');
      break;
      default:
      break;
    }

    if (this.action == 'edit') {
      // loading before data arrives
      let loading = this.loadingCtrl.create({
        content: "Chargement..."
      });
    
      loading.present();
      
      this.storageService.get(this.resource, this.params.get('id')).then(order => {
        this.editFormGroup(order);
        loading.dismiss();
      });
    }
  }

  editFormGroup(previousValues?: any): void {
    // generates abstract form to link with the template
    // fills it with previous value if edit mode
    this.order.patchValue(previousValues)
  }

  handleSubmit(): void {
    // creates a new stock with the form group info

    let newOrder
    
    if (this.action == 'edit') {
      this.storageService.update(this.resource, this.params.get('id'), this.order.value).then(() => {
        this.viewCtrl.dismiss(true)
      })
    } else {
      switch(this.resource) {
        case 'PurchaseOrders':
          newOrder = new PurchaseOrder(this.order.value);
        break;
        case 'BuyingOrders':
          newOrder = new BuyingOrder(this.order.value);
        break;
        default:
        break;
      }
    
      this.storageService.post(this.resource, newOrder).then(() => {
        this.viewCtrl.dismiss(true)
      })
    }
  }

  cancel(): void {
    // sends false because it was canceled
    this.viewCtrl.dismiss(false);
  }
}