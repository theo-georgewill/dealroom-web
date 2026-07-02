'use client';

import { useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Upload, X } from 'lucide-react';
import { CreateDealLayout } from '@/components/wizard/create-deal-layout';
import { WizardNavigation } from '@/components/wizard/wizard-navigation';
import { useCreateDealStore } from '@/lib/store/create-deal-store';

const propertySchema = z.object({
  name: z.string().min(1, 'Property name is required'),
  type: z.string().min(1, 'Property type is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  description: z.string().optional(),
});

type PropertyFormData = z.infer<typeof propertySchema>;

function PropertyContent() {
  const router = useRouter();
  const store = useCreateDealStore();
  const [uploadedImages, setUploadedImages] = useState<string[]>(store.property.images);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      name: store.property.name,
      type: store.property.type,
      address: store.property.address,
      city: store.property.city,
      state: store.property.state,
      country: store.property.country,
      description: store.property.description,
    },
  });

  const formData = watch();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setUploadedImages([...uploadedImages, ...newImages]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const onSubmit = (data: PropertyFormData) => {
    store.setProperty({
      ...data,
      images: uploadedImages,
    });
    router.push('/deals/create/parties');
  };

  const onBack = () => {
    store.setProperty({
      ...formData,
      images: uploadedImages,
    });
    router.push('/deals');
  };

  return (
    <CreateDealLayout currentStep={0} title="Property Details" subtitle="Enter the basic information about the property.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Property Name */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Property Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name')}
            type="text"
            placeholder="e.g., Lekki Phase 1 Duplex"
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Property Type */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Property Type <span className="text-red-500">*</span>
            </label>
            <select
              {...register('type')}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option>Residential</option>
              <option>Commercial</option>
              <option>Industrial</option>
              <option>Mixed Use</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              {...register('country')}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option>Nigeria</option>
              <option>Ghana</option>
              <option>Kenya</option>
              <option>South Africa</option>
            </select>
            {errors.country && (
              <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Property Address <span className="text-red-500">*</span>
          </label>
          <input
            {...register('address')}
            type="text"
            placeholder="e.g., 23 Admiralty Way, Lekki Phase 1, Lagos"
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {errors.address && (
            <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
          )}
        </div>

        {/* City, State */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              {...register('city')}
              type="text"
              placeholder="Lagos"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <select
              {...register('state')}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option>Lagos State</option>
              <option>Abuja FCT</option>
              <option>Oyo State</option>
              <option>Rivers State</option>
            </select>
            {errors.state && (
              <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Property Description
          </label>
          <textarea
            {...register('description')}
            placeholder="Describe the property..."
            rows={4}
            maxLength={500}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
          <p className="text-xs text-slate-500 mt-1">
            {formData.description?.length || 0} / 500
          </p>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Property Images
          </label>

          {/* Upload Zone */}
          <label className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-blue-50 transition-all">
            <Upload className="mx-auto mb-2 text-slate-400" size={32} />
            <p className="text-sm font-medium text-slate-700">Upload images</p>
            <p className="text-xs text-slate-500 mt-1">
              PNG, JPG or WebP (Max 10MB each)
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          {/* Image Preview */}
          {uploadedImages.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-4">
              {uploadedImages.map((image, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={image}
                    alt={`Property ${idx + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <WizardNavigation
          onBack={onBack}
          onNext={handleSubmit(onSubmit)}
          canProceed={true}
        />
      </form>
    </CreateDealLayout>
  );
}

export default function PropertyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertyContent />
    </Suspense>
  );
}
