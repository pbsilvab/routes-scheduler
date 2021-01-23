import { Component, OnInit } from '@angular/core';
import { IMarker, MarkersService } from '../markers.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-markers-list',
  templateUrl: './markers-list.component.html',
  styleUrls: ['./markers-list.component.scss']
})
export class MarkersListComponent implements OnInit {

  markers: IMarker[] = [];

  constructor(
    private markerService: MarkersService,
  ) { }

  ngOnInit(): void {
    this.markerService.markers.subscribe(
      (markers)=>{
        console.log(markers);
        this.markers = markers;
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.markers, event.previousIndex, event.currentIndex);
    this.markerService.updateMarkers(this.markers);
  }

}
