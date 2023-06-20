import React from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy, usePagination } from 'react-table'
import { ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon, ChevronDoubleRightIcon } from '@heroicons/react/20/solid'
import { Button, PageButton } from './Button'
import { classNames } from './Utils'
import { SortIcon, SortUpIcon, SortDownIcon } from './Icons'
import 'regenerator-runtime/runtime'
import { NavLink, Outlet, Link } from 'react-router-dom'

function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 200)
  
    return (
      <label className="flex gap-x-2 items-baseline">
        <span className="text-gray-700">Search: </span>
        <input
          type="text"
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} quotes...`}
        />
      </label>
    )
  }

  // This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id, render },
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set()
      preFilteredRows.forEach(row => {
        options.add(row.values[id])
      })
      return [...options.values()]
    }, [id, preFilteredRows])
  
    // Render a multi-select box
    return (
      <label className="flex gap-x-2 items-baseline">
        <span className="text-gray-700">{render("Header")}: </span>
        <select
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          name={id}
          id={id}
          value={filterValue}
          onChange={e => {
            setFilter(e.target.value || undefined)
          }}
        >
          <option value="">All</option>
          {options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    )
  }
  
  export function StatusPill({ value }) {
    const status = value ? value.toLowerCase() : "unknown";
  
    return (
      <span
        className={
          classNames(
            "px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm",
            status.startsWith("active") ? "bg-green-100 text-green-800" : null,
            status.startsWith("inactive") ? "bg-yellow-100 text-yellow-800" : null,
            status.startsWith("offline") ? "bg-red-100 text-red-800" : null,
          )
        }
      >
        {status}
      </span>
    );
  };
  
  export function AvatarCell({ value, column, row }) {
    return (
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10">
          <img className="h-10 w-10 rounded-full" src={row.original[column.imgAccessor]} alt="" />
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.original[column.emailAccessor]}</div>
        </div>
      </div>
    )
  }
  

export default function QuoteTable({data, selectedQuote, setSelectedQuote}) {
    let array = [
        "New",
        "In Progress",
        "Completed"
    ]
    const columns = React.useMemo(
        () => [
          {
            Header: 'Quote Number',
            accessor: d => `HZQ${d.quoteNumber}`, // accessor is the "key" in the data
          },
          {
            Header: 'Status',
            accessor: 'status'
          },
          {
            Header: 'Shipment Address',
            accessor: d => `${d.shipmentAddress.city}, ${d.shipmentAddress.state} ${d.shipmentAddress.zipCode}`,
          },
          {
            Header: 'Destination Address',
            accessor: d => `${d.destinationAddress.city}, ${d.destinationAddress.state} ${d.destinationAddress.zipCode}`,
          },
          {
            Header: 'Weight',
            accessor: 'totalWeight',
          },
          {
            Header: 'Shipper',
            accessor: 'shipper',
            Cell: ({ row }) => {
                console.log(row)
                return <Link class="font-hz-blue" to={`/shipper/${row.original.shipper.id}`}>{`${row.original.shipper.name}`}</Link>;
              },
          }
        ],
        []
      )
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
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
    
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
      } = useTable({ columns, data: data },
        useFilters, // useFilters!
        useGlobalFilter,
        useSortBy,
        usePagination,  // new
        )
        return (
        <>
            <div className="flex gap-x-2 border-y border-l border-gray-300 h-16 place-items-center px-2">
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
              {headerGroups.map((headerGroup) =>
                headerGroup.headers.map((column) =>
                  column.Filter ? (
                    <div className="mt-2 sm:mt-0" key={column.id}>
                      {column.render("Filter")}
                    </div>
                  ) : null
                )
              )}
            </div>
            <div class="">
                {/* table */}
                <div className="flex flex-col h-screen overflow-auto pb-48">
                <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                    <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200">
                        <table {...getTableProps()} className="w-full table-fixed divide-y divide-gray-200">
                        <thead className="bg-hz-gold">
                            {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                <th
                                    scope="col"
                                    className="group px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                >
                                    <div className="flex items-center justify-between">
                                    {column.render('Header')}
                                    {/* Add a sort direction indicator */}
                                    <span>
                                        {column.isSorted
                                        ? column.isSortedDesc
                                            ? <SortDownIcon className="w-4 h-4 text-gray-400" />
                                            : <SortUpIcon className="w-4 h-4 text-gray-400" />
                                        : (
                                            <SortIcon className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                                        )}
                                    </span>
                                    </div>
                                </th>
                                ))}
                            </tr>
                            ))}
                        </thead>
                        <tbody
                            {...getTableBodyProps()}
                            className="bg-white divide-y divide-gray-200"
                        >
                            {page.map((row, i) => {  // new
                            prepareRow(row)
                            return (
                                <tr class="hover:bg-gray-100 hover:cursor-pointer" {...row.getRowProps()} onClick={() => setSelectedQuote(row)}>
                                {row.cells.map(cell => {
                                    return (
                                    <td
                                        {...cell.getCellProps()}
                                        className="px-6 py-4 truncate"
                                        role="cell"
                                    >
                                        {cell.column.Cell.name === "defaultRenderer"
                                        ? <div className="text-sm text-gray-500">{cell.render('Cell')}</div>
                                        : cell.render('Cell')
                                        }
                                    </td>
                                    )
                                })}
                                </tr>
                            )
                            })}
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
                {/* Pagination */}
                <div className="py-3 flex items-center justify-between sticky bottom-0  px-2">
                <div className="flex-1 flex justify-between sm:hidden">
                    <Button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</Button>
                    <Button onClick={() => nextPage()} disabled={!canNextPage}>Next</Button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div className="flex gap-x-2 items-baseline">
                    <span className="text-sm text-gray-700">
                        Page <span className="font-medium">{state.pageIndex + 1}</span> of <span className="font-medium">{pageOptions.length}</span>
                    </span>
                    <label>
                        <span className="sr-only">Items Per Page</span>
                        <select
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        value={state.pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                        >
                        {[5, 10, 20].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                            </option>
                        ))}
                        </select>
                    </label>
                    </div>
                    <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <PageButton
                        className="rounded-l-md"
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                        >
                        <span className="sr-only">First</span>
                        <ChevronDoubleLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </PageButton>
                        <PageButton
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                        >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </PageButton>
                        <PageButton
                        onClick={() => nextPage()}
                        disabled={!canNextPage
                        }>
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </PageButton>
                        <PageButton
                        className="rounded-r-md"
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                        >
                        <span className="sr-only">Last</span>
                        <ChevronDoubleRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </PageButton>
                    </nav>
                    </div>
                </div>
            </div>
            </div>
          </>
        )
}


