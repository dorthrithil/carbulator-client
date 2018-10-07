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
    TypeaheadComponent,
    ConfirmModalComponent,
    ConfirmModalTextDirective,
    ConfirmModalTitleDirective,
    ConfirmModalCancelButtonTextDirective,
    ConfirmModalOKButtonTextDirective
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
    ConfirmModalOKButtonTextDirective
  ]
})
export class SharedModule { }
