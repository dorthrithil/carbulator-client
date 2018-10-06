import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Car} from '../../../../../models/car';

@Component({
  selector: 'cbl-communities-wizard-car',
  templateUrl: './communities-wizard-car.component.html',
  styleUrls: ['./communities-wizard-car.component.scss']
})
export class CommunitiesWizardCarComponent implements OnInit, OnDestroy {

  private onDestroy: Subject<any>;

  public isValid = false;
  public carForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.onDestroy = new Subject();
  }

  /**
   * Builds the form on component initialization.
   */
  ngOnInit() {
    this.buildForm();
  }

  /**
   * Emits a destruction event on destruction of the component.
   */
  ngOnDestroy() {
    this.onDestroy.next();
  }

  /**
   * Builds the car form and binds the validity state of the component to the form validity.
   */
  private buildForm() {
    this.carForm = this.fb.group({
      'name': ['', []],
      'make': ['', [Validators.required]],
      'model': ['', [Validators.required]]
    });
    this.carForm.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
      this.isValid = this.carForm.valid;
    });
  }

  /**
   * Returns the car from the form values.
   * @return Car from form values.
   */
  public getCar(): Car {
    const car = new Car();
    car.name = this.carForm.get('name').value;
    car.make = this.carForm.get('make').value;
    car.model = this.carForm.get('model').value;
    return car;
  }

}
