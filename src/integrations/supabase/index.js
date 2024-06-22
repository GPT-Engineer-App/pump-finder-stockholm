import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### pumps

| name        | type    | format           | required |
|-------------|---------|------------------|----------|
| id          | int8    | number           | true     |
| name        | text    | string           | false    |
| latitude    | float8  | number           | false    |
| longitude   | float8  | number           | false    |
| bilventil   | text    | string           | false    |
| cykelventil | text    | string           | false    |
| racer_ventil| text    | string           | false    |
| address     | text    | string           | false    |
| status      | text    | string           | false    |
| model       | text    | string           | false    |
| comment     | text    | string           | false    |

*/

// Hooks for pumps table

export const usePumps = () => useQuery({
    queryKey: ['pumps'],
    queryFn: () => fromSupabase(supabase.from('pumps').select('*')),
});

export const usePump = (id) => useQuery({
    queryKey: ['pumps', id],
    queryFn: () => fromSupabase(supabase.from('pumps').select('*').eq('id', id).single()),
});

export const useAddPump = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newPump) => fromSupabase(supabase.from('pumps').insert([newPump])),
        onSuccess: () => {
            queryClient.invalidateQueries('pumps');
        },
    });
};

export const useUpdatePump = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedPump) => fromSupabase(supabase.from('pumps').update(updatedPump).eq('id', updatedPump.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('pumps');
        },
    });
};

export const useDeletePump = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('pumps').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('pumps');
        },
    });
};