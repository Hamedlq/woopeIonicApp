import {Pipe} from '@angular/core';

@Pipe({
  name: 'hamedSeperatorPipe'
})
export class HamedSeperatorPipe {
  transform(value, args) {
    return value;
  }
}