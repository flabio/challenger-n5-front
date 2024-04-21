import axios from "axios";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const vehiculosApi=axios.create({
    baseURL:'http://localhost:8000/n5/api'
});

const keys = {
    getVehiculoData: ['vehiculoData'],
    saveVehiculo: ['saveVehiculoData'],
    removeVehiculo:['removeVehiculoData'],
    updateVehiculo:['updateVehiculoData'],
  };

export const getVehiculos=()=>{
    return useQuery({
        queryKey:keys.getVehiculoData,
        queryFn:async()=>{
            const {data}= await vehiculosApi.get('/vehiculo/')
            return data.data;
        }
    })
}

export const saveVehiculo = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ([saveVehiculoData]) => {
        return await vehiculosApi.post('/vehiculo/', saveVehiculoData);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(keys.getVehiculoData);
      },
      onError: (err) => {
       console.log(err)
      },
    });
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