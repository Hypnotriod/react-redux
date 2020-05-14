
/**
 *
 * @author Ilya Pikin
 */

export type ProductUnits = 'pcs' | 'kg' | 'gr' | 't' | 'l' | 'gal' | 'lb';

export default interface ProductQueryResult {
    id: string;
    name: string;
    units: ProductUnits;
    type: string;
    price: number;
    currency: string;
    inStockQuantity: number;
    isFractional: boolean;
    description: string;
    discounts: object[];
    reservedQuantity: number | undefined;
    isHidden: boolean | undefined;
    version: number | undefined;
    createdAt: string | undefined;
    updatedAt: string | undefined;
}
