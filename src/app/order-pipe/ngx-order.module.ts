
import { NgModule } from '@angular/core';
import { OrderPipe } from './ngx-order.pipe';

@NgModule({
  declarations: [OrderPipe],
  exports: [OrderPipe]
})
export class OrderModule {}
