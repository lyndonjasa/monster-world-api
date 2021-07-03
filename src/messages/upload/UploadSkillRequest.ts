interface skill {
  name: string;
  element: string;
  cost: number;
  power: number;
  type: string;
  target: string;
  description: string;
  ignoreDefense: boolean;
}

interface status {
  effect: string;
  target: string;
  chance: number;
  turns: number;
}

interface penalty {
  damage: number;
  target: string;
}

export class UploadSkillRequest {
  skill: skill;
  hasStatusEffect: boolean;
  status: status;
  hasPenalty: boolean;
  penalty: penalty;

  constructor(req: any) {
    const { skill, status, penalty } = req;

    this.skill = {
      cost: skill.cost,
      description: skill.description,
      element: skill.element,
      ignoreDefense: !!+skill.ignoreDefense,
      name: skill.name,
      power: skill.power,
      target: skill.target,
      type: skill.type
    }

    this.status = {
      chance: +status.chance,
      effect: status.effect,
      target: status.target,
      turns: +status.turns
    }
    this.hasStatusEffect = this.status.target != '';

    this.penalty = {
      damage: penalty.damage,
      target: penalty.target
    }

    this.hasPenalty = this.penalty.damage > 0;
  }
}