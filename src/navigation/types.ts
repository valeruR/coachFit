import { CardType } from '../modules/coaching/components/ListComponents/types';

export type CoachNavigatorParamsList = {
  TabScreen: {
    id: string;
  };
  Message: undefined;
  Support: undefined;
};

export type DiscoveryNavigatorParamsList = {
  HomePage: undefined;
  CoachPage: {
    id: string;
  };
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

export type TopTabNavigatorParamsList = {
  About: {
    id: string;
  };
  Collections: {
    id: string;
  };
  Insight: {
    id: string;
  };
};
