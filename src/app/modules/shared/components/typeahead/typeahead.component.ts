import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  IterableDiffer,
  IterableDiffers,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Observable} from 'rxjs';
import {NotificationsService} from 'angular2-notifications';

interface Match {
  score: number;
  formattedString: string;
  matchedObject: any;
}

@Component({
  selector: 'cbl-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.less']
})
export class TypeaheadComponent implements OnChanges, DoCheck, OnInit {

  /**
   * A list of currently matched data objects.
   */
  public matchedDatapoints: Match[] = [];
  /**
   * Flag indicating if the dropdown is currently shown.
   */
  public showDropdown = false;
  /**
   * The id of the currently focused option button.
   */
  private focusedOptionButtonId: number;
  /**
   * An array of objects, that have been generated in createIfNotExists mode.
   */
  private createNewObjectHistory: any[] = [];
  /**
   * An iterable differ to check differences in the selected data array that may have been changed from outside the component.
   */
  private iterableDiffer: IterableDiffer<Array<any>>;
  /**
   * Flag indicating if currently there is new data queried.
   */
  private loadingNewData = false;

  /**
   * The containing element of the option buttons.
   */
  @ViewChild('optionButtonContainer') optionButtonContainer: ElementRef;
  /**
   * A QueryList of ElementRefs to the option buttons.
   */
  @ViewChildren('optionButton') optionButtons: QueryList<ElementRef>;
  /**
   * The model that is used in string completion mode.
   */
  @Input() stringModel = '';
  /**
   * Emits the new string after it changed.
   */
  @Output() stringModelChange: EventEmitter<string> = new EventEmitter<string>();
  /**
   * Validity status of the component. This is not changed from inside the component, so validation has to happen in the using component.
   */
  @Input() isValid = true;
  /**
   * Error message that is shown if the components validity status is false.
   */
  @Input() errorMessage = '';
  /**
   * An array of source data objects. In dynamic refresh mode, the new data should be put in here from the using component. Otherwise,
   * the inout should be left with it#s default value.
   */
  @Input() sourceData: any[] = [];
  /**
   * If true, the component will show all suggestions in the dropdown when no search string is given.
   */
  @Input() showAllSuggestionsWhenEmpty = false;
  /**
   * The search string which is used as a comparison for the suggestions.
   */
  @Input() searchString = '';
  /**
   * If true, the component will complete a string with suggestions from the source data stream (which has to deliver an array of strings
   * in this case). It will also allow the string to be changed to something that is not one of the suggestions.
   */
  @Input() stringCompletionMode = false;
  /**
   * If true, the component will give the user the option to select exactly one item from the list. This item will be synchronized with the
   * selectOneModel input field.
   */
  @Input() selectOneMode = false;
  /**
   * If true, the component will add selected objects to a collection (the selectedData input field).
   * NOTE: On component initialization, filtering out objects from the source data that are already in the selected data will only work if
   * the objects have an id!
   */
  @Input() addToCollectionMode = false;
  /**
   * The model that is updated with a selected item in select one mode.
   */
  @Input() selectOneModel: any;
  /**
   * Observable that emits an array of sourceData.
   */
  @Input() sourceDataStream: Observable<Array<any>>;
  /**
   * Array of selected objects. This can also be used to initialize the typeahead if used in an update mode.
   */
  @Input() selectedData: Array<any>;
  /**
   * The key to match the sourceObjects on. If none given, the data is expected to be strings and is matched directly.
   */
  @Input() searchKey: string = null;
  /**
   * The maximum number of items to display in the dropdown.
   */
  @Input() resultSetSize = 5;
  /**
   * Set this flag to true when using the sourceDataSearchStream. In this case the select2 will refresh the search data while typing.
   */
  @Input() dynamicRefresh = false;
  /**
   * Test that is displayed in the dropdown if no object matched. Not shown in string-completion mode and when createIfNotExists is active.
   */
  @Input() noMatchText = 'No match';
  /**
   * If true, there will be shown a button to create a new instance that will then be added to the selectedData collection.
   * If no objectCreationFactory function is given, this value is the plain string from the input.
   */
  @Input() createIfNotExists = false;
  /**
   * Prevents to create duplicates via the object generation function by a simple search string match of previously created objects.
   * If set to false, duplicates can be created.
   * NOTE: For duplicate prevention to work, the objects property with the name of searchKey has to be filled with the searchString by the
   * objectCreationFactory!
   */
  @Input() preventCreateNewDuplicates = true;
  /**
   * Placeholder text for the input field.
   */
  @Input() placeholder = '';
  /**
   * Emits the search string if it changes.
   */
  @Output() searchStringChange: EventEmitter<string> = new EventEmitter();
  /**
   * Emits the search string when dynamic refresh requests new source data.
   */
  @Output() requestNewSourceData: EventEmitter<string> = new EventEmitter();
  /**
   * Emits an object when it is selected from the dropdown.
   */
  @Output() select: EventEmitter<any> = new EventEmitter();
  /**
   * Emits an object if it is created by the objectCreationFactory in createIfNotExists mode.
   */
  @Output() createNew: EventEmitter<any> = new EventEmitter();
  /**
   * A string formatting function for formatting the displayed string in the dropdown.
   * Default is showing the string that was matched on with the matched part marked bold.
   * @param o The source object.
   * @param f The string that was matched on, formatted by making matched parts bold.
   */
  @Input() formatter: (object: any, formattedString: string) => string = (o, f) => f;
  /**
   * A string formatting function for formatting the displayed string in the select one label after selection.
   * Dafault is showing the selected objects search key property.
   * @param o The source object.
   */
  @Input() selectOneModelFormatter: (object: any) => string = (o) => o[this.searchKey];
  /**
   * A factory function that takes a string and returns any object. This is used if the input property createIfNotExists is set
   * to true;
   * @param s String that was typed into the search field.
   * @return An object, created on the basis of that string, that is added to the selectedData.
   */
  @Input() objectCreationFactory: (s: string) => any = (s) => s;

