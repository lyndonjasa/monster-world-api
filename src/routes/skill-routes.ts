import express from 'express';
import MonsterSkill from '../mongo/models/monster-skill';
import Skill from '../mongo/models/skill';
import SkillTarget from '../mongo/models/skill-target';
import SkillType from '../mongo/models/skill-type';
import { Types } from 'mongoose'

const SkillRoute = express.Router();

SkillRoute.get('/skills/types', async (req, res) => {
  const types = await SkillType.find({}).select('name typeId -_id');

  res.send(types);
});

SkillRoute.get('/skills/targets', async (req, res) => {
  const targets = await SkillTarget.find({}).select('name targetId -_id');

  res.send(targets);
});

SkillRoute.get('/skills', async (req, res) => {
  const skills = await Skill.find({}, { __v: 0 })
              .populate('element', 'name elementId -_id')
              .populate('skillType', 'name typeId -_id')
              .populate('skillTarget', 'name targetId -_id')
              .populate(
                {
                  path: 'status',
                  populate: {
                    path: 'effect',
                    select: 'statusId name -_id'
                  }
                }
              )
              .populate(
                {
                  path: 'status',
                  populate: {
                    path: 'target',
                    select: 'targetId name -_id'
                  }
                }
              )
              .populate(
                {
                  path: 'penalty',
                  populate: {
                    path: 'target',
                    select: 'targetId name -_id'
                  }
                }
              );

  res.send(skills);
})

SkillRoute.get('/skills/digimons/:id', async (req, res) => {
  const digimonId = req.params.id;

  const digimons = await MonsterSkill.find({ monster: Types.ObjectId(digimonId) })
              .populate({
                path: 'monster',
                select: 'name type -_id',
                populate: {
                  path: 'type',
                  select: 'name monsterTypeId -_id'
                }
              })
              .populate({
                path: 'skills',
                populate: {
                  path: 'status.effect',
                  select: 'name statusId -_id'
                }
              })
              .populate({
                path: 'skills',
                populate: {
                  path: 'status.target',
                  select: 'name targetId -_id'
                }
              })
              .populate({
                path: 'skills',
                populate: {
                  path: 'element',
                  select: 'name elementId -_id'
                }
              })
              .populate({
                path: 'skills',
                populate: {
                  path: 'skillTarget',
                  select: 'name targetId -_id'
                }
              })
              .populate({
                path: 'skills',
                populate: {
                  path: 'skillType',
                  select: 'name typeId -_id'
                }
              })

  res.send(digimons);
})


export default SkillRoute;