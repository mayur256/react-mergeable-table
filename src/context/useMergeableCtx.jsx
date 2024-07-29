// top level imports
import React from "react";

// Utils
import { NATIVE_ELEMENTS } from "../utils/Constants";

// props type helper lib
import PropTypes from "prop-types";

// Context instance
const MergeableContext = React.createContext({});

// reducer definition
function reducer(state, action) {
    switch (action.type) {
        case 'SET_CONTENTS': {
            return {
                ...state,
                contents: action.payload
            };
        }

        case 'ADD_CONTENT': {
            return {
                ...state,
                contents: [...state.contents, action.payload]
            };
        }

        case 'REMOVE_CONTENT': {
            return {
                ...state,
                contents: state.contents.filter((el) => el.sectionid !== action.payload)
            };
        }

        case 'SET_SELECTED_ITEM': {
            return { ...state, selectedItem: action.payload };
        }

        case 'SET_SELECTED_TABLE_CELL': {
            const tState = {
                ...state, contents: state.contents.map(c => {
                    if (c.sectionid === action.payload.sectionid && c.sectiontype === NATIVE_ELEMENTS.TABLE) {
                        return { ...c, selectedCells: action.payload.selectedCells };
                    }
                    return c;
                })
            }
            return tState;
        }

        case 'UPDATE_TABLE_LAYOUT': {
            const tState = {
                ...state,
                contents: state.contents.map(c => {
                    if (c.sectionid === action.payload.sectionid && c.sectiontype === NATIVE_ELEMENTS.TABLE) {
                        return { ...c, layout: action.payload.layout };
                    }
                    return c;
                })
            }
            return tState;
        }

        case 'UPDATE_TABLE': {
            const tState = {
                ...state, contents: state.contents.map(c => {
                    if (c.sectionid === action.payload.sectionid && c.sectiontype === NATIVE_ELEMENTS.TABLE) {
                        return { ...c, ...action.payload.table };
                    }
                    return c;
                })
            }
            return tState;
        }

        default: {
            return { ...state };
        }
    }
}

// hook definition
export const MergeableCtxProvider = ({ children }) => {

	// psuedo-global state definition
	const [state, dispatch] = React.useReducer(reducer, {
        selectedItem: null,
        contents: []
    });

	return (
		<MergeableContext.Provider
            value={{
                state,
                dispatch
            }}
		>
			{children}
		</MergeableContext.Provider>
	)
}

MergeableCtxProvider.propTypes = {
    children: PropTypes.node
}

export const useMergeableCtx = () => {
    // React.useDebugValue('MergeableContext');
	return React.useContext(MergeableContext);
}
