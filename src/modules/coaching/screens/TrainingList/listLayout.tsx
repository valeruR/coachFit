import { cardioWorkout, calisthenics, homeWorkout } from '../../../../assets';
import { CardItemType, CardType } from '../../components/ListComponents/types';

const cardData = [
  {
    img: cardioWorkout,
    title: 'Cardio Program',
    coach: 'Reever Valerus',
  },
  {
    img: calisthenics,
    title: 'Calisthenics Program',
    coach: 'Alassane Fall',
  },
  {
    img: homeWorkout,
    title: 'Home Workout Program',
    coach: '',
  },
];

export const swiperLayout = [
  {
    img: cardioWorkout,
    key: 'cardio',
  },
  {
    img: calisthenics,
    key: 'calisthenics',
  },
  {
    img: homeWorkout,
    key: 'home workout',
  },
];

type LayoutType = {
  data: CardItemType[];
  type: CardType;
  category: string;
};

export const layout: LayoutType[] = [
  {
    data: cardData,
    type: 'card',
    category: 'training',
  },
  {
    data: cardData,
    type: 'longCard',
    category: 'cardio',
  },
];
