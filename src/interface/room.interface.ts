import { IAmenityProps } from './amenity.interface';
import { IDefaultEntityProps } from './default-entity.interface';
import { IRoomCategoryProps } from './room-category.interface';

export interface IRoomProps extends IDefaultEntityProps {
  room_category: IRoomCategoryProps[];
  room_name: string;
  bed_type: string;
  breakfast: boolean;
  base_price: number;
  currency_name: string;
  per_person_rate: number;
  number_of_beds: number;
  bathroom: number;
  balcony: number;
  room_type: number;
  room_size: number;
  adult: number;
  children: number;
  amenities: IAmenityProps[] | string;
  photos: string[];
}
