import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkersService {

  markers = new Subject<IMarker[]>();

  allMarkers: IMarker[] = [];

  constructor() {

  }

  addMarker(marker: IMarker) {

    this.allMarkers.push(marker);
    this.markers.next(this.allMarkers);

  }

  updateMarkers(markers: IMarker[]) {
    this.allMarkers = markers;
    this.markers.next(this.allMarkers);
  }

  removeMarker() {

  }

}

export interface IMarker {
  lat: number,
  lng: number,
  label: string,
  draggable: boolean,
  icon?: string,
  placeId?: string,
}
