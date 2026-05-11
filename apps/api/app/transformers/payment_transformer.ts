import type Payment from '#models/payment'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class PaymentTransformer extends BaseTransformer<Payment> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'saleId',
      'method',
      'amount',
      'status',
      'paidAt',
      'createdAt',
      'updatedAt',
    ])
  }
}
