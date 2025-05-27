'use client';

import { FormProvider } from 'react-hook-form';
import useEditShortPostsForm, { ShortPostForm } from '@/app/(admin)/admin/hooks/useEditShortPostsForm';
import React from 'react';
import { DevTool } from "@hookform/devtools";

interface EditFormProviderProps {
  children: React.ReactNode;
  defaultValues: ShortPostForm;
}

function EditFormProvider({ children, defaultValues }: EditFormProviderProps) {
  const methods = useEditShortPostsForm(defaultValues);
  const { control } = methods;

  return (
    <FormProvider {...methods}>
      {children}
      <DevTool control={control} />
    </FormProvider>
  );
}

export default EditFormProvider;
