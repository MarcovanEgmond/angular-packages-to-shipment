import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Validators, FormGroup ,FormControl} from '@angular/forms';
import { Country } from '../country';
import { Shipment } from '../shipment';
import { Subscription } from 'rxjs';

import { PackagedataService } from '../packagedata.service';

@Component({
  selector: 'app-shipmentform',
  templateUrl: './shipmentform.component.html',
  styleUrls: ['./shipmentform.component.scss']
})
export class ShipmentformComponent implements OnInit {
  shipmenttitle: string = 'Add shipment';
  deliveryaddress: string = 'Delivery address';
  companyinfo: string = 'Company information';
  countries: Country[];
  subscription: Subscription;

  // shipment data
  shipments: Shipment[];
  shipment: Shipment = {
    id: 0,
    creationdate: '',
    saddress: '',
    scountry: '',
    cname: '',
    caddress: '',
    ccountry: '',
    currency: '',
    euroval: 0
  };

  shipmentCreationdate: Date = new Date();
  shipmentcurrency: string;
  shipmenteuroval: number;

  newshipmentid: number;
  createdate: string;

  showscountry: boolean;
  showccountry: boolean;

  shipmentForm: FormGroup;

  @Output() showPackageForm: EventEmitter<boolean> =   new EventEmitter();

  @Output() currShipment: EventEmitter<any> =   new EventEmitter();

  constructor(private PackagedataService: PackagedataService) { }

  ngOnInit() {
    this.createForm();
    this.getShipmentData();
    this.getCountries(); 
  }

  private createForm() {
    this.shipmentForm = new FormGroup({
      saddresscheck: new FormControl('', [ Validators.required ]),
      scountrycheck: new FormControl('', [ Validators.required ],),
      cnamecheck: new FormControl('', [ Validators.required ]),
      caddresscheck: new FormControl('', [ Validators.required ]),
      ccountrycheck: new FormControl('', [ Validators.required ])
    });
  }
  
  getShipmentData(): void {
    this.PackagedataService.getShipmentData()
        .subscribe(shipments => this.shipments = shipments);
  }
  
  getCountries(): void {
    this.PackagedataService.getCountries()
        .subscribe(countries => this.countries = countries);
  }

  setScountry(i) {
    this.shipment.scountry = this.countries[i].name;
    this.showscountry = false;
  }

  setCcountry(i) {
    this.shipment.ccountry = this.countries[i].name;
    this.showccountry = false;
  }

  findCountryData(data, reqField, value, resField) {
    let container = data;
    for (var i = 0; i < container.length; i++) {
        if (container[i][reqField] == value) {
            return(container[i][resField]);
        }
    }
    return '';
  }

  createShipment () {
    this.newshipmentid = (this.shipments.length > 0) ? this.shipments[this.shipments.length-1].id + 1 : 1;
    this.createdate = this.shipmentCreationdate.toLocaleDateString('nl-NL', { year: 'numeric', month: 'numeric', day: 'numeric' })
    this.shipmentcurrency = this.findCountryData(this.countries, 'name', this.shipment.ccountry,'currency');
    this.shipmenteuroval = this.findCountryData(this.countries, 'name', this.shipment.ccountry,'euroval');
    this.shipments.push({
      id: this.newshipmentid,
      creationdate: this.createdate,
      saddress: this.shipment.saddress,
      scountry: this.shipment.scountry,
      cname: this.shipment.cname,
      caddress: this.shipment.caddress,
      ccountry: this.shipment.ccountry,
      currency: this.shipmentcurrency,
      euroval: this.shipmenteuroval
    });
    this.showPackageForm.emit(true);
    this.currShipment.emit(this.newshipmentid);
  }
      
  get snamecheck() {
    return this.shipmentForm.get('snamecheck');
  }
    
  get saddresscheck() {
    return this.shipmentForm.get('saddresscheck');
  }
    
  get scountrycheck() {
    return this.shipmentForm.get('scountrycheck');
  }
    
  get cnamecheck() {
    return this.shipmentForm.get('cnamecheck');
  }
    
  get caddresscheck() {
    return this.shipmentForm.get('caddresscheck');
  }
    
  get ccountrycheck() {
    return this.shipmentForm.get('ccountrycheck');
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
