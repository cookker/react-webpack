import React, {useReducer, createContext, useMemo, useEffect} from 'react'
import Form from './Form';
import Table from './Table';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0,
}

export const TableContext = createContext(
    {
        tableData: [],
        halted:true,
        dispatch: () => {},
    }
);

const initialState = {
    tableData: [],
    data: {
        row: 0,
        cell: 0,
        mine: 0,
    },
    timer:0,
    result:'',
    halted: true,
    openedCount: 0,
};

const plantMine = (row, col, mine) => {
    console.log("plantMine:", row, col, mine);

    const candidate = Array(row * col).fill().map((arr, i) => {
        return i;
    });
    const shuffle = [];
    while(candidate.length > row * col - mine){
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    const data = [];
    for(let i = 0 ; i < row ; i++){
        const rowData = [];
        data.push(rowData);
        for(let j = 0 ; j < col ; j++){
            rowData.push(CODE.NORMAL);
        }
    }

    for(let k = 0 ; k < shuffle.length ; k++){
        const vertical = Math.floor(shuffle[k] / col);
        const horizonal = shuffle[k] % col;
        data[vertical][horizonal] = CODE.MINE;
    }

    console.log(data);
    return data;
}

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = (state, action) => {
    switch(action.type) {
        case START_GAME: 
            return {
                ...state,
                data: {
                    row: action.row,
                    col: action.col, 
                    mine: action.mine
                },
                openedCount: 0,
                tableData: plantMine(action.row, action.col, action.mine),
                halted: false,
                timer: 0,
            };
        case OPEN_CELL: {
            const tableData = [...state.tableData];
            // tableData[action.row] = [...state.tableData[action.row]];
            // tableData[action.row][action.col] = CODE.OPENED;

            tableData.forEach((row,i) => {
                tableData[i] = [...state.tableData[i]];
                // tableData[i] = [...row];
            })

            const checked = [];
            let openedCount = 0;

            const checkArround = (r, c) => {
                if([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[r][c])){
                    return;
                }

                if( r < 0 || r >= tableData.length || c < 0 || c >= tableData[0].length){
                    return;
                }

                if(checked.includes(r + ',' + c)){
                    return;
                }
                checked.push(r + ',' + c);
                

                //주변 지뢰 개수 구하기
                let around = [];
                if(tableData[r - 1]){
                    around = around.concat(
                        tableData[r - 1][c - 1],
                        tableData[r - 1][c],
                        tableData[r - 1][c + 1],
                    );
                }
                around = around.concat(
                    tableData[r][c - 1],
                    tableData[r][c + 1],
                );
                if(tableData[r + 1]){
                    around = around.concat(
                        tableData[r + 1][c - 1],
                        tableData[r + 1][c],
                        tableData[r + 1][c + 1],
                    );
                }

                const count = around.filter((v) => 
                    [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
                
                
                //닫힌 칸일 경우에만 열면서 카운트 증가.
                if(tableData[r][c] === CODE.NORMAL){
                    openedCount += 1;
                }
                tableData[r][c] = count; 

                if(count === 0){
                    const near = [];
                    if(r - 1 > -1){
                        near.push([r - 1, c - 1]);
                        near.push([r - 1, c]);
                        near.push([r - 1, c + 1]);
                    }
                    near.push([r,c-1]);
                    near.push([r,c+1]);
                    if(r + 1 < tableData.length){
                        near.push([r + 1, c - 1]);
                        near.push([r + 1, c]);
                        near.push([r + 1, c + 1]);
                    }
                    near.forEach( (n) => {
                        if(tableData[n[0]][n[1]] !== CODE.OPENED){
                            checkArround(n[0], n[1])    
                        }
                    });
                } else {

                }
            };
            checkArround(action.row, action.col);
            
            let halted = false;
            let result = '';
            //승리 
            console.log('win condition', state.data.row , state.data.col,state.data.mine, state.openedCount, openedCount);
            if(state.data.row * state.data.col - state.data.mine === state.openedCount + openedCount) {
                halted = true;
                result = `${state.timer}초만에 승리했다`;
            }

            return {
                ...state,
                tableData,
                openedCount: state.openedCount + openedCount,
                halted,
                result: result,
            }
        };
        case CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.col] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted: true,
            }
        };
        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];

            if(tableData[action.row][action.col] === CODE.MINE) {
                tableData[action.row][action.col] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.col] = CODE.FLAG;
            }
            return {
                ...state,
                tableData,
            }
        };
        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];

            if(tableData[action.row][action.col] === CODE.FLAG_MINE) {
                tableData[action.row][action.col] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.col] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData,
            }
        };
        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];

            if(tableData[action.row][action.col] === CODE.QUESTION_MINE) {
                tableData[action.row][action.col] = CODE.MINE;
            } else {
                tableData[action.row][action.col] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData,
            }
        };

        case INCREMENT_TIMER: {
            return {
                ...state,
                timer: state.timer + 1,
            }
        }

        default:
            return state;
    }
}

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {tableData, halted, timer, result} = state;

    const value = useMemo(() => ({tableData, halted, dispatch}), [tableData, halted]); //dispatch는 항상 바뀌지 않기 때문에 바뀌는 목록에 추가하지 않아도 된다.

    useEffect(() => {
        let timer;
        if(halted === false){
            timer = setInterval(() => {
                dispatch({type:INCREMENT_TIMER})
            }, 1000)
        }
        
        return () => {
            clearInterval(timer);
        }
    },[halted]);


    return (
        <TableContext.Provider value={value}> 
            <Form/>
            <div>{timer}</div>
            <Table/>
            <div>{result}</div>
        </TableContext.Provider>
    );
};

export default MineSearch;