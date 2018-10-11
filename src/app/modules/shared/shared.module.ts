import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MomentPipe} from '../../pipes/moment.pipe';
import { TimeCreatedFilterComponent } from '../../utility/datagrid-filters/time-created-filter/time-created-filter.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClarityModule, ClrFormsNextModule} from '@clr/angular';
import {TypeaheadComponent} from './components/typeahead/typeahead.component';
import {ConfirmModalComponent} from './components/confirm-modal/confirm-modal.component';
import {ConfirmModalTextDirective} from './components/confirm-modal/confirm-modal-text.directive';
import {ConfirmModalTitleDirective} from './components/confirm-modal/confirm-modal-title.directive';
import {ConfirmModalCancelButtonTextDirective} from './components/confirm-modal/confirm-modal-cancel-button-text.directive';
import {ConfirmModalOKButtonTextDirective} from './components/confirm-modal/confirm-modal-ok-button-text.directive';
import { TourBoxComponent } from './components/tour-box/tour-box.component';
import { TourInfoModalComponent } from './components/tour-info-modal/tour-info-modal.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import { ParkingPositionMapComponent } from './components/parking-position-map/parking-position-map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    ClrFormsNextModule,
    LeafletModule
  ],
  declarations: [
    MomentPipe,
    TimeCreatedFilterComponent,
    TypeaheadComponent,
    ConfirmModalComponent,
    ConfirmModalTextDirective,
    ConfirmModalTitleDirective,
    ConfirmModalCancelButtonTextDirective,
    ConfirmModalOKButtonTextDirective,
    TourBoxComponent,
    TourInfoModalComponent,
    ParkingPositionMapComponent
  ],
  exports: [
    MomentPipe,
    TimeCreatedFilterComponent,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    ClrFormsNextModule,
    TypeaheadComponent,
    ConfirmModalComponent,
    ConfirmModalTextDirective,
    ConfirmModalTitleDirective,
    ConfirmModalCancelButtonTextDirective,
    ConfirmModalOKButtonTextDirective,
    TourBoxComponent,
    TourInfoModalComponent
  ]
})
export class SharedModule { }
