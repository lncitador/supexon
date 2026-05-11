import type PieceRateRule from '#models/piece_rate_rule'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class PieceRateRuleTransformer extends BaseTransformer<PieceRateRule> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'workerRoleId',
      'operationTypeId',
      'itemId',
      'workstationId',
      'uom',
      'rate',
      'isActive',
      'startsAt',
      'endsAt',
      'createdAt',
      'updatedAt',
    ])
  }
}