  constructor(private cdr: ChangeDetectorRef,
              private renderer: Renderer2,
              private notificationsService: NotificationsService,
              private iterableDiffers: IterableDiffers) {
    this.iterableDiffer = this.iterableDiffers.find([]).create(null);
  }

  /**
   * Checks constrains so that the component is not initialized with a wrong state.
   */
  ngOnInit() {
    const modes = [this.stringCompletionMode, this.addToCollectionMode, this.selectOneMode];
    if (modes.indexOf(true) === -1) {
      console.error('Select 2', 'Either stringCompletionMode, addToCollectionMode or selectOneMode has to be true!');
    }
    if (modes.filter(mode => mode).length > 1) {
      console.error('Select 2', 'Only one of the three modes can be be true!');
    }
    if (this.stringCompletionMode) {
      this.searchString = this.stringModel;
    }
  }

  /**
   * If the selected data has changed, the createNewObjectHistory has to be checked for removed objects to re-enable object creation.
   */
  ngDoCheck() {
    const changes = this.iterableDiffer.diff(this.selectedData);
    if (changes) {
      this.createNewObjectHistory = this.createNewObjectHistory.filter(o => this.selectedData.indexOf(o) !== -1);
      if (!this.dynamicRefresh) {
        this.getNewData();
      } else {
        this.requestNewSourceData.emit(this.searchString);
      }
    }
  }

  /**
   * Called if the sourceDataStream changes.
   * @param changes The detected changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sourceDataStream']) {
      this.getNewData();
    }
    if (changes['selectedData']) {
      this.filterOutAlreadySelectedObjects();
    }
    if (changes['sourceData']) {
      this.onSourceDataChange();
    }
  }

  /**
   * Called on change of the search string.
   * @param e The new search string.
   */
  searchStringChanged(e: string) {
    this.searchStringChange.emit(e);
    if (this.stringCompletionMode) {
      this.stringModel = this.searchString;
      this.stringModelChange.emit(this.stringModel);
    }
    if (this.searchString.length > 1) {
      this.requestNewSourceData.emit(this.searchString);
    }
    this.checkShowDropdown();
    this.matchData(this.searchString);
  }

  /**
   * Selects the currently focused option.
   */
  onEnterPress() {
    if (this.focusedOptionButtonId !== null) {
      if (!this.createIfNotExists) {
        this.selectMatch(this.matchedDatapoints[this.focusedOptionButtonId]);
      } else {
        if (!this.isFullMatch() && this.focusedOptionButtonId === 0) {
          this.createNewObject();
        } else {
          this.selectMatch(this.matchedDatapoints[this.focusedOptionButtonId - 1]);
        }
      }
    }
  }

  /**
   * On arrow down key down the pseudo focus of the option buttons is changed to the button with the next higher index.
   * @param event Native key down event
   */
  onArrowDownKeyDown(event) {
    if (this.showDropdown && this.optionButtons.length > 0) {
      if (this.focusedOptionButtonId !== null) {
        this.renderer.removeClass(this.optionButtons.toArray()[this.focusedOptionButtonId].nativeElement, 'pseudo-focus');
        this.focusedOptionButtonId = (this.focusedOptionButtonId + 1) % this.optionButtons.length;
      } else {
        this.focusedOptionButtonId = 0;
      }
      this.renderer.addClass(this.optionButtons.toArray()[this.focusedOptionButtonId].nativeElement, 'pseudo-focus');
      this.scrollOptionButtonInView(this.optionButtons.toArray()[this.focusedOptionButtonId]);
      event.preventDefault();
    }
  }

