import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useTable, useTableState } from 'react-table';

const RateTable = ({ data, setChargeToEdit }) => {
  const columns = useMemo(
    () => [
        {
        Header: 'ID',
        accessor: 'id',
        size: 300
        },
      {
        Header: 'Category',
        accessor: 'accessorial',
        cellClassName: 'text-center',
      },
      {
        Header: 'Notes',
        accessor: 'notes',
        cellClassName: 'text-center',
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
      },
      { Header: 'Quantity', accessor: 'quantity' },
      {
        Header: 'Total',
        accessor: 'total',
        Cell: ({ value }) => {
          const formattedValue = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(value);
          return <span>{formattedValue}</span>;
        },
      },
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

  const [total, setTotal] = React.useState(0);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const tableRef = useRef(null);

  const handleClickRow = (id) => {
    console.log(id)
    setSelectedRowIndex(id);
    setChargeToEdit(id);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        setSelectedRowIndex(null);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (rows.length > 0) {
      let sum = 0;
      rows.forEach((row) => {
        sum += row.values.total;
      });
      setTotal(sum);
    } else {
      setTotal(0);
    }
  }, [rows]);

  return (
    <div ref={tableRef}>
        <table {...getTableProps()} className="table-auto w-full">
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
            const isSelected = row.values.id === selectedRowIndex;
            const rowStyle = {
                backgroundColor: isSelected ? '#e2e8f0' : undefined,
            };
            return (
                <tr
                {...row.getRowProps()}
                style={rowStyle}
                className="border-b border-gray-500 enabled:bg-gray-100 hover:bg-gray-100 hover:cursor-pointer"
                onClick={() => handleClickRow(row.values.id)}
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
                <strong>Total:</strong>
            </td>
            <td className="px-4 py-2 text-right">
                <strong>
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(total)}
                </strong>
            </td>
            </tr>
        </tfoot>
        </table>
    </div>
  );
};

export default RateTable;