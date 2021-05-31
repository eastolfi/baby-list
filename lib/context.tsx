import { createContext, ReactNode, useContext, useState } from 'react';

import { Loading } from '../components/Loading';

type State = { loading: boolean, showLoading: () => void, hideLoading: () => void };
type AppProviderProps = { children: ReactNode }

const AppContext = createContext<State>({
    loading: false,
    showLoading: () => undefined,
    hideLoading: () => undefined,
});

function AppProvider({ children }: AppProviderProps) {
    const [ loading, setLoading ] = useState(false);

    const value: State = {
        loading,
        showLoading: () => setLoading(true),
        hideLoading: () => setLoading(false),
    };

    return (
        <AppContext.Provider value={value}>
            <Loading open={loading} />

            { children }
        </AppContext.Provider>
    )
}

function useLoading(): State {
    const context = useContext(AppContext);
    return context;
}

export {
    AppProvider,
    useLoading
}
