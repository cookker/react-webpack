import React, {memo, useMemo} from 'react';
import Tr from './Tr';

const Table = memo(({onclick, tableData, dispatch}) => {
    return (
         <table>
             {Array(tableData.length).fill().map( (tr, i) => 
             useMemo(() => (<Tr dispatch={dispatch} rowIndex={i} rowData={tableData[i]}/>)
             , [tableData[i]])
                )}
         </table>
    );
});

export default Table;