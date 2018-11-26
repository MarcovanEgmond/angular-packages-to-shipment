import { Component, OnInit, Input } from '@angular/core';
import {Validators, FormGroup ,FormControl} from '@angular/forms';
import { Package } from '../package';
import { Shipment } from '../shipment';

import { PackagedataService } from '../packagedata.service';

@Component({
  selector: 'app-packageform',
  templateUrl: './packageform.component.html',
  styleUrls: ['./packageform.component.scss']
})
export class PackageformComponent implements OnInit {
  formtitle: string = 'Add package';
  packages: Package[];
  package: Package = {
    id:     0,
    name:   '',
    weight: '',
    value:  null,
    currency: 'EURO'
  };
  packageCount: any;
  newpackageid: number;
  show: boolean = true;
  pweightPattern = "^[0-9]{1,2}(?:\.?[0-9]{1,3})?$";
  pvaluePattern = (this.package.currency == 'EURO') ? "^[+-]?[0-9]{0,2}(?:\.?[0-9]{3})*(?:\,[0-9]{2})?$" : "^[+-]?[0-9]{0,2}(?:\,?[0-9]{3})*(?:\.[0-9]{2})?$";

  packageForm: FormGroup;

  packageLimit: number = 5;
  singleMaxWeight: number = 10;
  packageWeightLimit: number = 25;
  restWeight :number

  showPackageForm: boolean = true;
  showPackageLimitMessage: boolean = false;
  showWeightLimitMessage: boolean = false;

  shipmentData: Shipment[];
  countryCurrency: string;
  countryeuroval: number;
  calcValue: number

  @Input() currShipment: Shipment;
  
  constructor(private PackagedataService: PackagedataService) {}

  ngOnInit(): void {
    this.getPackeges();
    this.getShipmentData();
    this.sendPackegeTotals(this.packages.length, this.getWeightSum(this.packages), this.getValueSum(this.packages));
    
    this.restWeight = (this.packageWeightLimit - this.getWeightSum(this.packages) < this.singleMaxWeight) ? (this.packageWeightLimit - this.getWeightSum(this.packages)) : 10;
    this.createForm(this.restWeight);
    this.packageCount = this.packages.length;
    this.showPackageForm = ( this.packages.length < this.packageLimit  && this.getWeightSum(this.packages) < this.packageWeightLimit );
    this.showPackageLimitMessage = (this.packages.length >= this.packageLimit ); 
    this.showWeightLimitMessage = (this.getWeightSum(this.packages) >= this.packageWeightLimit );
    this.countryCurrency = this.findCountryData(this.shipmentData, 'id', this.currShipment,'currency');
    this.countryeuroval = this.findCountryData(this.shipmentData, 'id', this.currShipment,'euroval');
  }

  getPackeges(): void {
    this.PackagedataService.getPackeges()
        .subscribe(packages => this.packages = packages);
  }
  
  getShipmentData(): void {
    this.PackagedataService.getShipmentData()
        .subscribe(shipmentData => this.shipmentData = shipmentData);
  }

  sendPackegeTotals(packageCount, packageTotalWeight, packageTotalValue): void {
    this.PackagedataService.sendPackegeTotals(packageCount, packageTotalWeight, packageTotalValue);
  }

  private createForm(restWeight) {
    this.packageForm = new FormGroup({
      name: new FormControl('', [ Validators.required, Validators.maxLength(32) ]),
      weight: new FormControl('', [ Validators.required, Validators.max(restWeight), Validators.pattern(this.pweightPattern) ]),
      value: new FormControl('', [ Validators.required, Validators.pattern(this.pvaluePattern) ])
    });
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
  
  getWeightSum(packages) {
    var total = 0;
    packages.forEach(function(key,value){
      let toNum = Number(key.weight.replace(',','.'));
      total+=toNum;
    })
    return total;
  }
  
  getValueSum(packages) {
    var total = 0;
    packages.forEach(function(key,value){
      let toNum = Number(key.value);
      total+=toNum;
    })
    return total;
  }

  addPackage() {
    this.newpackageid = (this.packages.length > 0) ? this.packages[this.packages.length-1].id + 1 : 1;
    this.calcValue = this.package.value * this.countryeuroval;
    this.packages.push({
      id:       this.newpackageid, 
      name:     this.package.name, 
      weight:   this.package.weight,
      value:    this.calcValue,
      currency: this.package.currency
    });
    console.log('calcValue: ', this.calcValue);
    this.package.name = '';
    this.package.weight = '';
    this.package.value = null;
    this.sendPackegeTotals(this.packages.length, this.getWeightSum(this.packages), this.getValueSum(this.packages));
    this.packageCount = this.packages.length;
    this.showPackageForm = ( this.packages.length < this.packageLimit  && this.getWeightSum(this.packages) < this.packageWeightLimit );
    this.showPackageLimitMessage = (this.packageCount >= this.packageLimit ); 
    this.showWeightLimitMessage = (this.getWeightSum(this.packages) >= this.packageWeightLimit );
  }
      
  get name() {
    return this.packageForm.get('name');
  }
    
  get weight() {
    return this.packageForm.get('weight');
  }
    
  get value() {
    return this.packageForm.get('value');
  }

}
