import { IAmenitiesProps } from './amenity.interface';
import { IDefaultEntityProps } from './default-entity.interface';

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
  amenities: IAmenitiesProps[] | string;
  photos: string[];
}

export interface IRoomCategoryProps {
  _id?: string;
  RoomCategoryId?: string;
  RoomCategoryCode?: string;
  RoomCategorySystemCode?: string;
  RoomCategory: string;
  RoomCategoryIcon: string;
}
