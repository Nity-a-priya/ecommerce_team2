import {useQuery, useInfiniteQuery, QueryFunctionContext} from 'react-query';

interface ListItem {
  id: number;
  name: string;
}

// const getUsers = async (page: number, perPage: number) => {
//   try {
//     const response = await fetch(
//       `https://gorest.co.in/public/v2/users?page=${page}&per_page=${perPage}`,
//     );
//     const newData: ListItem[] = await response.json();
//     console.log(newData);
//     return newData;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };
// const useUsers = (page: number, perPage: number) => {
//   return useQuery(['users', page, perPage], () => getUsers(page, perPage));
// };

const getUsers = async ({pageParam = 1}: QueryFunctionContext) => {
  const response = await fetch(
    `https://gorest.co.in/public/v2/users?page=${pageParam}&per_page=20`,
  );
  const data: {data: ListItem[]} = await response.json();
  console.log(data);
  return data.data;
};

const useUsers = () => {
  return useInfiniteQuery('users', getUsers, {
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 20) {
        return allPages.length + 1; // Increment page number for next page
      }
      return undefined; // No more pages to fetch
    },
  });
};

export default useUsers;
