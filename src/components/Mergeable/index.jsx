// top level imports
import React from "react";

// Context
// import { useMergeableCtx } from "../../context/useMergeableCtx";

// Constituent components
import { JsonToHtmlTable } from "../JsonToHtmlTable";

// Utils
// import { NATIVE_ELEMENTS } from "../../utils/Constants";
import { removeHighlight } from "../../utils/Common";

// prop-types helper lib
import PropTypes from "prop-types";

// Component definition
export function Mergeable({ layout, ...rest }) {

    /** Handler / Utility functions - starts */

    // handles click event within table
    const handleTableClick = (event) => {
        event.stopPropagation();
        let target = event.target;
        let parentTableTarget = event.currentTarget;

        if (!["TD", "TH"].includes(target.tagName)) {
            target = event.target.closest("td");
            parentTableTarget = target.closest("table")
        }

        if (!["TD", "TH"].includes(target.tagName)) return;

        const ctrlKey = event.ctrlKey || event.metaKey;

        target.focus()

        highlightCell(target, parentTableTarget, ctrlKey);
    }

    const highlightCell = (tdCell, parentTable, allowMultiple) => {

        if (!allowMultiple) removeHighlight(parentTable); 
        // add highlight to currently selected cell only
        tdCell.classList.add('bg-td-selected');
    }

    /** Handler / Utility functions - ends */

    // main renderer
    return (
        <JsonToHtmlTable
            layout={layout}
            onClicked={handleTableClick}
            {...rest}
        />
    )
};

Mergeable.propTypes = {
    layout: PropTypes.object.isRequired,
    onTableClicked: PropTypes.func
};
