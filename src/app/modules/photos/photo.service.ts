/* eslint-disable @typescript-eslint/no-explicit-any */
// import QueryBuilder from '../../builders/QueryBuilder';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { TPhoto } from './photo.interface';
import { Photo } from './photo.model';

const createPhotoIntoDB = async (
  payload: TPhoto,
  files: Express.Multer.File[],
) => {
  const results = [];

  for (const file of files) {
    const name = `${payload?.folder}-${Date.now()}`;
    const path = file.path;

    const { secure_url } = await sendImageToCloudinary(name, path);
    const photoPayload = {
      folder: payload.folder,
      imageUrl: secure_url,
    };
    const result = await Photo.create(photoPayload);
    results.push(result);
  }

  return results;
};

// In PhotoServices.getAllPhotoFromDB
const getAllPhotoFromDB = async (query: Record<string, unknown>) => {
  const { folder, sort } = query;
  
  // Build base query
  let baseQuery = Photo.find();
  
  // Apply folder filter if provided
  if (folder) {
    baseQuery = baseQuery.where('folder').equals(folder);
  }
  
  // Apply sorting if provided, otherwise default to createdAt descending
  if (sort) {
    baseQuery = baseQuery.sort(sort as string);
  } else {
    baseQuery = baseQuery.sort({ createdAt: -1 });
  }
  
  // Apply pagination
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  
  baseQuery = baseQuery.skip(skip).limit(limit);
  
  const data = await baseQuery.exec();
  const totalCount = await Photo.countDocuments(folder ? { folder } : {});
  
  return { data, totalCount };
};

const getSinglePhotoFromDB = async (id: string) => {
  const result = await Photo.findById(id);
  return result;
};

const deletePhotoFromDB = async (id: string) => {
  const result = await Photo.findByIdAndDelete(id);
  return result;
};

export const PhotoServices = {
  createPhotoIntoDB,
  getAllPhotoFromDB,
  getSinglePhotoFromDB,
  deletePhotoFromDB,
};
