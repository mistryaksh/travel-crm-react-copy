import { IDefaultEntityProps } from './default-entity.interface';
import { IMasterAmenityProps } from './master-amenity.interface';

export interface IAmenityProps extends IDefaultEntityProps {
  _id?: number;
  amenity_name: string;
  default_action: boolean;
  mst_amenities: IMasterAmenityProps | string;
}