  /**
   * On arrow up key down the pseudo focus of the option buttons is changed to the button with the next lower index.
   * @param event Native key down event
   */
  onArrowUpKeyDown(event) {
    if (this.showDropdown && this.optionButtons.length > 0) {
      if (this.focusedOptionButtonId !== null) {
        this.renderer.removeClass(this.optionButtons.toArray()[this.focusedOptionButtonId].nativeElement, 'pseudo-focus');
        this.focusedOptionButtonId = this.focusedOptionButtonId - 1 >= 0 ? this.focusedOptionButtonId - 1 : this.optionButtons.length - 1;
      } else {
        this.focusedOptionButtonId = this.optionButtons.length - 1;
      }
      this.renderer.addClass(this.optionButtons.toArray()[this.focusedOptionButtonId].nativeElement, 'pseudo-focus');
      this.scrollOptionButtonInView(this.optionButtons.toArray()[this.focusedOptionButtonId]);
      event.preventDefault();
    }
  }

  /**
   * Scrolls the given option button into the view. This is needed as the dropdown may overflow and scroll. Navigation by buttons
   * doesn't scroll automatically.
   * @param optionButton The option button that should be made fully visible.
   */
  scrollOptionButtonInView(optionButton: ElementRef) {
    const scrollTop = this.optionButtonContainer.nativeElement.scrollTop;
    const upperContainerBound = 0;
    const lowerContainerBound = upperContainerBound + this.optionButtonContainer.nativeElement.offsetHeight;
    const upperButtonBound = optionButton.nativeElement.offsetTop - scrollTop;
    const lowerButtonBound = upperButtonBound + optionButton.nativeElement.offsetHeight;
    const isInView = upperButtonBound >= upperContainerBound && lowerButtonBound <= lowerContainerBound;
    if (!isInView) {
      if (upperButtonBound < upperContainerBound) {
        this.optionButtonContainer.nativeElement.scrollTop = scrollTop + upperButtonBound;
      }
      if (lowerButtonBound > lowerContainerBound) {
        this.optionButtonContainer.nativeElement.scrollTop = scrollTop + (lowerButtonBound - lowerContainerBound);
      }
    }
  }

  /**
   * Gets a new load of data from the sourceDataStream.
   */
  getNewData() {
    this.loadingNewData = true;
    this.sourceDataStream.subscribe(res => {
      this.loadingNewData = false;
      this.sourceData = res;
      this.onSourceDataChange();
    }, err => {
      this.notificationsService.error('Fehler', 'Daten konnten nicht geladen werden.');
      throw err;
    });
  }

  /**
   * Filters new source data and shows/hides the dropdown if necessary.
   */
  onSourceDataChange() {
    // The response will always contain already selected data. We have to filter it out.
    this.filterOutAlreadySelectedObjects();
    // If the dropdown is already open, we have to show some data!
    if (this.showDropdown) {
      this.matchData(this.searchString);
    }
    // If there is no data, hide it in any case
    if (this.sourceData.length === 0) {
      this.hideDropdown();
    }
  }

  /**
   * Matching function for data that is passed to the typeahead.
   * @param referenceString The string to compare the data to.
   */
  matchData(referenceString: string) {

    // Create all matches
    let allMatches = this.sourceData
      .filter(object => {
        // In add to collection mode we must not show selected data in matches
        return !this.addToCollectionMode || this.selectedData.indexOf(object) === -1;
      })
      .map(object => {
        let testString: string;
        if (this.searchKey) {
          testString = object[this.searchKey];
        } else {
          testString = object;
        }
        return this.getMatch(referenceString, testString, object);
      });

    if (this.showAllSuggestionsWhenEmpty && referenceString === '') {
      // Show everything if this option is activated and no input string is given
      this.matchedDatapoints = allMatches;
    } else {

      // Throw out no matches
      allMatches = allMatches.filter(match => match.score !== -1);

      // Sort by score
      allMatches.sort((a: Match, b: Match) => {
        return (a.score === b.score) ? 0 : (a.score > b.score) ? 1 : -1;
      });

      // Set top k matches
      this.matchedDatapoints = allMatches.slice(0, this.resultSetSize);
    }

    // Option buttons have been re-rendered: Update query list and reset pseudo focus tracking
    this.cdr.detectChanges();
    this.focusedOptionButtonId = null;

  }

