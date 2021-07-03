import { UploadItemRequest } from "../messages/upload/UploadItemRequest";
import Item from "../mongo/models/item-model";
import { ClientSession, Document, Types } from 'mongoose'
import { UploadTamingItemRequest } from "../messages/upload/UploadTamingItemRequest";
import TamingItem from "../mongo/models/taming-item-model";
import Element from "../mongo/models/element-model";
import { UploadElementRequest } from "../messages/upload/UploadElementRequest";
import { UploadStatusRequest } from "../messages/upload/UploadStatusRequest";
import Status from "../mongo/models/status-model";
import { ElementModel } from "../shared/models/element-model";
import { StatusModel } from "../shared/models/status-model";
import { UploadSkillType } from "../messages/upload/UploadSkillType";
import SkillType from "../mongo/models/skill-type-model";
import { UplaodSkillTarget } from "../messages/upload/UploadSkillTarget";
import SkillTarget from "../mongo/models/skill-target-model";
import { UploadSkillRequest } from "../messages/upload/UploadSkillRequest";
import Skill from "../mongo/models/skill-model";
import { SkillModel } from "../shared/models/skill-model";

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
    const elementDocuments: ElementModel[] = request.map(r => {
      return {
        elementId: r._id,
        name: r.name
      }
    });

    elements = await Element.insertMany(elementDocuments);
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
export const uploadStatus = async (request: UploadStatusRequest[]): Promise<Document[]> => {
  const session = await Status.startSession();
  session.startTransaction();

  let status: Document[] = [];

  try {
    let statusDocuments: StatusModel[] = [];
    for (let index = 0; index < request.length; index++) {
      const sr = request[index];

      const relatedElement = await Element.findOne({ name: sr.element });
      
      statusDocuments.push({
        name: sr.status,
        statusId: sr.statusId,
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
 * Upload Skill Types
 * @param request UploadSkillType Array
 * @returns 
 */
export const uploadSkillTypes = async (request: UploadSkillType[]) => {
  const session = await SkillType.startSession();
  session.startTransaction();

  let skillTypes: Document[] = [];

  try {
    skillTypes = await SkillType.insertMany(request);
  } catch (error) {
    abortTransaction(session, error);
  } finally {
    session.endSession();
  }

  return skillTypes;
}

/**
 * Upload Skill Targets
 * @param request UploadSkillTarget
 * @returns 
 */
export const uploadSkillTargets = async (request: UplaodSkillTarget[]) => {
  const session = await SkillTarget.startSession();
  session.startTransaction();

  let skillTargets: Document[] = [];

  try {
    skillTargets = await SkillTarget.insertMany(request);
  } catch (error) {
    abortTransaction(session, error);
  } finally {
    session.endSession();
  }

  return skillTargets;
}

/**
 * Upload Skills
 * @param request 
 */
export const uploadSkills = async (request: UploadSkillRequest[]) => {
  const session = await Skill.startSession();
  session.startTransaction();

  const skills: SkillModel[] = [];
  let result: Document[] = [];

  type idNamePair = {
    _id: Types.ObjectId,
    name: string;
  };

  const elements = (await Element.find({})).map(e => e.toJSON<idNamePair>());
  const skillTypes = (await SkillType.find({})).map(st => st.toJSON<idNamePair>());
  const statuses = (await Status.find({})).map(st => st.toJSON<idNamePair>());
  const targets = (await SkillTarget.find({})).map(t => t.toJSON<idNamePair>());

  try {
    for (let index = 0; index < request.length; index++) {
      const { skill, hasPenalty, penalty, status, hasStatusEffect } = request[index];

      // skill references
      const skillElement = elements.find(e => e.name === skill.element);
      const skillType = skillTypes.find(st => st.name === skill.type);
      const skillTarget = targets.find(t => t.name === skill.target);
      // status references
      const statusEffect = statuses.find(s => s.name === status.effect);
      const statusTarget = targets.find(t => t.name === status.target);
      // penalty references
      const penaltyTarget = targets.find(t => t.name === penalty.target);

      const skillDocument: SkillModel = {
        cost: skill.cost,
        description: skill.description,
        element: skillElement._id,
        hasPenalty: hasPenalty,
        hasStatusEffect: hasStatusEffect,
        ignoreDefense: skill.ignoreDefense,
        name: skill.name,
        penalty: hasPenalty ? {
          damage: penalty.damage,
          target: penaltyTarget._id
        } : null,
        power: skill.power,
        skillTarget: skillTarget._id,
        skillType: skillType._id,
        status: hasStatusEffect ? {
          chance: status.chance,
          effect: statusEffect._id,
          target: statusTarget._id,
          turns: status.turns
        } : null
      };

      skills.push(skillDocument);
    }

    result = await Skill.insertMany(skills);
    
  } catch (error) {
    abortTransaction(session, error);
  } finally {
    session.endSession();
  }

  return result;
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
  uploadStatus,
  uploadSkillTypes,
  uploadSkillTargets,
  uploadSkills
}