import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginatePipe } from './paginate.pipe';
import { PaginationService } from './pagination.service';
export { PaginatePipe } from './paginate.pipe';
export { PaginationService } from './pagination.service';

@NgModule({
    imports: [CommonModule],
    declarations: [
        PaginatePipe,
    ],
    providers: [PaginationService],
    exports: [PaginatePipe]
})
export class NgxPaginationModule { }