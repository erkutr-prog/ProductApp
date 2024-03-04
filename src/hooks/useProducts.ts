import {useEffect, useState} from 'react';
import API from '../api/HTTP';
import {IProduct} from '../models/ProductTypes';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../screens/store';
import {setProducts} from '../features/ProductsSlice';

export default function useProducts() {
  const [data, setData] = useState<IProduct[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await API.getProducts();
        setData(response);
        dispatch(setProducts(response));
      } catch (err) {
        setError(JSON.stringify(err));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {data, error, loading};
}
