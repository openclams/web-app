import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number = 40, trail: string = '…'): string {
    let result = value || '';

    if (value) {
      const len = value.length;
      if (len > Math.abs(limit)) {
          result = value.slice(0, limit) + trail;
      }
    }

    return result;
  }

}
