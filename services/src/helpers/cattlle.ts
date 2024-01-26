import { IUser } from '../utils/types';

interface IProps {
  minPrice: number;
  maxPrice: number;
  location: any;
  title: string;
  description: string;
  isNegotiable: boolean;
  currentMilkCapacity: number;
  maximumMilkCapacity: number;
  pregnancyNumber: number;
  skip: number;
  take: number;
  user?: IUser;
  categoryIds: number[];
  distance?: number;
}
export const findCattleQueryMakerFn = (body: IProps) => {
  const {
    minPrice,
    maxPrice,
    location,
    title,
    description,
    isNegotiable,
    currentMilkCapacity,
    maximumMilkCapacity,
    pregnancyNumber,
    user,
    skip = 0,
    take = 10,
    categoryIds,
    distance = 100,
  } = body;

  let where: any = {
    current_milk_capacity: {
      gte: currentMilkCapacity || 0,
    },
    maximum_milk_capacity: {
      gte: maximumMilkCapacity || 0,
    },
    pregnancy_number: {
      gte: pregnancyNumber || 0,
    },
  };
  if (categoryIds) {
    where.categoryId = { in: categoryIds };
  }
  if (minPrice || maxPrice) {
    where.price = {
      gte: minPrice ? minPrice : 0,
      lte: maxPrice ? maxPrice : Number.MAX_SAFE_INTEGER,
    };
  }
  // Todo: We need to do it later. It should be done based on co-ordinates.
  if (location) {
    where.lat = {
      gte: location.lat - distance / 111,
      lte: location.lat + distance / 111,
    };
    where.long = {
      gte:
        location.long -
        distance / (111 * Math.cos(location.lat * (Math.PI / 180))),
      lte:
        location.long +
        distance / (111 * Math.cos(location.lat * (Math.PI / 180))),
    };
  }

  if (title) {
    where.title = {
      contains: title,
    };
  }
  if (isNegotiable) {
    where.is_negotiable = isNegotiable || false;
  }

  if (description) {
    where.description = {
      contains: description,
    };
  }

  // With this object we are fetching data
  let mainFinder: any = {
    skip: skip,
    take: take,
    include: {
      seller: {
        select: {
          name: true,
          phone_number: true
        },
      },
    },
    where,
  };

  if (user) {
    mainFinder.where = {
      ...mainFinder.where,
      NOT: {
        sellerId: user.id,
      },
    };
  }

  return mainFinder;
};
