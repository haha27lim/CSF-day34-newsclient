import { Component } from '@angular/core';
import { NewsService } from './news.service';
import { Article } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  articles: Article[] = []  // Define articles array of Article type

  constructor(private newsSvc: NewsService) { } // Inject NewsService dependency using constructor

  // Define ngOnInit lifecycle hook
  ngOnInit(): void {
    // Call onNewArticles method of NewsService using subscribe method
    this.newsSvc.onNewArticles.subscribe(
      p => {
        p.then(data => this.articles = data) // Update articles array with data received from NewsService
      }
    )

  }
}