  /**
   * Returns the match object for the given test object. The match score is the index at which the reference string
   * matches the test string. A lower score is better as in this case the match is more at the beginning of the
   * test string.
   * @param  referenceString The reference string for calculating the matching score if the given test string.
   * @param  testString The string to compare to the reference string.
   * @param object The object belonging to the tested strings.
   * @return  A Match object containing the match score, the formatted string to display in the dropdown and the
   * associated object.
   */
  getMatch(referenceString: string, testString: string, object: any): Match {
    const score = testString.toLowerCase().indexOf(referenceString.toLowerCase());
    return {
      score: score,
      formattedString: `${testString.substr(0, score)}<strong>${testString.substr(score, referenceString.length)}` +
      `</strong>${testString.substr(score + referenceString.length)}`,
      matchedObject: object
    };
  }

  /**
   * Checks if the dropdown shpuld be shown and shows it if so.
   * The dropdown is not shown if the searchstring is empty.
   */
  checkShowDropdown() {
    this.showDropdown = this.searchString.length > 0;
    if (this.showAllSuggestionsWhenEmpty && this.searchString.length === 0) {
      this.matchData(this.searchString);
      this.showDropdown = this.sourceData.length > 0;
    }
  }

  /**
   * Hides the dropdown.
   */
  hideDropdown() {
    this.showDropdown = false;
  }

  /**
   * Called by click on a match in the dropdown. This selects the associated object.
   * @param  match The Match object containing the reference to the matched object.
   */
  selectMatch(match: Match) {
    if (this.stringCompletionMode) {
      this.completeString(match.matchedObject);
    } else if (this.selectOneMode) {
      this.selectOneModel = match.matchedObject;
      this.select.emit(match.matchedObject);
      this.hideDropdown();
    } else if (this.addToCollectionMode) {
      this.selectedData.push(match.matchedObject);
      this.select.emit(match.matchedObject);
      this.searchString = '';
      this.hideDropdown();
    }
  }

  /**
   * Completes the search string by the given string suggestion.
   * @param  suggestion The suggestion that is used to complete the search string.
   */
  completeString(suggestion: string) {
    this.searchString = suggestion[this.searchKey];
    this.stringModel = this.searchString;
    this.stringModelChange.emit(this.stringModel);
    this.select.emit(suggestion);
    this.matchData(this.searchString);
    this.hideDropdown();
  }

  /**
   * Sets the selectOneModel to null and emits null as select event.
   */
  unselectOne() {
    this.selectOneModel = null;
    this.select.emit(null);
  }

  /**
   * Filters out objects from the sourceData that are already in the selectedData. This is done either by direct
   * comparison if the objects don't have an id property (then they should have primitive types) or by id.
   */
  filterOutAlreadySelectedObjects() {
    if (this.stringCompletionMode) {
      this.sourceData.filter(sourceString => sourceString !== this.searchString);
    } else if (this.selectOneMode && this.selectOneModel) {
      this.sourceData.filter(object => object['id'] !== this.selectOneModel['id']);
    } else if (this.addToCollectionMode) {
      if (this.sourceData.length > 0 && this.sourceData[0]['id']) {
        const selectedIds = this.selectedData.map(object => object['id']);
        this.sourceData = this.sourceData.filter(object => selectedIds.indexOf(object['id']) === -1);
      } else {
        this.sourceData.filter(object => this.selectedData.indexOf(object) !== -1);
      }
    }
  }

  /**
   * Creates a new object with the set object creation factory and adds it to the collection of selected data.
   */
  createNewObject() {
    if (!this.preventCreateNewDuplicates || this.isNoCreateNewDuplicate()) {
      const o = this.objectCreationFactory(this.searchString);
      this.selectedData.push(o);
      this.createNew.emit(o);
      this.createNewObjectHistory.push(o);
    }
    this.searchString = '';
    this.hideDropdown();
  }

  /**
   * Returns true if there hasn't already been an object created for the given search string.
   */
  isNoCreateNewDuplicate(): boolean {
    if (this.createNewObjectHistory.length === 0) {
      return true;
    }
    let foundDuplicate = false;
    this.createNewObjectHistory.map(o => {
      if (o[this.searchKey] === this.searchString) {
        foundDuplicate = true;
      }
    });
    return !foundDuplicate;
  }

  /**
   * Returns true, if the current search string fully matches one of the source data search key properties.
   */
  isFullMatch() {
    for (let i = 0; i < this.sourceData.length; i++) {
      if (this.sourceData[i][this.searchKey] === this.searchString) {
        return true;
      }
    }
    return false;
  }

  /**
   * Selects all objects available in the typeahead, works only in addToCollectionMode
   */
  selectAll() {
    if (this.addToCollectionMode) {
      this.sourceData.map(sourceDataElement => {
        this.selectedData.push(sourceDataElement);
        this.select.emit(sourceDataElement);
        this.searchString = '';
        this.hideDropdown();
      });
    }
  }

}
