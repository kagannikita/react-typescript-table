import {useEffect, useMemo, useState} from "react";
import {columns} from "../columns/columns";
import {useSortBy, useTable, usePagination, useRowSelect} from "react-table";
import axios from "axios";
import {IData, IRow} from "../columns/interfaces";
import IndeterminateCheckbox from "./IndeterminateCheckbox";

export const UsersTable=()=>{
 const tableColumns = useMemo(() => columns,[]);
 const [data,setData]=useState<IData[]>([])
 const [id,setId]=useState<number[]>([])

    useEffect(() => {
        axios
        .get<IData[]>(`https://jsonplaceholder.typicode.com/users`)
        .then((response) => {
                setData(response.data)
                if(id!==[]){
                    setData(response.data.filter(i => !id.includes(i.id)))
                }
            })
            .catch((ex) => {
                console.log(ex)
            })

    }, [id])

    const table=useTable({
     columns:tableColumns,
     data,
     initialState:{pageSize:5}
 },useSortBy,usePagination,useRowSelect,hooks => {
        hooks.visibleColumns.push(columns => [
            {
                id: 'selection',
                Header: ({ getToggleAllRowsSelectedProps }) => (
                    <div>
                        <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                    </div>
                ),
                Cell: ({ row }:any) => (
                    <div>
                        <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                    </div>
                ),
            },
            ...columns,
            {
                id: 'delete',
                Header: 'Delete Column',
                Cell: ({ row: { original } }:IRow) => (
                    <button
                    type="button"
                    className="link-button"
                    onClick={() =>{
                     setId(oldState=>[...oldState,original.id])
                    }}
                >
                   x
                </button>
                ),
            },
        ])
    })

    const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     page,
     nextPage,
     previousPage,
     canNextPage,
     canPreviousPage,
     pageOptions,
     state,
     prepareRow
 }   = table
    const {pageIndex}=state
    return (
        <>
            <table {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                <span>
                    {column.isSorted
                        ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                        : ''}
                  </span>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <div>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex+1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <button onClick={()=>previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
            </div>
        </>
    )
}
