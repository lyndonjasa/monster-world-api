import express from 'express';
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

export default SkillRoute;