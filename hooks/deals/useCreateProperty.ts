import { useMutation } from '@tanstack/react-query';
import {
  propertiesService,
  CreatePropertyRequest,
} from '@/lib/services/properties.service';

export function useCreateProperty() {
  return useMutation({
    mutationFn: (data: CreatePropertyRequest) =>
      propertiesService.createProperty(data),
  });
}