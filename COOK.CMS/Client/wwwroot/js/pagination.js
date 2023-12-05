window.pagination = (tableId) => {
    const table = document.getElementById(tableId);
    $(table).DataTable({
        "responsive": true,
        "autoWidth": false,
    });
};