import {Component, OnInit} from '@angular/core';
import {ChangelogService, MinorVersion, PatchVersion} from '../changelog.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

/**
 * A component that shows a changelog entry.
 */
@Component({
  selector: 'cbl-changelog-entry',
  templateUrl: './changelog-entry.component.html',
  styleUrls: ['./changelog-entry.component.css']
})
export class ChangelogEntryComponent implements OnInit {

  private versionNumber: string;
  private versions: MinorVersion[];
  private routeSubscription: Subscription;

  public version: PatchVersion;
  public loadingError = false;

  constructor(private changelogService: ChangelogService, private route: ActivatedRoute) {
  }

  /**
   * Initializes the changelog with the version given in the route parameter or latest version.
   */
  ngOnInit() {
    this.changelogService.getVersions()
      .subscribe(res => {
        this.versions = res;
        this.routeSubscription = this.route.paramMap.subscribe(paramMap => {
          this.versionNumber = paramMap.get('versionNumber');
          if (this.versionNumber && this.versions) {
            this.changeVersion();
          }
        });
        if (!this.versionNumber) {
          this.versionNumber = this.versions[0].patches[0].patch;
        }
        this.changeVersion();
      }, err => {
        this.loadingError = true;
        throw err;
      });
  }

  /**
   * Loads the version that is specified in versionNumber.
   */
  private changeVersion() {
    const foundPatch = false;
    for (const minorVersion of this.versions) {
      if (foundPatch) {
        break;
      }
      for (const patchVersion of minorVersion.patches) {
        if (patchVersion.patch === this.versionNumber) {
          this.version = patchVersion;
          break;
        }
      }
    }
  }

}
