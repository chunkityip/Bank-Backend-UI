import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-payment-page',
  imports: [],
  templateUrl: './payment-page.html',
  styleUrl: './payment-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentPage {}
