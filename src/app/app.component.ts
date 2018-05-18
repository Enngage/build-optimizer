import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import * as masonry from 'masonry-layout';
import { interval, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('grid') grid: ElementRef;

  private msnry: any;

  private readonly urls: string[] = [
    'https://www.ogttx.org/wp-content/themes/ogt/media/_frontend/img/bkg.jpg',
    'http://www.magicalkenya.com/wp-content/uploads/2014/08/homebannerimg4.jpg',
    'https://media.gadventures.com/media-server/cache/12/59/12591a5497a563245d0255824103842e.jpg',
    'https://i.pinimg.com/originals/1c/aa/c5/1caac55143e3e11461c6ae5962403deb.jpg',
    'http://littleguyintheeye.com/wp-content/uploads/2014/08/nature-3.jpg',
  ];

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.msnry = new masonry(this.grid.nativeElement, {
      itemSelector: '.grid-item',
      columnWidth: 330,
    });

    this.msnry.layout();


    const myInterval = interval(1000);

    const subscribe = myInterval
      .pipe(
        takeUntil(timer(10000))
      ).subscribe(() => {
        const url = this.urls[Math.floor(Math.random() * this.urls.length)];

        const imageElem = this.renderer.createElement('img');
        imageElem.setAttribute('src', url);
        imageElem.setAttribute(
          'style',
          `display: none; width:330px`
        );
        imageElem.className = 'grid-item';
        imageElem.addEventListener('load', () => {
          this.handleLoad(imageElem);
        });

        this.renderer.appendChild(this.grid.nativeElement, imageElem);
      });
  }

  private handleLoad(elem: any): void {
    this.renderer.setStyle(elem, 'display', 'block');
    this.msnry.appended(elem);
  }
}
