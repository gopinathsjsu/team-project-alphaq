import React from 'react';
import { useParams } from 'react-router';
import { useGetMovieByIdQuery } from '../../../../store/services/movie';

export default function About() {
  const { id } = useParams();

  const { data } = useGetMovieByIdQuery(id);
  const { description } = data || {};
  return <div>{description || 'ABOUT'}</div>;
}
