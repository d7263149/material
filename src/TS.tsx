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
import './main.css';
const Example = () => {


function working(s: string){

  // let sm:any = s.split(', ');
  //   let smt =  sm?.[0];

if(s){
  let sm:any = s.split(',');
  let a =  sm;
  // console.log(sm?.[0]);
const options = [];
const colors = ['red','green', 'blue', 'black','purple'];
  for (let index = 0; index < a.length; index++) {
    let element = a[index];
    // var item = colors[Math.floor(Math.random() * colors.length)];
    var item = "san" + index;
    // for (var i = 2017; i <= 2050; i++) {

if(index < 3){


    options.push(<span className={item} style={{ marginLeft:'5px', color:'white',padding:'5px',borderRadius:'5px' }}  key={index}>{element}</span>);
}

    // }
  }
    return (
      <>
        <span className='random' style={{ display: '-webkit-box' }}>
  
          <span>{options}</span>
        </span>
      </>
    );
  // return   sm[0];
}
  return s;
}



  function working1(s: string) {

    // let sm:any = s.split(', ');
    //   let smt =  sm?.[0];

    if (s) {
      let sm: any = s.split(',');
      let a = sm;
      // console.log(sm?.[0]);
      const options = [];
      const colors = ['red', 'green', 'blue', 'black', 'purple'];
      for (let index = 0; index < a.length; index++) {
        let element = a[index];
        // var item = colors[Math.floor(Math.random() * colors.length)];
        var item =  "sand"+index;
        // for (var i = 2017; i <= 2050; i++) {
        if (index < 3) {
        options.push(<span className={item} style={{  marginLeft: '5px', color: 'white', padding: '5px', borderRadius: '5px' }} key={index}>{element}</span>);
        }
        // }
      }
      return (
        <>
          <span className='random' style={{ display: '-webkit-box' }}>

            <span>{options}</span>
          </span>
        </>
      );
      // return   sm[0];
    }
    return s;
  }

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'post_title',
        header: 'Name',
        filterFn: 'includesString',



        // size: 150,
      },
      {
        accessorKey: 'field_phone',
        header: 'Phone',
        // filterVariant: 'text', // default
        // size: 150,
      },
      {
        accessorKey: 'field_fax',
        header: 'Fax',
        // filterVariant: 'text', // default
        // size: 150,
      },
      {
        accessorKey: 'field_website',
        header: 'URL',
        showColumnFilters: false,
        enableColumnFilterModes:false,
        enableFilters:false,

        // filterVariant: 'text', // default
        // size: 150,
      },
      {
        accessorKey: 'category',
        // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
        // filterFn: 'between',
        filterVariant: 'text', // default
        header: 'Category',
        layoutMode: 'grid',
        //custom conditional format and styling
        size: 800,
        Cell: ({ cell }) => (
          
          <>
            
              {/* {cell.getValue<string>()} */}
              {/* <dd>{recipe.ingredient.join(",")}</dd> */}

              {
                working(cell.getValue<string>())
              }
            

            {/* </Box> */}
           

          </>
        ),
      },
      {
        accessorKey: 'services',
        // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
        // filterFn: 'between',
        filterVariant: 'text', // default
        header: 'services',
        size: 800,
        //custom conditional format and styling
        Cell: ({ cell }) => (

          <>


            {
              working1(cell.getValue<string>())
            }


            {/* </Box> */}


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
    // defaultColumn: {
    //   minSize: 20, //allow columns to get smaller than default
    //   maxSize: 9001, //allow columns to get larger than default
    //   size: 260, //make columns wider by default
    // },
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
