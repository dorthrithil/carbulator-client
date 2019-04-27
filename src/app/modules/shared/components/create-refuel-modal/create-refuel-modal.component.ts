import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Refuel} from '../../../../models/refuel';
import {RefuelService} from '../../../../services/crud/refuel.service';
import {numberValidator} from '../../../../utility/validators/number.validator';
import {toNumber} from '../../../../utility/conversion/to-number';
import {CblNotificationsService} from '../../../../services/core/cbl-notifications.service';
import {ClrForm} from '@clr/angular';
import {AppEventsService} from '../../../../services/core/app-events.service';

/**
 * A modal for creating refuels.
 */
@Component({
  selector: 'cbl-create-refuel-modal',
  templateUrl: './create-refuel-modal.component.html',
  styleUrls: ['./create-refuel-modal.component.scss']
})
export class CreateRefuelModalComponent {

  /**
   * Reference to the clarity form instance.
   */
  @ViewChild(ClrForm) clrForm;

  /**
   * The id of the community in which to create a refuel.
   */
  @Input() communityId: number;

  /**
   * Emits the created refuel.
   */
  @Output() refuelAdded: EventEmitter<Refuel> = new EventEmitter();

  public refuelForm: FormGroup;
  public isOpen = false;
  public isLoading = false;

  constructor(private fb: FormBuilder,
              private appEvents: AppEventsService,
              private notifications: CblNotificationsService,
              private refuelService: RefuelService) {
  }


  /**
   * Builds the refuel form.
   */
  private buildForm() {
    this.refuelForm = this.fb.group({
      costs: [0, [Validators.required, numberValidator(), Validators.min(0.01)]],
      liters: [0, [numberValidator()]],
      gasStationName: ['', Validators.maxLength(120)],
    });
  }

  /**
   * Opens the modal.
   */
  public open() {
    this.isOpen = true;
    this.buildForm();
  }

  /**
   * Closes the modal.
   */
  public close() {
    this.isOpen = false;
    this.isLoading = false;
  }

  /**
   * Persists the new refuel on the server and closes the modal.
   */
  public addRefuel() {
    if (this.refuelForm.valid) {
      this.isLoading = true;
      const newRefuel = new Refuel();
      newRefuel.costs = toNumber(this.refuelForm.get('costs').value);
      newRefuel.liters = toNumber(this.refuelForm.get('liters').value);
      newRefuel.gasStationName = this.refuelForm.get('gasStationName').value;
      this.refuelService.createRefuel(this.communityId, newRefuel).subscribe(refuel => {
        this.refuelAdded.emit(refuel);
        this.appEvents.dispatchRefuelEnteredEvent(refuel);
        this.close();
        this.notifications.success('Tankfüllung eingetragen', 'Die Tankfüllung wurde eingetragen.');
      }, () => {
        this.isOpen = false;
        this.close();
      });
    } else {
      this.clrForm.markAsDirty();
    }
  }

}
