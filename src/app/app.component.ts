import { Component } from '@angular/core';
import { Shipment } from './shipment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Add packages to the shipment';
  description = 'In order to complete your shipment, you must add at least one package. The maximum number of packages per shipment is five.';
  showPackages = false;

  public setCurrShipment: Shipment;

  currShipmentSet(shipment: Shipment) {
    this.setCurrShipment = shipment;
  }

  shipmentFormSubmit() {
    this.showPackages = true;
  }
}
