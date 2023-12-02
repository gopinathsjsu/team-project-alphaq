/* eslint-disable indent */
/* eslint-disable react/jsx-key */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  useAsyncDebounce,
  useFilters,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { ModalManager } from 'react-dynamic-modal';
import ToggleDarkMode from '../../sections/ToggleDarkMode';
import EmptyTable from '../../sections/EmptyTable';
import { AddShow } from '../Modals';
import { useGetTheaterByIdQuery } from '../../../store/services/theater';
import { useGetMoviesQuery } from '../../../store/services/movie';
import {
  useCreateItemMutation,
  useDeleteShowMutation,
} from '../../../store/services/show';

// This is the Global(which can go through all column for searching) Filter style and which algorithm to evaulate/filter
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  isLight,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span className="text-gray-700 font-normal ml-2 ">
      <i
        className={
          isLight
            ? 'fas fa-search mr-4 text-gray-700'
            : 'fas fa-search mr-4 text-white'
        }
      />
      <input
        className="px-2 py-1  placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline ease-linear transition-all duration-150"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </span>
  );
}

// Default Column FIlter no need here but i kept it because it may cause error if i delete it
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

// const redirect = (value) => {
//   window.location = `/manage/event/${value}`;
// };

export default function ShowTables(props) {
  const [isLight, setIsLight] = useState(1);
  const { user } = useSelector((state) => state.auth);
  const [createItem] = useCreateItemMutation();
  const [deleteShow] = useDeleteShowMutation();
  const { data: movieList, isLoading: isMovieListLoading } =
    useGetMoviesQuery();
  const { data: theaterDetails, isLoading: isTheaterDetailsLoading } =
    useGetTheaterByIdQuery(user.theaterId);
  const data = React.useMemo(() => props.finaldata, [props.finaldata]);

  const openModal = () => {
    ModalManager.open(
      <AddShow
        onRequestClose={() => true}
        theaterDetails={theaterDetails}
        movieList={movieList}
        isMovieListLoading={isMovieListLoading}
        isTheaterDetailsLoading={isTheaterDetailsLoading}
        createItem={createItem}
        refetch={props.refetch}
      />,
    );
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Movie Name',
        accessor: 'movieName',
        disableFilters: true,
        Cell: ({ value }) => (
          <div className="flex items-center">
            <span className="font-semibold text-sm">{value}</span>
          </div>
        ),
      },

      {
        Header: 'Start Time',
        accessor: 'startTime',
        disableFilters: true,
        Cell: ({ value }) => (
          <div className="flex items-center">
            <span className="font-semibold text-sm">
              {moment(value).format('DD MMM YYYY HH:MM')}
            </span>
          </div>
        ),
      },
      {
        Header: 'End Time',
        accessor: 'endTime',
        disableFilters: true,
        Cell: ({ value }) => (
          <div className="flex items-center">
            <span className="font-semibold text-sm">
              {moment(value).format('DD MMM YYYY HH:MM')}
            </span>
          </div>
        ),
      },
      {
        Header: 'Capacity',
        accessor: 'capacity',
        disableFilters: true,
        Cell: ({ value }) => (
          <div className="flex items-center">
            <span className="font-semibold text-sm">{value}</span>
          </div>
        ),
      },
      {
        Header: 'Price',
        accessor: 'price',
        disableFilters: true,
        Cell: ({ value }) => (
          <div className="flex items-center">
            <span className="font-semibold text-sm">{value}</span>
          </div>
        ),
      },
      {
        Header: 'Screen',
        accessor: 'screen',
        disableFilters: true,
        Cell: ({ value }) => (
          <div className="flex items-center">
            <span className="font-semibold text-sm">{value}</span>
          </div>
        ),
      },
      {
        Header: 'Current Booking',
        accessor: 'currentBookingCount',
        disableFilters: true,
        Cell: ({ value }) => (
          <div className="flex items-center">
            <span className="font-semibold text-sm">{value}</span>
          </div>
        ),
      },
      {
        Header: 'Actions',
        accessor: 'id',
        Cell: ({ value }) => (
          <div className="flex ">
            <button
              className="ml-4"
              title="Delete"
              onClick={async () => {
                try {
                  await deleteShow(value);
                  props.refetch();
                } catch (error) {
                  console.error('Error creating item:', error);
                }
              }}
            >
              <i className="fas fa-trash text-red-500 text-lg" />
            </button>
          </div>
        ),
        disableFilters: true,
        disableSortBy: true,
      },
    ],
    [deleteShow, props],
  );
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    [],
  );
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) =>
        rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        }),
    }),
    [],
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,

      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },

    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    usePagination,
  );

  // real UI of Table
  return (
    <div
      className={`relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ${
        isLight ? 'bg-white' : 'bg-blue-900 text-white'
      }`}
    >
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <div className="flex flex-row">
              {' '}
              <div>
                <h3
                  className={`font-semibold text-lg ${
                    isLight ? 'text-gray-800' : 'text-white'
                  }`}
                >
                  Shows
                </h3>
              </div>
              <div className="inline-block ml-2">
                <ToggleDarkMode
                  isOn={!isLight}
                  onClick={() => setIsLight(!isLight)}
                />
              </div>
              <div className="ml-auto">
                <i
                  className={
                    isLight
                      ? 'fas fa-filter mr-4 text-gray-700'
                      : 'fas fa-filter mr-4 text-white'
                  }
                />
                <span className="ml-2 " />
                <button
                  className="bg-green-500 text-white  font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-4 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => openModal()}
                >
                  <i className="fas fa-plus" />
                  &nbsp; Add Show
                </button>
                <GlobalFilter
                  isLight={isLight}
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto relative">
        {page.length === 0 && <EmptyTable isLight={isLight} />}
        <table
          {...getTableProps()}
          className="items-center w-full bg-transparent border-collapse"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={`px-6 align-middle border border-solid py-3 text-xs  uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left ${
                      isLight
                        ? 'bg-gray-100 text-gray-600 border-gray-200'
                        : 'bg-blue-800 text-blue-300 border-blue-700'
                    }`}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                    {/* Render the columns filter UI */}
                    <div>
                      {column.canFilter ? column.render('Filter') : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
            <tr />
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xsm whitespace-no-wrap p-4"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
          {page.length === 0 && <div className="empty-table-space" />}
        </table>
        {/* PAGINATION START FROM HERE and some other facilities as well like jump to page x */}
        <div className="mt-2 flex flex-row justify-center">
          <div className="mr-auto pl-4">
            Show entries : &nbsp;&nbsp;
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
              className={
                isLight
                  ? 'border bg-white rounded px-3 py-1 outline-none text-sm'
                  : 'border bg-white rounded px-3 py-1 outline-none text-sm text-black'
              }
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              className="rounded-lg shadow bg-blue-600 text-white px-2 py-1"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              <i className="fas fa-step-backward" />
            </button>{' '}
            <button
              className="rounded-lg shadow bg-blue-600 text-white px-2 py-1"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <i className="fas fa-chevron-left" />
            </button>{' '}
            <span className="mx-4">
              <strong>{pageIndex + 1}</strong>{' '}
            </span>
            <button
              className="rounded-lg shadow bg-blue-600 text-white px-2 py-1"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <i className="fas fa-chevron-right" />
            </button>{' '}
            <button
              className="rounded-lg shadow bg-blue-600 text-white px-2 py-1"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              <i className="fas fa-step-forward" />
            </button>{' '}
          </div>
          <div className="ml-auto mr-4 mt-1 overflow">
            <span>
              Go to page:{' '}
              <input
                className="px-2 py-1 mr-2 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline ease-linear transition-all duration-150"
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: '100px' }}
              />
              of {pageOptions.length}
            </span>{' '}
          </div>
        </div>
        <br />
      </div>
    </div>
  );
}
