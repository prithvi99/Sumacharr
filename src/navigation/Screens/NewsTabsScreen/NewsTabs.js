import {StyleSheet, useWindowDimensions} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import TopBar from '../../../components/TopBar/TopBar';
import {useState} from 'react';
import ForYou from '../../../components/NewsCategories/ForYou/ForYou';
import World from '../../../components/NewsCategories/World/World';
import Business from '../../../components/NewsCategories/Business/Business';
import Sports from '../../../components/NewsCategories/Sports/Sports';
import Entertainment from '../../../components/NewsCategories/Entertainment/Entertainment';
import Technology from '../../../components/NewsCategories/Technology/Technology';
import Health from '../../../components/NewsCategories/Health/Health';
import Science from '../../../components/NewsCategories/Science/Science';

const renderScene = SceneMap({
  first: ForYou,
  second: World,
  third: Business,
  fourth: Sports,
  fifth: Entertainment,
  sixth: Technology,
  seventh: Health,
  eighth: Science,
});

export default function NewsTabs() {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'For You'},
    {key: 'second', title: 'World'},
    {key: 'third', title: 'Business'},
    {key: 'fourth', title: 'Sports'},
    {key: 'fifth', title: 'Entertainment'},
    {key: 'sixth', title: 'Tech'},
    {key: 'seventh', title: 'Health'},
    {key: 'eighth', title: 'Science'},
  ]);

  const onIndexChange = newIndex => {
    setIndex(newIndex);
  };

  return (
    <>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={onIndexChange}
        initialLayout={{width: layout.width}}
        scrollEnabled={true}
        renderTabBar={props => (
          <TopBar
            {...props}
            titleIndex={index}
            setIndex={setIndex}
            routes={routes}
            scrollEnabled={true}
          />
        )}
      />
    </>
  );
}
