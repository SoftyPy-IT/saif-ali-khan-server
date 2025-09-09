import { z } from 'zod';

const createVideoValidationSchema = z.object({
  body: z.object({
    folder: z.string({ required_error: 'folder is required' }),
  }),
});

// video
export const videoValidation = {
  createVideoValidationSchema,
};
