import axios from "axios";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const personasApi=axios.create({
    baseURL:'http://localhost:8000/n5/api'
});

const keys = {
    getPersonaData: ['personaData'],
    savePersona: ['savePersonaData'],
    removePersona:['removePersonaData'],
    updatePersona:['updatePersonaData'],
    generarInformePersona:['generarInforme'],
    
  };

export const getPersonas=()=>{
    return useQuery({
        queryKey:keys.getPersonaData,
        queryFn:async()=>{
            const {data}= await personasApi.get('/persona/')
            return data.data;
        }
    })
}

export const getGenerarInformePersona=(search)=>{
  return useQuery({
      queryKey:keys.generarInformePersona,
      queryFn:async()=>{
          const {data}= await personasApi.get(`/persona/generar_informe/${search}/`)
          return data.data;
      }
  })
}
export const getGenerarInformePersonaSearch=()=>{
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ([generarInforme]) => {
      const response= await personasApi.get(`/persona/generar_informe/${generarInforme}/`)
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.getPersonaData);
    },
    onError: (err) => {
      console.log(err)
    },
  });
}

export const savePersona = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ([savePersonaData]) => {
        return await personasApi.post('/persona/', savePersonaData);
      
      },
      onSuccess: () => {
        queryClient.invalidateQueries(keys.getPersonaData);
      },
      onError: (err) => {
        console.log(err)
      },
    });
  };

  export const updatePersona = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ([updatePersonaData,id]) => {
       return await personasApi.put(`/persona/${id}`, updatePersonaData);
      },
      onSuccess: (res) => {
        queryClient.invalidateQueries(keys.getPersonaData);
      },
      onError: (err) => {
        console.log(err)
      },
    });
  };


  export const removePersona = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ([removePersonaData]) => {
        return await personasApi.delete(`/persona/${removePersonaData}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(keys.getPersonaData);
      },
      onError: (err) => {
        console.log(err)
      },
    });
  };