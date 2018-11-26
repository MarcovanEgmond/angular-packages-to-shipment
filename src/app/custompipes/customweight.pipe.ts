import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customweight'
})
export class CustomweightPipe implements PipeTransform {

  transform(value: string, decimalcount: number): any {
    if(value == null) return "";
    let str = value + '';
    let num = str.replace(',','.');
    let number =  Number.parseFloat(num).toFixed(decimalcount);
    let newNum = number.replace('.',',');
    return newNum
  }

}

