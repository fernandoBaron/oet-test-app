import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { UserInterface } from '../../interfaces/user.interface';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @Input() user: UserInterface;
  map: L.Map;
  newMarker: any;
  addresses: any[] = [];
  seekingAddress: boolean = false;
  showAddressesList: boolean = false;
  
 
  constructor() {
   }

  async ngOnInit() {
    setTimeout(()=> {
      this.initMap();
    }, 500)
  }

  initMap() {
    this.map = L.map('mapId').setView([this.user.latitude, this.user.longitude], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet',
    }).addTo(this.map);
    var iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
   L.Marker.prototype.options.icon = iconDefault;
    const markPoint = L.marker([this.user.latitude, this.user.longitude]);
    markPoint.bindPopup('Mi ubicación');
    this.map.addLayer(markPoint);
    this.map.fitBounds([
      [markPoint.getLatLng().lat, markPoint.getLatLng().lng]
    ]);
  }


}
