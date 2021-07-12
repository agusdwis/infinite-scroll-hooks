import { useEffect, useReducer } from 'react';

const useFetch = (url: string, reload: boolean) => {
  const initialState = {
    loading: false,
    data: [],
    error: null,
  };

  const [state, dispatch] = useReducer((state: any, actions: any) => {
    switch (actions.type) {
      case 'FETCHING':
        return { ...state, loading: true };
      case 'FETCHED':
        return {
          ...state,
          loading: false,
          data: [...state.data, ...actions.payload],
        };
      case 'FETCH_ERROR':
        return { ...state, loading: false, error: actions.payload };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    let cancelRequest = false;
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: 'FETCHING' });

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (cancelRequest) return;
        dispatch({ type: 'FETCHED', payload: data?.message });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };

    fetchData();

    return function cleanup() {
      cancelRequest = true;
    };
  }, [reload]);

  return state;
};

export default useFetch;
