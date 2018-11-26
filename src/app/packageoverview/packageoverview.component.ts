import { Component, OnInit } from '@angular/core';
import { Package } from '../package';
import { Subscription } from 'rxjs';

import { PackagedataService } from '../packagedata.service';

@Component({
  selector: 'app-packageoverview',
  templateUrl: './packageoverview.component.html',
  styleUrls: ['./packageoverview.component.scss']
})
export class PackageoverviewComponent implements OnInit {
  resulttitle: string = 'Package overview';
  packages: Package[];
  packageTotals: any;
  subscription: Subscription;
  subscription2: Subscription;

  constructor(private PackagedataService: PackagedataService) {
    this.subscription = this.PackagedataService.getPackegeCount().subscribe(packageTotals => { this.packageTotals = packageTotals; });
  }

  ngOnInit() {
    this.getPackeges();
  }

  getPackeges(): void {
    this.PackagedataService.getPackeges()
        .subscribe(packages => this.packages = packages);
  }

  
  sendPackegeTotals(packageCount, packageTotalWeight, packageTotalValue): void {
    this.PackagedataService.sendPackegeTotals(packageCount, packageTotalWeight, packageTotalValue);
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
      let toNum = key.value;
      total+=toNum;
    })
    return total;
  }
  
  removePackage(i) {
    this.packages.splice(i, 1);
    this.sendPackegeTotals(this.packages.length, this.getWeightSum(this.packages), this.getValueSum(this.packages));
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
   
}