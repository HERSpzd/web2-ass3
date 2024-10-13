import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-update-fundraiser',
  templateUrl: './update-fundraiser.component.html',
  styleUrls: ['./update-fundraiser.component.css']
})
export class UpdateFundraiserComponent implements OnInit {
  id1 = sessionStorage.getItem('id')
  organizer = '';
  caption = '';
  targetFunding: number = 0;
  currentFunding: number = 0;
  city = '';
  active: boolean = false;
  categoryID: number = 0;
  id: string = sessionStorage.getItem('id') !== null ? sessionStorage.getItem('id')! : '';
  donationDetails: any;

  constructor(private dataService: DataService) { }

  // Called during component initialization to obtain donation details
  ngOnInit(): void {
    this.fetchDonationDetails();
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
   * 
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
   * Update information on fundraising activities.
   * 
   * Verify that all fields have been filled in, 
   * and then call the data service to update.
   * 
   */
  updateFundraiser() {
    if (!this.id || !this.organizer || !this.caption || this.targetFunding === null || this.currentFunding === null || !this.city || this.categoryID === 0) {
      alert('All fields are required!');
      return;
    }

    this.dataService.updateFundraiser(
      parseInt(this.id, 10),
      this.organizer,
      this.caption,
      this.targetFunding,
      this.currentFunding,
      this.city,
      this.active,
      this.categoryID
    ).subscribe({
      next: (data: any) => {
        if (data.update === "success") {
          alert('Fundraiser updated successfully!');
          this.resetForm();
        } else {
          alert('Error: ' + data.message);
        }
      },
      error: (error) => {
        console.error('Error:', error);
        alert('An error occurred while updating the fundraiser.');
      }
    });
  }

  /**
   * 
   * Obtain donation details for specific fundraising activities
   * 
   * If there is a valid ID, retrieve details from the data service
   * 
   */
  fetchDonationDetails(): void {
    if (this.id) {
      this.dataService.getFundraiserById(this.id).subscribe({
        next: (data: any) => {
          if (data !== null) {
            this.donationDetails = data;
          } else {
            console.log('No donation details found.');
          }
        },
        error: (error) => {
          console.error('Error fetching data', error);
        }
      });
    }
  }


  /**
   * 
   * Reset form fields to their initial state
   * 
   * 
   */
  resetForm(): void {
    this.organizer = '';
    this.caption = '';
    this.targetFunding = 0;
    this.currentFunding = 0;
    this.city = '';
    this.active = false;
    this.categoryID = 0;
  }
}
