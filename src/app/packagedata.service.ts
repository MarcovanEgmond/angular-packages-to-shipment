import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

import { Package } from './package';
import { PACKAGES } from './package-mockup';
import { Country } from './country';
import { COUNTRIES } from './countries';
import { Shipment } from './shipment';
import { SHIPMENTS } from './shipments';

@Injectable({
  providedIn: 'root'
})
export class PackagedataService {
  private packageTotals = new Subject<any>();
  private shipmentData = new Subject<any>();

  constructor() { }

  getPackeges(): Observable<Package[]> {
    return of(PACKAGES);
  }

  getCountries(): Observable<Country[]> {
    return of(COUNTRIES);
  }

  getShipmentData(): Observable<Shipment[]> {
    return of(SHIPMENTS);
  }

  sendPackegeTotals(count: string, weight: number, value: number) {
    this.packageTotals.next({ 
      packagecount: count,
      weighttotal: weight,
      valuetotal: value
    });
  }

  sendShipmentData(id: number, creationdate: string, saddress: string, scountry: string, cname: string, caddress: string, ccountry: string, currency: string, euroval: number) {
    this.shipmentData.next({ 
      id: id,
      creationdate: creationdate,
      shipmentaddress: saddress,
      shipmentcountry:scountry,
      companyname: cname,
      compayaddress: caddress,
      companycountry: ccountry,
      shipmentcurrency: currency, 
      shipmentseuroval: euroval
    });
  }
  
  getPackegeCount(): Observable<any> {
    return this.packageTotals.asObservable();
  }
  
  // getShipmentData(): Observable<any> {
  //   return this.shipmentData.asObservable();
  // }

}
