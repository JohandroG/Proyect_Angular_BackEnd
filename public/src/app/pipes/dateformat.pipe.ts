import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformat'
})
export class DateformatPipe implements PipeTransform {

  transform(date: string, ...args: unknown[]): any {
    
    let year = date.substring(0,4);
    let month = date.substring(5,7);
    let day = date.substring(8,10);

    let monthname = "";

    if(month == "12"){
      monthname = "diciembre"
    }
    if(month == "11"){
      monthname = "noviembre"
    }
    if(month == "10"){
      monthname = "octubre"
    }
    if(month == "09"){
      monthname = "septiembre"
    }
    if(month == "08"){
      monthname = "agosto"
    }
    if(month == "07"){
      monthname = "julio"
    }
    if(month == "06"){
      monthname = "junio"
    }
    if(month == "05"){
      monthname = "mayo"
    }
    if(month == "04"){
      monthname = "abril"
    }
    if(month == "03"){
      monthname = "marzo"
    }
    if(month == "02"){
      monthname = "febrero"
    }
    if(month == "01"){
      monthname = "enero"
    }

    return `${day} de ${monthname} del ${year}`;
  }

}
