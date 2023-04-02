import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../models';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articles$!: Promise<Article[]> // declares a Promise of Article objects

  // declares an input property, 'articles', of type Article array with default value empty
  @Input()
  articles: Article[] = []

  constructor(private newsSvc: NewsService) { }

  ngOnInit(): void {
    // subscribes to onNewArticles event and assigns its value to articles$
    this.newsSvc.onNewArticles.subscribe(
      p => {
        this.articles$ = p
      }
    )
  }
}
