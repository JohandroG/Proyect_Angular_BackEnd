import {MatPaginatorIntl} from '@angular/material/paginator';
import {Injectable} from '@angular/core';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
constructor() {
    super();
}

override itemsPerPageLabel = 'Anuncios por página: ';
override nextPageLabel = 'Página siguiente';
override previousPageLabel = 'Página anterior';
override firstPageLabel: string = "Primera Pagina";
override lastPageLabel: string = "Ultima Pagina";

override getRangeLabel = (page: number, pageSize: number, length: number) =>  {
    if (length === 0 || pageSize === 0) {
    return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
}
}