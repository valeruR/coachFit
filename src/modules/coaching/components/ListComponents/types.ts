import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DiscoveryNavigatorParamsList } from '../../../../navigation/types';

export type CardItemType = {
  img: string;
  title: string;
  coach: string;
  key?: string;
};

export type CardType = 'card' | 'longCard';

export type CardRendererProps = {
  type: CardType;
  data: CardItemType[];
};

export type HorizontalListProps = {
  cardType: CardType;
  category: string;
  data: CardItemType[];
  navigation: NativeStackNavigationProp<
    DiscoveryNavigatorParamsList,
    'HomePage'
  >;
};
