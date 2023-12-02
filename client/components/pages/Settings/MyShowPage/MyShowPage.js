import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { useGetTheaterWiseShowsQuery } from '../../../../store/services/theaterWiseShows';
import ShowTables from '../../../elements/Tables/ShowTables';

export default function MyShowPage() {
  const { data, isLoading, refetch } = useGetTheaterWiseShowsQuery();
  if (!isLoading) {
    return (
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <ShowTables finaldata={data} refetch={refetch} />
        </div>
        <div className="w-full mb-12 px-4" />
      </div>
    );
  }
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: '65vh' }}
    >
      <ScaleLoader color="#825ee4" size={60} />
    </div>
  );
}
