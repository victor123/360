import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'BooleanMap'})
export class BooleanConverterPipe implements PipeTransform {
    transform(value) {
        return value ? 'Yes' : 'No';
    }
}

