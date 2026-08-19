import { useMutation } from '@tanstack/react-query';
import {
  propertiesService,
  PropertyImage,
} from '@/lib/services/properties.service';

interface UploadPropertyImagesInput {
  propertyId: string;
  files: File[];
}

export function useUploadPropertyImages() {
  return useMutation({
    mutationFn: async ({
      propertyId,
      files,
    }: UploadPropertyImagesInput): Promise<PropertyImage[]> => {
      const uploadedImages: PropertyImage[] = [];

      for (const file of files) {
        // 1. Request signed upload URL
        const { uploadUrl, key } =
          await propertiesService.createUploadUrl(propertyId, {
            filename: file.name,
            mimeType: file.type,
          });
          
        console.log('PRESIGNED UPLOAD URL:', uploadUrl);
        // 2. Upload directly to storage
        const uploadResponse = await fetch(uploadUrl, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type,
          },
        });

        if (!uploadResponse.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        // 3. Complete the upload through the API
        const image = await propertiesService.completeUpload(
          propertyId,
          {
            key,
            originalName: file.name,
            mimeType: file.type,
            size: file.size,
            isCover: uploadedImages.length === 0,
          },
        );

        uploadedImages.push(image);
      }

      return uploadedImages;
    },
  });
}