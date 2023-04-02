import { Injectable } from '@angular/core';
import { Article, Country, GetNewsCommand, SearchCriteria } from './models';
import { Subject, firstValueFrom, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { COUNTRY_API, COUNTRY_CODES, NEWS_API } from './constants';


const API_KEY = "__YOUR_API_KEY__"

// Declare that the service can be provided at the root level
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  // Declare a public countries member variable of type Country[] and initialize to an empty array
  countries: Country[] = [] 

  // Create a new anonymous subject that accepts items of type GetNewsCommand when subscribed to
  execute = new Subject<GetNewsCommand>()
  // Create a new anonymous subject that accepts items of type Promise<Article[]> when subscribed to
  onNewArticles = new Subject<Promise<Article[]>>()

  // Declare constructor with an http parameter of type HttpClient. This class will use HttpClient to make HTTP requests.
	constructor(private http: HttpClient) {
    // Subscribe to the execute subject
    this.execute.subscribe(command => {
      // Invoke .next() on the onNewArticles subject with the result of the getNews method 
      this.onNewArticles.next(
        // Invoke the getNews method with the command's criteria
        this.getNews(command.criteria)
      )
    })

  }

  // Declare a public getNews method that takes a parameter of type SearchCriteria and returns a Promise of an array of Articles
  getNews(criteria: SearchCriteria): Promise<Article[]> {
    console.info('>> criteria: ', criteria)
    // Create a new instance of the HttpParams class
    const params = new HttpParams()
        .set('country', criteria.code)
        .set('category', criteria.category)
        .set('pageSize', '10')
        .set('apiKey', API_KEY)
    // Returns the first value from the observable sequence with the specified Source to make the request.
    return firstValueFrom(
      // Invoke the get() method on the HttpClient object and pass in the NEWS_API endpoint URL and the params object as parameters.
      this.http.get<Article[]>(NEWS_API, { params })
        .pipe(
          map((data: any) => data.articles as any[]),
          map((data: any[]) => {
            return data.map(a => {
              return {
                author: a.author,
                title: a.title,
                description: a.description,
              } as Article
            })
          })
        )
    ).then(result => {
      // Log some debug info about the result of the firstValueFrom() function
      console.info('>>> result: ', result)
      return result
    }) as Promise<Article[]>
  }
  

  // Define a function named getCountries that returns a Promise of an array of Countries
	getCountries(): Promise<Country[]> {
    // If the countries array already has values, return them
		if (!!this.countries.length)
			return Promise.resolve(this.countries)

    // Otherwise, create a new instance of the HttpParams class with some parameters
		const params = new HttpParams()
					.set('codes', COUNTRY_CODES)
    // Use the firstValueFrom() function to subscribe to the first emitted value of an Observable sequence
		return firstValueFrom(
			this.http.get<Country[]>(COUNTRY_API, { params })
		).then(result => {
      // Map the response data to an array of Country objects
			this.countries = result.map(
				(c: any) => (
					{
						name: c.name.official,
						code: c.cca2.toLowerCase(),
						flag: c.flags.png
					} as Country
				)
			)
      // Sort the countries array alphabetically by name
			this.countries.sort((a, b) => a.name > b.name? 1: -1)
      // Return the countries array
			return this.countries
		})
	}
}
