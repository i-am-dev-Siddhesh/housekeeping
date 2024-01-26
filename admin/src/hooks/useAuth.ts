import AuthService from '@/services/Auth';
import { setAdmin } from '@/store/reducers/admin.reducer';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdminData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    if (admin) {
      setIsLoading(false);
      return;
    } else {
      AuthService.getLoggedInUser()
        .then((resp) => {
          setAdminData(resp.data);
          console.log('resp',resp.data);
          
          dispatch(setAdmin({ data: resp.data }));
        })
        .catch(() => {
          router.push('/signin');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  return {
    isLoading,
    admin,
  };
};
