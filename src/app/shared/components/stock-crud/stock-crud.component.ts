import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import WoodType from '../../classes/WoodType';
import StorageService from '../../services/storage.service';

@Component({
  templateUrl: './stock-crud.component.html'
})
export default class StockCrudComponent {
  
  actionName: string;
  action: string;
  stock: FormGroup
  woodTypes$: Promise<WoodType[]>

  constructor(
    params: NavParams, 
    public viewCtrl: ViewController,
    private storageService: StorageService,
    private alertCtrl: AlertController
  ) {

    // determines the action we're doing and generate the right form
    this.action = params.get('action') ? params.get('action') : 'add';
    this.actionName = this.action == 'add' ? 'Ajouter' : 'Modifier';
  }

  ngOnInit() {
    // generates abstract form to link with the template
    this.stock = new FormGroup({
      quantity: new FormControl(0, Validators.required),
      woodTypeId: new FormControl(null, Validators.required)
    })

    this.getWoodTypes()
  }

  getWoodTypes(): void {
    this.woodTypes$ = this.storageService.get('WoodTypes')
  }

  handleAddTypeClick(): void {
    //shows a prompt to create a new woodType
    let alert = this.alertCtrl.create({
      title: 'Ajouter type de bois',
      inputs: [
        {
          name: 'name',
          placeholder: 'Nom'
        },
        {
          name: 'price',
          placeholder: 'Prix au m3',
          type: 'number'
        },
        {
          name: 'weight',
          placeholder: 'Poids au m3',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Créer',
          handler: data => {
            if (data && data.name && data.price && data.weight) {
              // could be better
              // if data is valid, create new woodType
              this.storageService.post('WoodTypes', data).then(() => {
                this.getWoodTypes()
              })
            } else {
              // invalid login
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  cancel(): void {
    // sends false because it was canceled
    this.viewCtrl.dismiss(false);
  }
}