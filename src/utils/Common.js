/**
 * @description - removes highlight classes from any previously highlighted cells of a table
 * @param {HTMLTableElement} parentTable 
 */
export const removeHighlight = (parentTable) => {
    if (parentTable?.classList.contains("select-all")) {
        parentTable.classList.remove("select-all")
    }
    const otherCells = document.querySelectorAll('table td.bg-td-selected, th.bg-td-selected');
    if (otherCells?.length > 0) {
        for (const cell of otherCells) {
            cell.classList.remove('bg-td-selected', 'opacity-25');
        }
    }
};

export function removeTablesHighlight() {
    const highlightedTabbles = document.querySelectorAll(".mergeable table.select-all");
    for (const table of highlightedTabbles) {
        table.classList.remove("select-all");
    }
}
