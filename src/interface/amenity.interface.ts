export interface IAmenitiesCategoryProps {
  AmenitiesCategoryId?: string;
  AmenitiesCategoryCode?: string;
  AmenitiesCategorySystem?: string;
  AmenitiesCategory: string;
  AmenitiesCategoryIcon: string;
}

export interface IAmenitiesProps {
  _id?: string;
  AmenitiesId?: string;
  AmenitiesCode?: string;
  AmenitiesCategoryId?: string[] | IAmenitiesCategoryProps[];
  AmenitiesName: string;
  AmenitiesIcon: string;
  AmenitiesShortDetail: string;
  isChargeable: boolean;
}
