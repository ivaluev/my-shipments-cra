export type ShipmentCargo = {
  type: string
  description: string
  volume: string
}

export type ShipmentService = {
  type: string
}

export type Shipment = {
  id: string
  name: string
  cargo: ShipmentCargo[]
  mode: string
  type: string
  destination: string
  origin: string
  services: ShipmentService[]
  total: string
  status: string
  userId: string
}

export class DataPage {
  constructor(shipments: Shipment[], page: number, pageSize = 20) {
    const indexStart = pageSize * (page - 1)
    const indexEnd = Math.min(indexStart + pageSize, shipments.length)

    this.items = shipments.slice(indexStart, indexEnd) || []
    this.pagesTotal = Math.ceil((shipments.length || 0) / pageSize)
    this.page = page || 1
  }

  items: Shipment[]

  pagesTotal: number

  page: number
}
