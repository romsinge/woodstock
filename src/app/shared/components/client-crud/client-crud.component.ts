import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import StorageService from '../../services/storage.service';
import Client from '../../classes/client';

@Component({
  templateUrl: './client-crud.component.html'
})
export default class ClientCrudComponent {
  
  actionName: string;
  action: string;
  client: FormGroup

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
  }

  ngOnInit() {
    this.client = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', Validators.required),
    });

    if (this.action == 'edit') {
      // loading before data arrives
      let loading = this.loadingCtrl.create({
        content: "Chargement..."
      });
    
      loading.present();
      
      this.storageService.get('Clients', this.params.get('id')).then(client => {
        this.editFormGroup(client);
        loading.dismiss();
      });
    }
  }

  editFormGroup(previousValues?: any): void {
    // generates abstract form to link with the template
    // fills it with previous value if edit mode
    this.client.patchValue(previousValues)
  }

  handleSubmit(): void {
    // creates a new stock with the form group info

    let newClient
    
    if (this.action == 'edit') {
      this.storageService.update('Clients', this.params.get('id'), this.client.value).then(() => {
        this.viewCtrl.dismiss(true)
      })
    } else {
      newClient = new Client(this.client.value);
    
      this.storageService.post('Clients', newClient).then(() => {
        this.viewCtrl.dismiss(true)
      })
    }
  }

  cancel(): void {
    // sends false because it was canceled
    this.viewCtrl.dismiss(false);
  }
}