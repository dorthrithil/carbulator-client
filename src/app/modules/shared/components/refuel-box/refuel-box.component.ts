import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Refuel} from '../../../../models/refuel';

/**
 * A component that shows a refuel in a box.
 */
@Component({
  selector: 'cbl-refuel-box',
  templateUrl: './refuel-box.component.html',
  styleUrls: ['./refuel-box.component.scss']
})
export class RefuelBoxComponent {

  /**
   * The refuel to show in the box.
   */
  @Input() refuel: Refuel;

  /**
   * EventEmitter that emits the refuel when it was deleted.
   */
  @Output() deleted: EventEmitter<Refuel> = new EventEmitter();

  /**
   * Emits the refuel when it was deleted via the deleted output.
   */
  onDeleted() {
    this.deleted.emit(this.refuel);
  }

}
