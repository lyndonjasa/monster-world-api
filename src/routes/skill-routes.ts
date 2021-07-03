import express, { request } from 'express';
import Skill from '../mongo/models/skill-model';
import SkillTarget from '../mongo/models/skill-target-model';
import SkillType from '../mongo/models/skill-type-model';

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

export default SkillRoute;