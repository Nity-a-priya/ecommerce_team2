import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

interface ListItem {
  id: number;
  name: string;
  // Add more properties as needed
}

const MyLazyLoadedList: React.FC = () => {
  const [data, setData] = useState<ListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://gorest.co.in/public/v2/users?page=${page}&per_page=10`,
        );
        const newData: ListItem[] = await response.json();
        setData(prevData => [...prevData, ...newData]);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handleLoadMore = () => {
    if (!isLoading) {
      setPage(page + 1);
    }
  };

  const renderItem = ({item}: {item: ListItem}) => (
    <View style={styles.container}>
      <Text>{item.id}</Text>
      <Text>{item.name}</Text>
    </View>
  );

  return (
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
});
