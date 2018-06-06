import { Pipe, PipeTransform } from '@angular/core';
import StorageService from '../services/storage.service';

@Pipe({
  name: 'resource$'
})
export default class ResourcePipe implements PipeTransform {

  constructor(private storageService: StorageService) {}

  transform(id: string, resource: string, property?: string) {
    // get the requested object in resource by id
    
    let promise$

    if (property) {
      promise$ = new Promise((resolve, reject) => {
        this.storageService.get(resource, id).then(obj => {
          resolve(obj[property])
        })
      }).catch(err => {
        console.log(err)
      })
    } else {
      promise$ = this.storageService.get(resource, id)
    }

    return promise$
  }
}