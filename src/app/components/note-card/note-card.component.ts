import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {
  //viewchild attriute is use so we do some logic based on component attributes or property in here we are using this to work with hide long text truncation operation
  // https://blog.angular-university.io/angular-viewchild/
  @ViewChild('truncator', { static: true }) truncator: ElementRef<HTMLElement>;
  @ViewChild('bodyText', { static: true }) bodyText: ElementRef<HTMLElement>; //ElementRef simply wraps the native DOM element, and we can retrieve it by accessing the nativeElement property.
  //to pass messages from parent to child component
  @Input() title: string;
  @Input() body: string;



  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    //work ou if there is a text overflow and if not then hide the truncator
    //getting the style of the bodyText
    let style = window.getComputedStyle(this.bodyText.nativeElement, null); //getComputedStyle is used to get all the computed style
    let viewableHeight = parseInt(style.getPropertyValue("height"), 10);//get property value is used to get the property value //10-> base 10

    if (this.bodyText.nativeElement.scrollHeight > viewableHeight) {
      //if there is a text overflow show the fade out trucator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    }
    /*else {
      //if there is no txt overflow the no need to shw the fade out
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
     }*/
  }


}
