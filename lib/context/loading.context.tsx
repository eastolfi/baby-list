import { Loading } from '../../components/Loading';

import { useState } from 'react';

export type LoaderState = { loading: boolean, showLoading: () => void, hideLoading: () => void };
export const defaultState: LoaderState = {
    loading: false,
    showLoading: () => undefined,
    hideLoading: () => undefined,
}

type LoaderContext = {
    state: LoaderState,
    LoaderComponent: () => JSX.Element
}

export function useLoaderContext(): LoaderContext {
    const [ loading, setLoading ] = useState(false);

    const state: LoaderState = {
        loading,
        showLoading: () => setLoading(true),
        hideLoading: () => setLoading(false),
    };

    const content = () => <Loading open={loading} />

    return {
        state,
        LoaderComponent: content
    }
}
