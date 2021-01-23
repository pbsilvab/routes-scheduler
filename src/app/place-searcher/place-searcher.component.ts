import { Component, ElementRef, OnInit, ViewChild, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { MarkersService, IMarker } from '../markers.service';

@Component({
  selector: 'app-place-searcher',
  templateUrl: './place-searcher.component.html',
  styleUrls: ['./place-searcher.component.scss']
})
export class PlaceSearcherComponent implements OnInit {

  public value = "non";

  title: string = 'AGM project';
  latitude: number;
  longitude: number;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  private geoCoder;


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private markerService: MarkersService,
  ) { }

  ngOnInit(): void {

    this.mapsAPILoader.load().then(() => {

      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);

      autocomplete.addListener("place_changed", () => {
         this.ngZone.run(() => {

          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          console.log(place);

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          const newMarker: IMarker = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            label: place.name,
            draggable: false,
            icon: place.icon,
            placeId: place.id
          }

          this.markerService.addMarker(newMarker);

        });

        this.searchElementRef.nativeElement.value = "";
      });
    });

  }

}
