import axios from "axios";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const oficialsApi=axios.create({
    baseURL:'http://localhost:8000/n5/api'
});

const keys = {
    getOficialData: ['oficialData'],
    saveOficial: ['saveOficialData'],
    updateOficial:['updateOficialData'],
 
    
  };

export const getOficial=()=>{
    return useQuery({
        queryKey:keys.getOficialData,
        queryFn:async()=>{
            const {data}= await oficialsApi.get('/oficial/')
            return data.data;
        }
    })
}



export const saveOficial = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ([saveOficialData]) => {
        return await oficialsApi.post('/oficial/', saveOficialData);
      
      },
      onSuccess: () => {
        queryClient.invalidateQueries(keys.getOficialData);
      },
      onError: (err) => {
        console.log(err)
      },
    });
  };
