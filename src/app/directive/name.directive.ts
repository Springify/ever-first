import { Directive, ElementRef, HostListener } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Directive({
  selector: '[name]'
})
export class NameDirective {

  constructor(private el: ElementRef, private titleCase: TitleCasePipe) { }

  @HostListener('input', ['$event'])
  onInputChange(event) {
    const initalValue = this.el.nativeElement.value;
    
    this.el.nativeElement.value = initalValue.replace(/[^a-zA-Zñ ]*/g, '');
    if (initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    } else {
      this.el.nativeElement.value = this.titleCase.transform(this.el.nativeElement.value);
    }
  }

}
