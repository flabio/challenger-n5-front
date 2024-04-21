import axios from "axios";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const infraccionApi=axios.create({
    baseURL:'http://localhost:8000/n5/api'
});

infraccionApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
    }

    return config;
})



const keys = {
    getInfraccionData: ['infraccionData'],
    saveInfraccion: ['saveInfraccionData'],
    removeInfraccion:['removeInfraccionData'],
    updateInfraccion:['updateInfraccionData'],
  };

export const getInfracciones=()=>{
    return useQuery({
        queryKey:keys.getInfraccionData,
        queryFn:async()=>{
            const {data}= await infraccionApi.get('/infraccion/')
            return data.data;
        }
    })
}

export const saveInfraccion = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ([saveInfraccionData]) => {
        return await infraccionApi.post('/infraccion/', saveInfraccionData);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(keys.getInfraccionData);
      },
      onError: (err) => {
       console.log(err)
      },
    });
  };

  export const updateInfraccion = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ([updateInfraccionData,id]) => {
       return await infraccionApi.put(`/infraccion/${id}`, updateInfraccionData);
       
      },
      onSuccess: (res) => {
        queryClient.invalidateQueries(keys.getInfraccionData);
      },
      onError: (err) => {
       console.log(err)
      },
    });
  };


  export const removeInfraccion = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ([removeInfraccionData]) => {
        return await infraccionApi.delete(`/infraccion/${removeInfraccionData}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(keys.getInfraccionData);
      },
      onError: (err) => {
        console.log(err)
      },
    });
  };