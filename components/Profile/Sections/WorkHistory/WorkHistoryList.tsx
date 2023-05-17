import { FC } from 'react';

import WorkHistory from './WorkHistory';

interface IProps {
  workHistory: IProject[];
}
const WorkHistoryList: FC<IProps> = ({ workHistory }) => {
  return (
    <div>
      {workHistory.map((project) => {
        return <WorkHistory workHistory={project} key={project._id} />;
      })}
    </div>
  );
};

export default WorkHistoryList;
