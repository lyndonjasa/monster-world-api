import { UploadItemRequest } from "../messages/UploadItemRequest";
import Item from "../mongo/models/item-model";
import { Document } from 'mongoose'
import { UploadTamingItemRequest } from "../messages/UploadTamingItemRequest";
import TamingItem from "../mongo/models/taming-item-model";

export const uploadItems = async(request: UploadItemRequest[]): Promise<Document[]> => {
  const session = await Item.startSession();
  session.startTransaction();

  let items: Document[] = [];

  try {
    items = await Item.insertMany(request);
  } catch (error) {
    throw error;
  } finally {
    session.endSession();
  }

  return items;
}

export const uploadTamingItems = async(request: UploadTamingItemRequest[]): Promise<Document[]> => {
  const session = await TamingItem.startSession();
  session.startTransaction();

  let items: Document[] = [];
  try {
    for (let index = 0; index < request.length; index++) {
      const requestItem = request[index];
      
      const relatedItem = await Item.findOne({ name: requestItem.name });

      const tamingItem = {
        itemId: relatedItem._id,
        catchRate: requestItem.catchRate
      }

      const result = await new TamingItem(tamingItem).save();
      
      items.push(result);
    }
  } catch (error) {
    throw error;
  } finally {
    session.endSession();
  }

  return items;
}

export default {
  uploadItems,
  uploadTamingItems
}