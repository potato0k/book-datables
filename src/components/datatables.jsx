import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Slider } from 'primereact/slider';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { BooksData } from "./data";
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import {
    Card,
    CardHeader,
    Input,
    Typography,
    CardBody,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import 'primeicons/primeicons.css';

export default function DataTables() {
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(true);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        initFilters();
    }, []);

    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            title: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            author: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            country: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            language: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            pages: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            year: { value: null, matchMode: FilterMatchMode.BETWEEN },
        });
        setGlobalFilterValue('');
    };

    const numberFilterTemplate = (options) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} useGrouping={false} />;
    };

    const titleBodyTemplate = (BooksData) => {
        return (
            <div className="flex items-center gap-3 ">
                <Avatar src={BooksData.imageLink} alt={BooksData.title} variant="square" size="xl" />
                <div className="flex flex-col ">
                    <a href={BooksData.link}>{BooksData.title}</a>
                </div>
            </div>
        );
    };
    
    const renderHeader = () => {

        return (
            <div className="flex justify-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    const header = renderHeader();

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Books list
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all books
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button className="flex items-center gap-3" color="blue" size="sm">
                            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add book
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-end gap-4 md:flex-row">
                    <div className="w-full md:w-72">
                    </div>
                </div>
            </CardHeader>
            <CardBody className="px-0">
                <DataTable value={BooksData}  removableSort paginator rows={20} rowsPerPageOptions={[20, 50, 100]} scrollable scrollHeight="1000px" dataKey="id" filters={filters}
                    globalFilterFields={['title', 'author', 'country', 'language', 'pages', 'year']} header={header} emptyMessage="No books found.">
                    <Column field="title" header="Title" sortable body={titleBodyTemplate} filter filterPlaceholder="Search by title" style={{ width: '30%', minWidth: '25rem' }} />
                    <Column field="author" header="Author" sortable filter filterPlaceholder="Search by author" style={{ width: '30%' }} />
                    <Column field="country" header="Country" sortable filter filterPlaceholder="Search by country" style={{ width: '10%' }} />
                    <Column field="language" header="Language" sortable filter filterPlaceholder="Search by language" style={{ width: '10%' }} />
                    <Column field="pages" header="Pages" sortable filterField="pages" dataType="numeric" style={{ width: '10%' }}  filter filterElement={numberFilterTemplate} />
                    <Column field="year" header="Year" sortable filterField="year" dataType="numeric" style={{ width: '10%' }}  filter filterElement={numberFilterTemplate} />
                </DataTable>
            </CardBody>

        </Card>
    );
}