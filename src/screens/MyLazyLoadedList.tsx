import React, {useState, useEffect, useMemo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

interface ListItem {
  id: number;
  name: string;
}

const monthsData = [
  {label: 'January', value: '1'},
  {label: 'February', value: '2'},
  {label: 'March', value: '3'},
];

const MyLazyLoadedList: React.FC = () => {
  const [data, setData] = useState<ListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [selectedMonth, setSelectedMonth] = useState('1');

  const cache: Record<string, ListItem[][]> = {};

  const fetchDataForMonth = useMemo(() => {
    return async (month: string, currentPage: number) => {
      setIsLoading(true);
      try {
        console.log('||');
        console.log('||');
        console.log('||');

        console.log('month: = ', month, 'currentPage = ', currentPage);
        if (cache[month] && cache[month][currentPage]) {
          console.log('DATA GETTING FROM CACHE ..... ');
          const cachedData = cache[month].reduce(
            (acc, val) => [...acc, ...val],
            [],
          );
          setData(cachedData);
          setIsLoading(false);
        } else {
          console.log('API GOT CALLED ..... '); // Data not found in cache, fetch from API
          const response = await fetch(
            `https://gorest.co.in/public/v2/users?page=${currentPage}&per_page=10&month=${month}`,
          );
          const newData: ListItem[] = await response.json();

          // Update cache with fetched data
          if (!cache[month]) {
            cache[month] = [];
          }
          cache[month][currentPage] = newData;

          // Combine all cached data for the month and update data state
          const combinedData: ListItem[] = cache[month].reduce(
            (acc, val) => [...acc, ...val],
            [],
          );
          setData(combinedData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
  }, []);

  useEffect(() => {
    fetchDataForMonth(selectedMonth, page); // Default to 'January' (value '1') for initial fetch
  }, [fetchDataForMonth, page]);

  const handleLoadMore = () => {
    if (!isLoading) {
      setPage(page + 1); // Increment page by 1
    }
  };

  const renderItem = ({item}: {item: ListItem}) => (
    <View style={styles.container}>
      <Text>{item.id}</Text>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={monthsData}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select month"
        searchPlaceholder="Search..."
        value={selectedMonth} // Initial value for January
        onChange={item => {
          console.log('OnChange Called with = ', item.value);
          setPage(1);
          setSelectedMonth(item.value);
        }}
      />

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          isLoading && (
            <Text style={{textAlign: 'center', padding: 10}}>Loading...</Text>
          )
        }
      />
    </View>
  );
};

export default MyLazyLoadedList;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'lightgrey',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    marginBottom: 10,
    height: 70,
  },
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
