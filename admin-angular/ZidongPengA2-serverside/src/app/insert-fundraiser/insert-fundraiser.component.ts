import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-insert-fundraiser',
  templateUrl: './insert-fundraiser.component.html',
  styleUrls: ['./insert-fundraiser.component.css']
})
export class InsertFundraiserComponent {
  organizer = '';
  caption = '';
  targetFunding: number | null = null;
  currentFunding: number | null = null;
  city = '';
  active: boolean = false;
  categoryID: number = 0;

  constructor(private dataService: DataService) {}

  /**
   * 
   * Insert a new fundraising event
   * 
   * Verify whether all fields have been 
   * filled in, and then call the data 
   * service to insert. Prompt the user and 
   * reset the form upon success, and display 
   * an error message upon failure
   * 
   */
  insertFundraiser() {
    if (!this.organizer || !this.caption || !this.targetFunding || !this.currentFunding || !this.city || !this.active || !this.categoryID) {
      alert("All fields are required!");
      return;
    }

    this.dataService.insertFundraiser(this.organizer,
      this.caption,
      this.targetFunding,
      this.currentFunding,
      this.city,
      this.active,
      this.categoryID).subscribe({
      next: (response) => {
        if (response.insert === 'success') {
          alert("Insert Success!");
          this.resetForm();
        } else {
          alert("Error: " + response.message);
        }
      },
      error: (error) => {
        console.error("Error:", error);
      }
    });
  }
  

  /**
   * 
   * Reset form fields to their initial state
   * 
   * 
   */
  resetForm() {
    this.organizer = '';
    this.caption = '';
    this.targetFunding = null;
    this.currentFunding = null;
    this.city = '';
    this.active = false;
    this.categoryID = 0;
  }
}
