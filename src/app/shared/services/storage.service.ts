import RESOURCES from './../mocks/mock.data';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import uuid from 'uuid/v1';

@Injectable()
export default class StorageService {
  // this service manages data in the storage before a REST API is used

  constructor(private storage: Storage) {}

  get(resource: string): Promise<any> {
    return this.storage.get(resource);
  }

  post(resource: string, data: any): Promise<any> {
    // store the resource and adds metadata

    return new Promise((resolve, reject) => {
      this.storage.get(resource).then(previousData => {
        this.storage.set(resource, previousData.push({
          // generate uuid for the resource
          id: uuid(),
          ...data
        })).then(() => resolve());
      })
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