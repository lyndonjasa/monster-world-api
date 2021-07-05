import express from 'express'
import Evolution from '../mongo/models/evolution';
import EvolutionTree from '../mongo/models/evolution-tree';
import Monster from '../mongo/models/monster';
import MonsterSkill from '../mongo/models/monster-skill';
import MonsterType from '../mongo/models/monster-type';
import Talent from '../mongo/models/talent';

const MonsterRouter = express.Router();

MonsterRouter.get('/monsters/evolutions', async (req, res) => {
  const evolutions = await Evolution.find({});

  res.send(evolutions);
});

MonsterRouter.get('/monsters/types', async (req, res) => {
  const types = await MonsterType.find({});

  res.send(types);
});

MonsterRouter.get('/monsters', async (req, res) => {
  const monsters = await Monster.find({})
              .populate('evolution', 'name evolutionId -_id')
              .populate('type', 'name monsterTypeId -_id');

  res.send(monsters);
});

MonsterRouter.get('/monsters/evolution-tree', async(req, res) => {
  const trees = await EvolutionTree.find({})
              .populate('monster', 'name -_id')
              .populate('evolution', 'name -_id');

  res.send(trees);
});

MonsterRouter.get('/monsters/talents', async (req, res) => {
  const talents = await Talent.find({});

  res.send(talents);
})
 
export default MonsterRouter;