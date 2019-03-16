import {Component, HostBinding, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ChangelogService, MinorVersion} from '../../services/core/changelog.service';

/**
 * A component that shows the changelog navigation and entries.
 */
@Component({
  selector: 'cbl-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.css']
})
export class ChangelogComponent implements OnInit {

  @HostBinding('class.content-container') contentContainerClass = true;

  public versions: Observable<MinorVersion[]>;
  public latestVersion: Observable<string>;

  constructor(public changelogService: ChangelogService) {
  }

  /**
   * Fetches the current versions and latest version.
   */
  ngOnInit() {
    this.versions = this.changelogService.getVersions();
    this.latestVersion = this.changelogService.getLatestVersion(this.versions);
  }

}
