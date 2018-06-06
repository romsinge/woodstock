import RESOURCES from './../mocks/mock.data';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import uuid from 'uuid/v1';

@Injectable()
export default class StorageService {
  // this service manages data in the storage before a REST API is used

  constructor(private storage: Storage) {}

  get(resource: string, id?: string): Promise<any> {

    let promise$;

    if (id) {
      promise$ = new Promise((resolve, reject) => {
        this.storage.get(resource).then(data => {

          if (data) {
            // finds object in resource table
            let obj = data.find(it => it.id == id);
            if (obj) {
              resolve(obj);
            } else {
              reject("Not found");
            }
          }
        })
      })
    } else {
      promise$ = this.storage.get(resource);
    }

    return promise$;
  }

  post(resource: string, data: any): Promise<any> {
    // stores the resource and adds metadata

    return new Promise((resolve, reject) => {
      this.storage.get(resource).then(previousData => {

        this.calculateProperties(resource, data).then(calcData => {
          
          calcData = {
            // generate uuid for the resource
            id: uuid(),
            ...calcData
          }

          let newData = previousData.concat([calcData])

          this.storage.set(resource, newData).then(() => resolve(calcData));
        });
      });
    });
  }

  update(resource: string, id: string, newValue: any): Promise<any> {
    // finds and replaces the chosen instance in resource

    return new Promise((resolve, reject) => {
      this.get(resource).then(previousData => {
        let newData = previousData.map(entity => {
          return entity.id == id ? newValue : entity;
        });
  
        this.storage.set(resource, newData).then(() => resolve());
      })
    })
  }

  delete(resource: string, id: string): Promise<any> {
    // delete one instance of a resource
    // it is basically a post on the resource 
    // with the same values except for the chosen one

    return new Promise((resolve, reject) => {
      this.storage.get(resource).then(previousData => {

          let newData = previousData.filter(cell => {
            return cell.id != id;
          });

          this.storage.set(resource, newData).then(() => resolve());
      })
    })
  }

  calculateProperties(resource: string, data: any): Promise<any> {
    // calculates properties from others

    let newData = data
    
    return new Promise((resolve, reject) => {
      switch (resource) {
        case "Stocks":
          this.get("WoodTypes", data.woodTypeId).then(woodType => {
            newData.priceTotal = woodType.price * newData.quantity;
            newData.weightTotal = woodType.weight * newData.quantity;
            resolve(newData);
          })
        break;
        case "PurchaseOrders":
        case "BuyingOrders":
          this.get("WoodTypes", data.woodTypeId).then(woodType => {
            newData.dateCreation = new Date();
            newData.priceTotal = woodType.price * newData.quantity;
            newData.weightTotal = woodType.weight * newData.quantity;
            resolve(newData);
          })
        break;
        default:
          resolve(newData);
        break;
      }
    })
  }

  resetStorageResources(): Promise<any> {
    // resets resource tables

    let promises = [];

    // store each promise for each storage set
    for (let key in RESOURCES) {
      promises.push(this.storage.set(key, RESOURCES[key]));
    }

    promises.push(this.storage.set('isDBInitialized', true));

    return Promise.all(promises);
  }
} 