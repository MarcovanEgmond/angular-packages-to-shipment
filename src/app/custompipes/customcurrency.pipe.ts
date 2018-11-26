import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customcurrency'
})
export class CustomcurrencyPipe implements PipeTransform {

  transform(value: number | string, locale: string): any {
    if(value == null) return "";
    let str = value + '';
    let strSplit = str.split(/[.,]+/);
    let decimals = (strSplit.length > 1) ? strSplit.pop() : 0;
    let num = Number(strSplit.join('') + "."+ decimals);
    let number = num.toLocaleString(locale, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    return number
  }

}

