import { Component, OnInit } from '@angular/core';
import { MarkersService, IMarker } from '../markers.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  lat = -34;
  lng = -58;
  zoom = 10;
  markers: IMarker[] = [];
  public origin: any;
  public destination: any;
  startRoute = false;
  waypoints: {location: {lat: number, lng: number}, stopover:boolean}[];

  selectedMarker: IMarker;

  availabeGeolocation: boolean = navigator.geolocation ? true : false;

  constructor(
    private markerService: MarkersService
  ) { }

  ngOnInit() {
    this.getMarkers();
    if(!this.availabeGeolocation) {
      console.log('service not available');
    }else {
      this.myLocationMarker();
    }

    this.origin = { lat: 24.799448, lng: 120.979021 };
    this.destination = { lat: 24.799524, lng: 120.975017 };
  }

  loadRoute() {

    if(this.markers.length <= 1) {
      console.log('No Enougth markers');
      return false;
    }

    console.log(this.markers);

    this.origin = {
      lat: this.markers[0].lat,
      lng: this.markers[0].lng,
    }

    this.destination = {
      lat: this.markers[ this.markers.length - 1 ].lat,
      lng: this.markers[ this.markers.length - 1 ].lng,
    }

    const _markers = [...this.markers];

    delete(_markers[0]);
    delete(_markers[_markers.length - 1]);

    this.waypoints = _markers.map( ({ lat, lng }) => {
      return {
        location: {
          lat,
          lng,
        },
        stopover: false
      }
    }).filter(Boolean);

    this.startRoute = true;
  }


  myLocationMarker() {
    navigator.geolocation.getCurrentPosition(
      (position) =>{

        this.availabeGeolocation = true;

        const newMarker = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          label: "Current Position",
          draggable: true,
        };

        this.markerService.addMarker(newMarker);

      },
      (error) => {
        this.availabeGeolocation = false;
        console.log(error);
      }
    );
  }

  clickedMarker(marker, i) {
    this.selectedMarker = marker;
    console.log(i);
  }

  markerDragEnd(m, $event) {
    console.log(m);
    console.log($event);
  }

  getMarkers() {
    this.markerService.markers.subscribe(
      (markers) => {
        this.markers = markers || [];
      }
    )
  }

  ngOnDestroy(){
    this.markerService.markers.unsubscribe();
  }
}
