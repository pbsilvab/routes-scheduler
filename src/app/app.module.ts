import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { AgmCoreModule } from '@agm/core';

import { MapComponent } from './map/map.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PlaceSearcherComponent } from './place-searcher/place-searcher.component';
import { MarkersListComponent } from './markers-list/markers-list.component';
import { AgmDirectionModule } from 'agm-direction';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatBadgeModule } from '@angular/material/badge';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PlaceSearcherComponent,
    MarkersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatListModule,
    MatCardModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCVqeBOJnmd06bRCpDTLl1ryk9ERYAPGq4',
      libraries: ['places'],
    }),
    AgmDirectionModule,
    FlexLayoutModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    DragDropModule,
    MatBadgeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
