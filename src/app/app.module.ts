import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'


import { AppComponent } from './app.component';
import { ArticleComponent } from './components/article.component';
import { NewsCriteriaComponent } from './components/news-criteria.component';
import { NewsService } from './news.service';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    NewsCriteriaComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [ NewsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
