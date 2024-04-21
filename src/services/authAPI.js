import axios from "axios";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const authApi=axios.create({
    baseURL:'http://localhost:8000/n5/api'
});

const keys = {
    getLoginData: ['LoginData'],
   
  };


export const getLoginData = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ([LoginData]) => {
        const {data}= await authApi.post('/auth/login', LoginData);
        localStorage.setItem("token",data?.token?.access);
        localStorage.setItem("full_name",data?.first_name+" "+data?.last_name);
        location.reload()

      },
      onSuccess: () => {
       
      },
      onError: (err) => {
       console.log(err)
      },
    });
  };
  export const getLogoutData = () => {
   location.reload()
  };


  export const updateVehiculo = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ([updateVehiculoData,id]) => {
       return await vehiculosApi.put(`/vehiculo/${id}`, updateVehiculoData);
       
      },
      onSuccess: (res) => {
        queryClient.invalidateQueries(keys.getVehiculoData);
      },
      onError: (err) => {
       console.log(err)
      },
    });
  };


  export const removeVehiculo = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ([removePersonaData]) => {
        return await vehiculosApi.delete(`/vehiculo/${removePersonaData}`);
       
      },
      onSuccess: () => {
        queryClient.invalidateQueries(keys.getVehiculoData);
      },
      onError: (err) => {
        console.log(err)
      },
    });
  };