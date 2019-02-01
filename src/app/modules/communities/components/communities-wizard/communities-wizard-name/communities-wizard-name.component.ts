import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Community} from '../../../../../models/community';
import {ClrForm} from '@clr/angular';

@Component({
  selector: 'cbl-communities-wizard-name',
  templateUrl: './communities-wizard-name.component.html',
  styleUrls: ['./communities-wizard-name.component.scss']
})
export class CommunitiesWizardNameComponent implements OnInit, OnDestroy {

  /**
   * If this wizard form is currently the active form, this input will be true.
   */
  @Input() isActiveForm: boolean;

  /**
   * Reference to the clarity form instance.t
   */
  @ViewChild(ClrForm) clrForm;

  private onDestroy: Subject<any>;

  public isValid = false;
  public nameForm: FormGroup;

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
   * Builds the name form and binds the validity state of the component to the form validity.
   */
  private buildForm() {
    this.nameForm = this.fb.group({
      'name': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]]
    });
    this.nameForm.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(() => {
      this.isValid = this.nameForm.valid;
    });
  }

  /**
   * Returns a community with the name from the form.
   * @return Community from form values.
   */
  public getCommunity(): Community {
    const community = new Community();
    community.name = this.nameForm.get('name').value;
    return community;
  }

}
