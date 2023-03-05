interface ISkill {
  _id: string;
  name: string;
}

interface ICategory {
  _id: string;
  name: string;
  skills: Skill[];
  __v: number;
}
