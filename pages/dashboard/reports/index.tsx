import { NextPage } from 'next';
import React from 'react';
import useSWR from 'swr';

import DashboardTitle from '../../../components/Admin/DashboardTitle';
import Report from '../../../components/Admin/Report';
import Container from '../../../components/UI/Container';
import { fetcher } from '../../../utils/axios';

const Reports: NextPage = () => {
  const { data: reports } = useSWR('/api/report', fetcher, {
    refreshInterval: 30 * 1000 * 60,
  });

  return (
    <Container className='p-5 w-full grid grid-cols-1 gap-16'>
      <DashboardTitle
        pageName='Reports'
        url='Dashboard'
        title='Report Viewer'
      />
      <div className='flex flex-col gap-1'>
        {reports &&
          reports.reports.map((report: IReports) => {
            return <Report report={report} key={report._id} />;
          })}
      </div>
    </Container>
  );
};

export default Reports;
