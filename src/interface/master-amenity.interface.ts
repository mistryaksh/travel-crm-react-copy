import { IDefaultEntityProps } from './default-entity.interface';

export interface IMasterAmenityProps extends IDefaultEntityProps {
  _id?: string;
  amenity_name: string;
  default_action: boolean;
}
