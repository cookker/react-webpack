import React, {useState, useReducer, useCallback, useEffect} from 'react';
import Table from './Table'


const initialState = {
    winner : '',
    turn : 'O',
    tableData: [['','',''],['','',''],['','','']],
    recentCell: [-1,-1],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'SET_TURN';
export const RESET_GAME = 'RESET_GAME';

// 리액트는 비동기로 상태를 바꾸기 때문에, 상태값을 바꾸기 위해서 useEffect를 사용하여야 한다.

const reducer = (state, action) => {
    switch (action.type){
        case SET_WINNER: {
            return {
                ...state,
                winner: action.winner,
            };
        }
        case CLICK_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]]; //immer라는 라이브러리로 가독성 해결. 
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell],
            };
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            }
        }
        case RESET_GAME: {
            return {
                ...state,
                winner : '',
                turn : 'O',
                tableData: [['','',''],['','',''],['','','']],
                recentCell: [-1,-1],
            }
        }
    }
}

const TicTakToe = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const {tableData, turn, winner, recentCell} = state;

    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('O');
    // const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);

    const onClickTable = useCallback( () => {
        dispatch({type: SET_WINNER, winner: 'O'}) //dispatch안에 액션객체를 넣는다. 
    }, [])

    useEffect(() => {
        const[row,cell] = recentCell;

        if(row < 0){
            return;
        }

        let win = false;
        const t = tableData;
        const r = row;
        const c = cell;

        if(t[r][0] === turn && t[r][1] === turn && t[r][2] === turn) {
            win = true;
        }
        if(t[0][c] === turn && t[1][c] === turn && t[2][c] === turn) {
            win = true;
        }
        if(t[0][0] === turn && t[1][1] === turn && t[2][2] === turn){
            win = true;
        }
        if(t[0][2] === turn && t[1][1] === turn && t[2][0] === turn){
            win = true;
        }

        if(win) {
            dispatch({type:SET_WINNER, winner: turn});
            dispatch({type:RESET_GAME});
        }else {
               //무승부 검사.
            let all = true;
            tableData.forEach( (row) => {
                row.forEach( (cell) => {
                    if(!cell){
                        all = false;
                    }
                })
            });

            if(all) { //무승부일 경우.
                dispatch({type:SET_WINNER, winner: 'DRAW'});
                dispatch({type:RESET_GAME});
            }else{
                dispatch({type:CHANGE_TURN});
            }
         
        }

    }, [recentCell]);

    return (
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}/>
            {winner && <div>{winner}님의 승리</div>}
        </>
    );
};

export default TicTakToe;