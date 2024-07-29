/* eslint-disable react/prop-types */
// top level imports
import React from "react";

// prop-types helper lib
import PropTypes from "prop-types";

// Component definition
export function JsonToHtmlTable({
    layout,
    onClicked,
    ...rest
}) {

    /** Utility functions - starts */
    const parseJSON = (element, elementType = '') => {
        if (Array.isArray(element)) {
            return element.map((item, index) => (
                <React.Fragment key={index}>{parseJSON(item)}</React.Fragment>
            ));
        }

        if (typeof element === 'object') {
            const props = element[elementType];

            switch (elementType) {
                case 'table': {
                    return (
                        <table
                            {...(props.attributes ?? {})}
                            onClick={onClicked}
                            onPaste={rest.onPaste}
                            tabIndex={0}
                            onKeyDown={rest.onKeyDown}
                        >
                            {props.tbody && (
                                <>{parseJSON(props, 'tbody')}</>
                            )}
                        </table>
                    );
                }

                case 'tbody': {
                    return <tbody>{parseJSON(props, 'tr')}</tbody>
                }

                case 'tr': {
                    return props.map((row, index) => {
                        const hasTh = Object.prototype.hasOwnProperty.call(row, 'th');
                        return (
                            <tr
                                key={`tr-${index}`}
                                {...(row.attributes ?? {})}
                            >
                                {parseJSON(row, hasTh ? 'th' : 'td')}
                            </tr>
                        )
                    })
                }

                case 'th': {
                    return props?.map((cell, index) => {
                        return <th key={index} {...(cell.attributes ?? {})}>{cell.cellName}</th>
                    });
                }

                case 'td': {
                    return props?.map((cell, index) => {
                        return (
                            <td
                                key={index}
                                {...(cell.attributes ?? {})}
                                data-element-key={cell.elementKey ?? ''}
                            >
                                {cell.name}
                            </td>
                        );
                    });
                }

                default:
                    return null;
            }
        }
    }

    /** Utility functions - ends */


    // main renderer
    return (
        <>{parseJSON(layout, 'table')}</>
    )
};

JsonToHtmlTable.propTypes = {
    layout: PropTypes.object.isRequired,
    onClicked: PropTypes.func,
}
