interface Skill {
  _id: string;
  name: string;
}

interface Category {
  _id: string;
  name: string;
  skills: Skill[];
  __v: number;
}
