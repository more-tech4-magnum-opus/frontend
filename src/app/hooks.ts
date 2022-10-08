import axios from 'axios';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootAdminState, AppAdminDispatch } from './adminStore';
import { host, token } from './consts';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppAdminDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootAdminState> = useSelector;
export const adminFetcher = axios.create(
    {
        baseURL: host,
        timeout: 1000,
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
)