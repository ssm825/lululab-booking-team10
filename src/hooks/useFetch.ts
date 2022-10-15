import { useState, useEffect, useCallback } from 'react';
import fetch from '../api/fetch';
import { DefaultType } from '../types';

const initializeState: { results: DefaultType[]; loading: boolean } = {
  results: [],
  loading: true,
};

const useFetch = () => {
  const [items, setItems] = useState(initializeState);

  const response = useCallback(async () => {
    try {
      const data = await fetch();
      setItems(({ results }) => ({
        results: [...results, ...data.reservation],
        loading: false,
      }));
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    return () => {
      response();
    };
  }, []);

  return items;
};

export default useFetch;
