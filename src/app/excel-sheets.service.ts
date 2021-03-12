import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ExcelSheetsService {
  private url =
    "https://prueba-73b96-default-rtdb.europe-west1.firebasedatabase.app";

  constructor(private http: HttpClient) {}

  impData(sheetdata: string[][]) {
    return this.http.post(`${this.url}/Sheets.json`, sheetdata);
  }
}
