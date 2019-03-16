import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

/**
 * Interface for the structure of PatchVersions.
 */
export interface PatchVersion {
  patch: string;
  releaseDate: string;
  changes: {
    added: string[],
    changed: string[],
    deprecated: string[],
    removed: string[],
    fixed: string[],
    security: string[]
  };
}

/**
 * Interface for the structure of MinorVersions.
 */
export interface MinorVersion {
  minor: string;
  patches: PatchVersion[];
}

/**
 * A service for fetching the current changelog entries.
 */
@Injectable({
  providedIn: 'root'
})
export class ChangelogService {

  constructor(private http: HttpClient) {
  }

  /**
   * Returns the changelog versions.
   * @returns Observable of MinorVersions.
   */
  public getVersions(): Observable<MinorVersion[]> {
    return this.http.get<MinorVersion[]>('assets/changelog.json');
  }

  /**
   * Get's the latest version that is documented in the changelog.
   * @param versions Observable of MinorVersions.
   * @returns Observable of the latest version.
   */
  public getLatestVersion(versions: Observable<MinorVersion[]>): Observable<string> {
    return versions.pipe(
      map(res => {
        return res[0].patches[0].patch;
      })
    );
  }

}
