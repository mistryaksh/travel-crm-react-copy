import {
  Icon,
  UilAccessibleIconAlt,
  UilFire,
  UilShoppingCart,
  UilUmbrella,
  UilUtensils,
  UilVideo
} from '@iconscout/react-unicons';

interface AmenityProp {
  checked: boolean;
  label: string;
  radioItem: string[];
}
const amenitiesTypeData: string[] = ['free', 'paid'];

export const PopularAmenity: AmenityProp[] = [
  {
    checked: false,
    label: 'wifi',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'breakfast',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'gym',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'Swimming pool',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'In-room coffee/tea',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'Daily housekeeping',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'Bar / Lounge',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'Laundry',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'Newspaper',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'Bicycle',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'Air conditioning',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'Games room',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'Beach view',
    radioItem: amenitiesTypeData
  }
];

export const FoodAndDrink: AmenityProp[] = [
  {
    checked: false,
    label: 'Restaurants',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'Bars',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'In-Room Dining',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'Family-Friendly Dining',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'Breakfast Buffet',
    radioItem: amenitiesTypeData
  }
];

export const OutdoorAndView: AmenityProp[] = [
  {
    checked: false,
    label: 'Garden or Courtyard',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'Scenic Views',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'Sunbathing Areas',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'Outdoor Lounge Areas',
    radioItem: amenitiesTypeData
  }
];

export const Entertainment: AmenityProp[] = [
  {
    checked: false,
    label: 'Game Room',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: "Children's Play Area",
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'Sports Facilities',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'Babysitting Services',
    radioItem: amenitiesTypeData
  }
];

export const MediaAndTech: AmenityProp[] = [
  {
    checked: false,
    label: 'High-Speed Internet',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'Business Center',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'Video Conferencing Facilities',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'Virtual Reality (VR) Experiences',
    radioItem: amenitiesTypeData
  }
];

export const Accessibility: AmenityProp[] = [
  {
    checked: false,
    label: 'Accessible Common Areas',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'Accessible Parking Spaces',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'Accessible Fitness Center',
    radioItem: amenitiesTypeData
  },
  {
    checked: false,
    label: 'Accessible Swimming Pool',
    radioItem: amenitiesTypeData
  }
];

interface AminityDataProps {
  Icon: Icon;
  label: string;
  options: AmenityProp[];
  eventKey: string;
}

export const AmenitiesOptions: AminityDataProps[] = [
  {
    Icon: UilFire,
    label: 'Popular Amenities',
    options: PopularAmenity,
    eventKey: '0'
  },
  {
    Icon: UilUtensils,
    label: 'Food & Drink',
    options: FoodAndDrink,
    eventKey: '1'
  },
  {
    eventKey: '3',
    Icon: UilUmbrella,
    label: 'Outdoor & View',
    options: OutdoorAndView
  },
  {
    eventKey: '4',
    Icon: UilShoppingCart,
    label: 'Entertainment & Family Service',
    options: Entertainment
  },
  {
    eventKey: '5',
    Icon: UilVideo,
    label: 'Media & Technology',
    options: MediaAndTech
  },
  {
    eventKey: '6',
    Icon: UilAccessibleIconAlt,
    label: 'Accessibility',
    options: Accessibility
  }
];
