import {Column} from "react-table";
import { Link } from 'react-router-dom'
import {IData, IRow} from "./interfaces";

export const columns:Array<Column<IData>> =[

    {
        Header: 'Id',
       accessor: (data: IData) => data.id,
    },
    {
        Header:'Show info',
        Cell: ({ row: { original } }:IRow) => (
            <Link to={`/users/${original.id}`}>
                Подробнее
            </Link>
),
    },
    {
        Header: 'Name',
        accessor: (data: IData) => data.name,
    },
    {
        Header:'Email',
        accessor: (data: IData) => data.email,
    },
    {
        Header: 'Phone number',
        accessor: (data: IData) => data.phone,
    },
    {
        Header: 'Website',
        accessor: (data: IData) => data.website,
    },
    {
        Header: 'Address',
        columns: [
            {
                Header: 'Street',
                accessor: (data: IData) => data.address.street,
            },
            {
                Header: 'Suite',
                accessor: (data: IData) => data.address.suite,
            },
            {
                Header: 'City',
                accessor: (data: IData) => data.address.city,
            },
            {
                Header: 'Zip code',
                accessor: (data: IData) => data.address.zipcode,
            },
            {
                Header: 'Geo',
                columns: [
                    {
                        Header: 'Lat',
                        accessor: (data: IData) => data.address.geo.lat,
                    },
                    {
                        Header: 'Lng',
                        accessor: (data: IData) => data.address.geo.lng,
                    }
                ]
            },

        ]
    },
    {
        Header:'Company',
        columns: [
            {
                Header:'Company Name',
                accessor: (data: IData) => data.company.name,
            },
            {
                Header: 'Catch Phrase',
                accessor: (data: IData) => data.company.catchPhrase,
            },
            {
                Header:'BS',
                accessor: (data: IData) => data.company.bs,
            }
        ]
    },
]
