import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchN'
})
export class SearchNPipe implements PipeTransform {

  transform(list: any[], text: string) : any[] {
    if(!text) return list

    return list.filter(notice => notice.title.toUpperCase().includes(text.toUpperCase()))
  }

}
