import { Component, OnInit } from '@angular/core';
import { Country, GetNewsCommand, SearchCriteria } from '../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService } from '../news.service';
import { NEWS_CATEGORIES } from '../constants';

@Component({
  selector: 'app-news-criteria',
  templateUrl: './news-criteria.component.html',
  styleUrls: ['./news-criteria.component.css']
})
export class NewsCriteriaComponent implements OnInit {

	// Declare variables for the component
  	countries: Country[] = [] // An array of countries
	categories = NEWS_CATEGORIES // An array of news categories
	flag: string | undefined = "" // A string to store a country's flag

	form!: FormGroup // A form group object

	// Inject the necessary dependencies
	constructor(private fb: FormBuilder , private newsSvc: NewsService) { }

	// Executes on component initialization
	ngOnInit(): void {
		// Obtain the list of available countries
		this.newsSvc.getCountries()
			.then(result => this.countries = result)

		// Define the form controls and their validators
		this.form = this.fb.group({
			code: this.fb.control('', [ Validators.required ]),
			category: this.fb.control('', [ Validators.required ])
		})
	}

	// Executes when the selected country changes
	onCountryChange(selectElem: any) {
		const code = selectElem.target.value // Get the selected country code
		const country = this.countries.find(c => c.code == code) // Find the country object using the code
		this.flag = country?.flag // Get the country's flag
	}

	// Executes when the search button is clicked
	performSearch() {
		const criteria = this.form.value as SearchCriteria // Obtain the form criteria values
		console.info('>>> criteria: ', criteria)  // Log the criteria to the console for debugging 

    this.newsSvc.execute.next({ criteria } as GetNewsCommand ) // Use the News Service to execute the search
	}

}
