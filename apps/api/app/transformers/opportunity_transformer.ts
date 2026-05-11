import type Opportunity from '#models/opportunity'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class OpportunityTransformer extends BaseTransformer<Opportunity> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'customerId',
      'title',
      'stage',
      'expectedValue',
      'expectedCloseDate',
      'createdAt',
      'updatedAt',
    ])
  }
}
