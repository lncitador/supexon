import type BomLine from '#models/bom_line'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class BomLineTransformer extends BaseTransformer<BomLine> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'tenantId',
      'bomId',
      'componentItemId',
      'quantity',
      'uom',
      'createdAt',
      'updatedAt',
    ])
  }
}
