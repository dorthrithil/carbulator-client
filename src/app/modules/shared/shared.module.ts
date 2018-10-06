import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MomentPipe} from '../../pipes/moment.pipe';
import { TimeCreatedFilterComponent } from '../../utility/datagrid-filters/time-created-filter/time-created-filter.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClarityModule, ClrFormsNextModule} from '@clr/angular';
import {TypeaheadComponent} from './components/typeahead/typeahead.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    ClrFormsNextModule,
  ],
  declarations: [
    MomentPipe,
    TimeCreatedFilterComponent,
    TypeaheadComponent
  ],
  exports: [
    MomentPipe,
    TimeCreatedFilterComponent,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    ClrFormsNextModule,
    TypeaheadComponent
  ]
})
export class SharedModule { }
