import { FC } from 'react';

import Job from './Job';
import Container from '../UI/Container';

const JobList: FC = () => {
  return (
    <Container className='flex flex-wrap'>
      <Job />
    </Container>
  );
};

export default JobList;
