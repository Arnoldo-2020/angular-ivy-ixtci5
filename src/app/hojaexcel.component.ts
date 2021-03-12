import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ExcelSheetsService } from '../services/excel-sheets.service';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-hojaexcel',
  templateUrl: './hojaexcel.component.html',
  styleUrls: ['./hojaexcel.component.css']
})
export class HojaexcelComponent implements OnInit {

  
  constructor( private excelsheetService: ExcelSheetsService ) { }

  ngOnInit(): void {
  }
//
  filterPost = '';
  codigo: any = ''; 
  datos: string [][] = [];
  dataSource= [{}];
  displayedColumns: string[]= ['a', 'b', 'c', 'd', 'e', 'f', 'g' ];
  

  onFileChange( evt: any  ){

      const target: DataTransfer = <DataTransfer> (evt.target);
    
      if(target.files.length !== 1) throw new Error ('No se pueden subir varios archivos a la vez');
    
      const reader: FileReader = new FileReader();

    reader.onload = ( e: any ) => {
      const bstr: string = e.target.result;
  
      const wb: XLSX.WorkBook = XLSX.read( bstr, { type: 'binary' } );
  
      const wsname: string = wb.SheetNames[0];
  
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  
      this.datos = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      
  
      const dataobj = this.datos.map(function(row){
        return {
          a: row[0],
          b: row[1],
          c: row[2],
          d: row[3],
          e: row[4],
          f: row[5],
          g: row[6],
        }
      });
      console.log(dataobj);
      
      displayedColumns: [] = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

      this.dataSource= dataobj;

      

  
    }; 

      reader.readAsBinaryString(target.files[0]);

  }
  
  filterValue: string = '';
  dataSour = new MatTableDataSource(this.dataSource)
  applyFilter (fV: string){
    
    this.dataSour.filter = fV.trim().toLowerCase();
    console.log(this.dataSource);
  }

  look(data: string [][]){
    
    const found = data.flatMap( element => element ).find(element => element == this.codigo );
    console.log(found);
    if(found){
      console.log('Se encuentra');
    }else{
      console.log('No se encuentra');
    }

  }


  pasardata(){
    this.excelsheetService.impData( this.datos )
      .subscribe( resp => {
        console.log(resp);
      });

  }



  

}
