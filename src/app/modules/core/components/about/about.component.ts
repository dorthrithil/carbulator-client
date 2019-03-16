import {Component, OnInit} from '@angular/core';
import {ChangelogService} from '../../../../services/core/changelog.service';

/**
 * A component for displaying an about page.
 */
@Component({
  selector: 'cbl-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public version: string;

  constructor(private changelohService: ChangelogService) {
  }

  /**
   * Loads the latest version on component initialization.
   */
  ngOnInit(): void {
    this.changelohService.getLatestVersion(this.changelohService.getVersions()).subscribe(version => {
      this.version = version;
    });
  }

}
