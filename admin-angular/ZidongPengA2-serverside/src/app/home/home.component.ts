import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // An array for storing fundraisers
  fundraisers: any[] = [];
  // Error Message
  errorMessage: string = '';

  constructor(private dataService: DataService) { }

  // Load fundraising activities during component initialization
  ngOnInit() {
    this.loadFundraisers();
  }


  /**
   * 
   * Load all fundraising activities 
   * from the data service.
   * When successful, store the data in 'fundraisers'.
   * When there is an error, set 'ErrrMessage'
   * 
   */
  loadFundraisers(): void {
    this.dataService.getAllFundraisers().subscribe({
      next: (data) => this.fundraisers = data,
      error: (error) => this.errorMessage = 'Failed to load data',
      complete: () => console.log('Fundraisers loaded successfully')
    });

  }

  /**
   * 
   * Return the corresponding image path based on the given ID
   * 
   * 
   * 
   * @param id 
   * @returns image path
   */
  getImage(id: number): string {
    if (id <= 5) {
      return `assets/image${id}.png`;
    } else {
      return `assets/image.png`;
    }
  }

  /**
   * 
   * Function changeToActiveOrInactive
   * 
   * Change 1 to "Active" and also change
   * 0 to "Inactive"
   * 
   * @param active 
   * @returns Acitive or Inactive
   */
  changeToActiveOrInactive(active: number): string {
    if (active === 1) {
      return 'Active';
    } else {
      return 'Inactive';
    }
  }

  /**
   * 
   * Save the specified ID to 'session Storage'
   * 
   * @param id 
   * 
   */
  saveId(id: number) {
    if (typeof (Storage) !== 'undefined') {
      sessionStorage.setItem('id', id.toString());
    }
  }

  /**
   * 
   * Delete fundraising activities based on ID.
   * When successful, prompt the user and reload the fundraising activity list.
   * 
   * @param id 
   * 
   */
  deleteByID(id: number) {
    this.dataService.deleteFundraiser(id).subscribe({
      next: (response) => {
        if (response.delete === 'Delete Sucess') {
          alert('Fundraiser deleted successfully! Please refresh this page to check!');
          this.loadFundraisers();
        } else {
          alert('Error: ' + response.message);
        }
      },
      error: (error) => console.error('Error:', error)
    });
  }

}
