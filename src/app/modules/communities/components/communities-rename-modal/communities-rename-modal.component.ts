import {Component, ViewChild} from '@angular/core';
import {Community} from '../../../../models/community';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommunityService} from '../../../../services/crud/community.service';
import {CblNotificationsService} from '../../../../services/core/cbl-notifications.service';
import {ClrForm} from '@clr/angular';

/**
 * A modal for renaming a community.
 */
@Component({
  selector: 'cbl-communities-rename-modal',
  templateUrl: './communities-rename-modal.component.html',
  styleUrls: ['./communities-rename-modal.component.scss']
})
export class CommunitiesRenameModalComponent {

  /**
   * Reference to the clarity form instance.t
   */
  @ViewChild(ClrForm) clrForm;

  private community: Community;

  public isOpen = false;
  public isLoading = false;
  public communityForm: FormGroup;

  constructor(private fb: FormBuilder,
              private notifications: CblNotificationsService,
              private communityService: CommunityService) {
  }

  /**
   * Builds the community form.
   */
  buildForm() {
    this.communityForm = this.fb.group({
      'name': [this.community.name, [Validators.required, Validators.minLength(3)]]
    });
  }

  /**
   * Opens the modal for the given community.
   * @param community Community that shouls get renamed.
   */
  open(community: Community) {
    this.isOpen = true;
    this.community = community;
    this.buildForm();
  }

  /**
   * Renames the community and closes the modal.
   */
  rename() {
    if (this.communityForm.valid) {
      this.isLoading = true;
      this.communityService.renameCommunity(this.community, this.communityForm.get('name').value).subscribe(community => {
        this.community.name = community.name;
        this.isLoading = false;
        this.isOpen = false;
        this.notifications.success('Gruppe umbenannt', 'Deine Gruppe wurde erfolgreich umbenannt.');
      });
    } else {
      this.clrForm.markAsDirty();
    }
  }

  /**
   * Cancels the modal.
   */
  cancel() {
    this.community = null;
    this.isOpen = false;
  }

}
