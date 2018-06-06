import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: './stock-crud.component.html'
})
export default class StockCrudComponent {
  
  actionName: string;
  action: string;

  constructor(params: NavParams, public viewCtrl: ViewController) {

    // determine the action we're doing and generate the right form
    this.action = params.get('action') ? params.get('action') : 'add';
    this.actionName = this.action == 'add' ? 'Ajouter' : 'Modifier';
  }

  cancel() {
    // return false because it was canceled
    this.viewCtrl.dismiss(false);
  }
}