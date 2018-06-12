import { Component } from '@angular/core';
import { NavParams, ViewController, LoadingController } from 'ionic-angular';
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
    private params: NavParams, 
    public viewCtrl: ViewController,
    private storageService: StorageService,
    private loadingCtrl: LoadingController
  ) {

    // determines the action we're doing and generate the right form
    this.action = params.get('action') ? params.get('action') : 'add';
    this.actionName = this.action == 'add' ? 'Ajouter' : 'Modifier';
  }

  ngOnInit() {

    this.provider = new FormGroup({
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
      
      this.storageService.get('Providers', this.params.get('id')).then(provider => {
        this.editFormGroup(provider);
        loading.dismiss();
      });
    }
  }

  editFormGroup(previousValues?: any): void {
    // generates abstract form to link with the template
    // fills it with previous value if edit mode
    this.provider.patchValue(previousValues)
  }

  handleSubmit(): void {
    // creates a new stock with the form group info

    let newProvider
    
    if (this.action == 'edit') {
      this.storageService.update('Providers', this.params.get('id'), this.provider.value).then(() => {
        this.viewCtrl.dismiss(true)
      })
    } else {
      newProvider = new Provider(this.provider.value);
    
      this.storageService.post('Providers', newProvider).then(() => {
        this.viewCtrl.dismiss(true)
      })
    }
  }

  cancel(): void {
    // sends false because it was canceled
    this.viewCtrl.dismiss(false);
  }
}