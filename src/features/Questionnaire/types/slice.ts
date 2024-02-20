import { PayloadAction } from '@reduxjs/toolkit';

export type SetFieldValueAction = PayloadAction<{
  id: string;
  field: string;
  value: string;
}>;
