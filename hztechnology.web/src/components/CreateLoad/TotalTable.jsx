import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useTable, useTableState } from 'react-table';

export default function TotalTable({incomeRate, expenseRate, totalMargin, setTotalMargin}) {


    const data = [
        {
            area: "Income",
            rate: incomeRate
        },
        {
            area: "Expenses",
            rate: expenseRate
        }
    ]

    const columns = useMemo(
        () => [
            {
            Header: '',
            accessor: 'area',
            
            },
          {
            Header: 'Rate',
            accessor: 'rate',
            Cell: ({ value }) => {
              const formattedValue = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(value);
              return <span>{formattedValue}</span>;
            },
          }
        ],
        []
      );
    
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { expanded },
      } = useTable({ columns, data}, useTableState);
    
      useEffect(() => {
        if (rows.length > 0) {
          let diff = 0;
        diff = rows[0].values.rate - rows[1].values.rate;
        setTotalMargin(diff);
        } 
      }, [rows]);
    

    return (
        <table {...getTableProps()} className="table-auto w-72">
        <thead>
            {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                <th
                    {...column.getHeaderProps()}
                    className="px-4 py-2 border-b-2 border-gray-500 bg-gray-200"
                >
                    {column.render('Header')}
                </th>
                ))}
            </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
                <tr
                {...row.getRowProps()}
                className="border-b border-gray-500 enabled:bg-gray-100 hover:bg-gray-100 hover:cursor-pointer"
                >
                {row.cells.map((cell) => (
                    <td
                    {...cell.getCellProps()}
                    className={`px-4 border py-2 ${
                        cell.column.cellClassName || 'text-right'
                    }`}
                    >
                    {cell.render('Cell')}
                    </td>
                ))}
                </tr>
            );
            })}
        </tbody>
        <tfoot>
            <tr>
            <td className="px-4 py-2" colSpan={columns.length - 1}>
                <strong>Total Margin:</strong>
            </td>
            <td className="px-4 py-2 text-right">
                <strong>
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(totalMargin)}
                </strong>
            </td>
            </tr>
        </tfoot>
        </table>
    )
}