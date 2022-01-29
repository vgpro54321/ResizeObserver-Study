import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';

@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!</h1>
  
  
<div #redDiv style="background-color: red;">Red div</div>

  `,
  styles: [`h1 { font-family: Lato; }`],
})
export class HelloComponent implements OnInit, AfterViewInit {
  @Input() name: string;
  @ViewChild('redDiv') redDiv: ElementRef;
  ro: ResizeObserver;

  constructor() {
    this.ro = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        const { left, top, width, height } = entry.contentRect;

        console.log('Element:', entry.target);
        console.log(`Element's size: ${width}px x ${height}px`);
        console.log(`Element's paddings: ${top}px ; ${left}px`);
      }
    });
  }

  ngOnInit() {
    //this.ro.observe(document.body);
  }

  ngAfterViewInit() {
    this.ro.observe(this.redDiv.nativeElement);
  }
}
