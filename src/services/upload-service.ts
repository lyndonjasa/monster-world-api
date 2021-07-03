import { UploadItemRequest } from "../messages/upload/UploadItemRequest";
import Item from "../mongo/models/item-model";
import { ClientSession, Document, Types } from 'mongoose'
import { UploadTamingItemRequest } from "../messages/upload/UploadTamingItemRequest";
import TamingItem from "../mongo/models/taming-item-model";
import Element from "../mongo/models/element-model";
import { UploadElementRequest } from "../messages/upload/UploadElementRequest";
import { UploadStatusRequest } from "../messages/upload/UploadStatusRequest";
import Status from "../mongo/models/status-model";

/**
 * Upload Items
 * @param request UploadItemRequest Array
 * @returns 
 */
export const uploadItems = async(request: UploadItemRequest[]): Promise<Document[]> => {
  const session = await Item.startSession();
  session.startTransaction();

  let items: Document[] = [];

  try {
    items = await Item.insertMany(request);
  } catch (error) {
    abortTransaction(session, error);
  } finally {
    session.endSession();
  }

  return items;
}

/**
 * Upload Taming Items
 * @param request UploadTamingItemRequest Array
 * @returns 
 */
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
        catchRate: requestItem.catchRate,
        monsterType: requestItem.monsterType
      }

      const result = await new TamingItem(tamingItem).save();
      
      items.push(result);
    }
  } catch (error) {
    abortTransaction(session, error);
  } finally {
    session.endSession();
  }

  return items;
}

/**
 * Upload Elements to database
 * @param request UploadElementRequest
 * @returns 
 */
export const uploadElements = async (request: UploadElementRequest[]): Promise<Document[]> => {
  const session = await Element.startSession();
  session.startTransaction();

  let elements: Document[] = [];
  try {
    elements = await Element.insertMany(request);
  } catch (error) {
    abortTransaction(session, error);
  } finally {
    session.endSession();
  }

  return elements;
}

/**
 * Upload Status
 * @param request UploadStatusRequest
 * @returns 
 */
export const uploadStatus = async (request: UploadStatusRequest[]) => {
  const session = await Status.startSession();
  session.startTransaction();

  let status: Document[] = [];

  try {
    let statusDocuments = [];
    for (let index = 0; index < request.length; index++) {
      const sr = request[index];

      const relatedElement = await Element.findOne({ name: sr.element });
      
      statusDocuments.push({
        name: sr.status,
        element: relatedElement.id,
        description: sr.description,
        countdown: sr.countdown
      });
    }

    status = await Status.insertMany(statusDocuments);
  } catch (error) {
    abortTransaction(session, error)
  } finally {
    session.endSession();
  }

  return status;
}

/**
 * Abort transaction and throw error
 * @param session ClientSession
 * @param error try catch error
 */
const abortTransaction = (session: ClientSession, error: any) => {
  session.abortTransaction();
  throw error;
}

export default {
  uploadItems,
  uploadTamingItems,
  uploadElements,
  uploadStatus
}