
export interface IMedicine {

  id: number;

  name: string;

  brand: string;

  quantity: number;

  price: number;

  notes: string;

  expiryDate: any;

  expiryStatus?: boolean;
}
