import {Directive, ElementRef, HostBinding, OnInit} from '@angular/core';
import {AuthService} from '../services/core/auth.service';

@Directive({
  selector: '[cblDynamicContentArea]'
})
export class DynamicContentAreaDirective implements OnInit {

  /**
   * A host binding that attached a class which removes padding from the content area, for e.g. displaying the login page correctly.
   */
  @HostBinding('class.no-padding') noPaddingClass = true;

  constructor(private auth: AuthService) {
  }

  /**
   * On component initialization, the login state is subscribed to, to bind the no padding class to it.
   */
  ngOnInit() {
    this.noPaddingClass = !this.auth.isLoggedIn;
    this.auth.onLoginStateChanges.subscribe(isLoggedIn => this.noPaddingClass = !isLoggedIn);
  }

}
