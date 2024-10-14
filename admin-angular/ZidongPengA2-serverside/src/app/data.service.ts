import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * DataService class for linking REST API calls
 * from Angular App to the NodeJS express server
 * 
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = "http://localhost:3060/api/crowdfunding/"; // Server root URL
  
  // HTTP header, specifying the use of JSON format for communication
  private headers = new Headers({
    'Content-Type': 'application/json'
  });


  constructor(private http: HttpClient) { }

  /**
   * 
   * Function getAllFundraisers
   * 
   * Get all fundraising activities
   * 
   * @returns Observable<any>
   * 
   */
  public getAllFundraisers(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "all_fundraisers");
  }

  /**
   * 
   * Function getFundraiserById
   * 
   * Obtain a single fundraising event based on ID
   * 
   * @param id
   * @returns Observable<any>
   * 
   */
  public getFundraiserById(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + "fundraisers/" + id);
  }

  /**
   * 
   * Function insertFundraiser
   * 
   * add new fundraiser
   * 
   * @param organizer
   * @param caption
   * @param targetFunding
   * @param currentFunding
   * @param city
   * @param active
   * @param categoryId
   * @returns Observable<any>
   * 
   */
  public insertFundraiser(organizer: string, caption: string, targetFunding: number, currentFunding: number, city: string, active: boolean, categoryId: number): Observable<any> {
    return this.http.post<any>(this.apiUrl + "insert_fundraiser", {
      "ORGANIZER": organizer,
      "CAPTION": caption,
      "TARGET_FUNDING": targetFunding,
      "CURRENT_FUNDING": currentFunding,
      "CITY": city,
      "ACTIVE": active,
      "CATEGORY_ID": categoryId
    });
  }

  /**
   * 
   * Function updateFundraiser
   * 
   * Update fundraiser
   * 
   * @param id
   * @param organizer
   * @param caption
   * @param targetFunding
   * @param currentFunding
   * @param city
   * @param active
   * @param categoryId
   * @returns Observable<any>
   * 
   */
  public updateFundraiser(id: number, organizer: string, caption: string, targetFunding: number, currentFunding: number, city: string, active: boolean, categoryId: number): Observable<any> {
    return this.http.put<any>(this.apiUrl + "update_fundraiser/" + id, {
      "ORGANIZER": organizer,
      "CAPTION": caption,
      "TARGET_FUNDING": targetFunding,
      "CURRENT_FUNDING": currentFunding,
      "CITY": city,
      "ACTIVE": active,
      "CATEGORY_ID": categoryId
    });
  }

  /**
   * 
   * Function deleteFundraiser
   * 
   * Delete the fundraising event with the specified ID.
   * 
   * @param id
   * @returns Observable<any>
   * 
   */
  public deleteFundraiser(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "delete_fundraiser/" + id);
  }






}
