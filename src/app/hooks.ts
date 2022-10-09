import axios from 'axios';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootAdminState, AppAdminDispatch } from './adminStore';
import { host, adminToken, hrToken, workerToken } from './consts';
import { AppHRDispatch, RootHRState } from './hrStore';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppAdminDispatch>();
export const useHRDispatch = () => useDispatch<AppHRDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootAdminState> = useSelector;
export const useHRSelector: TypedUseSelectorHook<RootHRState> = useSelector;
export const adminFetcher = axios.create(
    {
        baseURL: host,
        timeout: 5000,
        headers: {
            Authorization: 'Bearer ' + adminToken
        }
    }
)
export const hrFetcher = axios.create(
    {
        baseURL: host,
        timeout: 5000,
        headers: {
            Authorization: 'Bearer ' + hrToken
        }
    }
)
export const workerFetcher = axios.create(
    {
        baseURL: host,
        timeout: 5000,
        headers: {
            Authorization: 'Bearer ' + workerToken
        }
    }
)