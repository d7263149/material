import { useEffect, useMemo, useRef, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_SortingState,
  type MRT_RowVirtualizer,
} from 'material-react-table';
import { makeData, type Person } from './makeData';
import { Box } from '@mui/material';
import  data1  from "./json.json";
const Example = () => {


function working(s: string){

  // let sm:any = s.split(', ');
  //   let smt =  sm?.[0];

if(s){
  let sm:any = s.split(',');
  let a =  sm;
  // console.log(sm?.[0]);

  for (let index = 0; index < a.length; index++) {
    let element = a[index];
    return (
      <>
        {element}
      </>
    );
  }


 
  // return   sm[0];
}



  // if (smt){
  //   return smt;
  // }else{
  //   return s;
  // }
  // }else{
  //   return s;
  // }
  // Display output 
//  console.log(s);
  return s;
}

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'post_title',
        header: 'Name',
        filterVariant: 'text', // default
        // size: 150,
      },
      {
        accessorKey: 'field_phone',
        header: 'Phone',
        filterVariant: 'text', // default
        // size: 150,
      },
      {
        accessorKey: 'field_fax',
        header: 'Fax',
        filterVariant: 'text', // default
        // size: 150,
      },
      {
        accessorKey: 'field_website',
        header: 'URL',
        filterVariant: 'text', // default
        // size: 150,
      },
      {
        accessorKey: 'category',
        // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
        // filterFn: 'between',
        filterVariant: 'text', // default
        header: 'Category',
        size: 200,
        //custom conditional format and styling
        Cell: ({ cell }) => (
          
          <>
            <Box
              component="span"
              sx={(theme) => ({
                backgroundColor:
                  cell.getValue<number>() < 50_000
                    ? theme.palette.error.dark
                    : cell.getValue<number>() >= 50_000 &&
                      cell.getValue<number>() < 75_000
                      ? theme.palette.warning.dark
                      : theme.palette.success.dark,
                borderRadius: '0.25rem',
                color: '#fff',
                maxWidth: '9ch',
                p: '0.25rem',
              })}
            >
              {/* {cell.getValue<string>()} */}
              {/* <dd>{recipe.ingredient.join(",")}</dd> */}

              {
                working(cell.getValue<string>())
              }
            

            </Box>
           

          </>
        ),
      },
     
    ],
    [],
    //end
  );

  //optionally access the underlying virtualizer instance
  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);

  const [data, setData] = useState([] as any);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // setData(makeData(10000));
      setData(data1);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    //scroll to the top of the table when the sorting changes
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting]);

  const table = useMaterialReactTable({
    columns,
    data, //10,000 rows
    defaultDisplayColumn: { enableResizing: true },
    enableBottomToolbar: true,
    enableColumnResizing: true,
    enableColumnVirtualization: true,
    enableGlobalFilterModes: true,
    enablePagination: true,
    enableColumnPinning: true,
    enableRowNumbers: true,
    enableRowVirtualization: true,
    // initialState: { showColumnFilters: true },
    // muiTableContainerProps: { sx: { maxHeight: '600px' } },
    onSortingChange: setSorting,
    state: { isLoading, sorting },
    rowVirtualizerInstanceRef, //optional
    rowVirtualizerOptions: { overscan: 5 }, //optionally customize the row virtualizer
    columnVirtualizerOptions: { overscan: 2 }, //optionally customize the column virtualizer
    initialState: { pagination: { pageSize: 100, pageIndex: 0 }, showColumnFilters: true },
    muiPaginationProps: {
      color: 'primary',
      shape: 'rounded',
      showRowsPerPage: false,
      variant: 'outlined',
    },
    paginationDisplayMode: 'pages',
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
