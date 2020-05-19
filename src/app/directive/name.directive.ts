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
    console.log(initalValue);
    
    this.el.nativeElement.value = initalValue.replace(/[^a-zA-Zñ ]*/g, '');
    console.log(this.el.nativeElement.value);
    if (initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    } else {
      this.el.nativeElement.value = this.titleCase.transform(this.el.nativeElement.value);
      console.log(this.el.nativeElement.value);
    }
  }

}
