import { CardType } from '../modules/coaching/components/ListComponents/types';

export type CoachNavigatorParamsList = {
  About: undefined;
  Collections: undefined;
  Insight: undefined;
};

export type DiscoveryNavigatorParamsList = {
  HomePage: undefined;
  ShowAll: {
    type: CardType;
    category: string;
  };
};

export type TabStackNavigatorParamsList = {
  Discovery: undefined;
  Coach: CoachNavigatorParamsList;
  Profile: undefined;
};

export type AppStackNavigatorParamList = {
  Tabs: TabStackNavigatorParamsList;
};

export type NavigatorParamList = {
  AppStack: undefined;
  Login: undefined;
};
