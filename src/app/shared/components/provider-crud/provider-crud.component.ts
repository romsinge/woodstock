import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import StorageService from '../../services/storage.service';
import Provider from '../../classes/provider';

@Component({
  templateUrl: './provider-crud.component.html'
})
export default class ProviderCrudComponent {
  
  actionName: string;
  action: string;
  provider: FormGroup

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
    this.provider = new FormGroup({
      // todo
    })
  }

  handleSubmit(): void {
    // creates a new stock with the form group info

    let newProvider = new Provider(this.provider.value);
    
    this.storageService.post('Providers', newProvider).then(() => {
      this.viewCtrl.dismiss(true)
    })
  }

  cancel(): void {
    // sends false because it was canceled
    this.viewCtrl.dismiss(false);
  }
}