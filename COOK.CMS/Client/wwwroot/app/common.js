function validateForm(formSelector, validateData) {
    $(formSelector).validate({
        rules: validateData.rules,
        messages: validateData.messages,
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('div').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });

}

function onValid(formSelector) {
    return $(formSelector).valid();
}

function redirect(url) {
    window.location.href = url;
}

function alertSuccess(mess) {
    let options = {
        tapToDismiss: true,
        toastClass: 'toast',
        containerId: 'toast-container',
        debug: false,
        fadeIn: 300,
        fadeOut: 500,
        extendedTimeOut: 500,
        iconClass: 'toast-info',
        positionClass: 'toast-top-right',
        timeOut: 500, // Set timeOut to 0 to make it sticky
        titleClass: 'toast-title',
        messageClass: 'toast-message'
    }
    toastr.success(mess, options);
}

function alertFail(mess) {
    let options = {
        tapToDismiss: true,
        toastClass: 'toast',
        containerId: 'toast-container',
        debug: false,
        fadeIn: 300,
        fadeOut: 500,
        extendedTimeOut: 500,
        iconClass: 'toast-info',
        positionClass: 'toast-top-right',
        timeOut: 500, // Set timeOut to 0 to make it sticky
        titleClass: 'toast-title',
        messageClass: 'toast-message'
    }
    toastr.error(mess, options);
}

function showConfirm(message) {
    if (confirm(message)) {
        return true;
    }
    return false;
}

function showInfo(message) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    toastr.info(message);
}

function alertError(mess) {
    let options = {
        tapToDismiss: true,
        toastClass: 'toast',
        containerId: 'toast-container',
        debug: false,
        fadeIn: 300,
        fadeOut: 500,
        extendedTimeOut: 500,
        iconClass: 'toast-info',
        positionClass: 'toast-top-right',
        timeOut: 500, // Set timeOut to 0 to make it sticky
        titleClass: 'toast-title',
        messageClass: 'toast-message'
    }
    toastr.error(mess, options);
}

function searchForm() {
    var data = $(".saa-search-form").serialize();
    var table = $(".cook-datatables").DataTable();
    let url = $(".cook-datatables").attr("data-url") + "?" + data;
    //console.log(url);
    table.ajax.url(url);
    table.ajax.reload();

}

function initList() {

    let columns = [];
    let hiddenColumns = [];
    $(".cook-datatables thead tr th").each(function (index) {
        if ($(this).attr("data-field") != undefined) {

            if ($(this).attr("data-type") != undefined && $(this).attr("data-type") == 'img') {
                columns.push({
                    "data": $(this).attr("data-field"), "name": $(this).attr("data-name"),
                    "render": function (data, type, JsonResultRow, meta) {
                        return '<img src="' + data + '" style="width: 4rem; height: 4rem;" />';
                    }
                });
            } else if ($(this).attr("data-text") != undefined && $(this).attr("data-text") != null
                && $(this).attr("data-text").length > 0) {
                let source = JSON.parse($(this).attr("data-text"));

                columns.push({
                    "data": $(this).attr("data-field"), "name": $(this).attr("data-name"),
                    "render": function (data, type, JsonResultRow, meta) {
                        return source[data];
                    }
                });
            } else {
                columns.push({ "data": $(this).attr("data-field"), "name": $(this).attr("data-name") });
            }

            if ($(this).attr('data-visible') && ($(this).attr('data-visible') === true || $(this).attr('data-visible').toUpperCase() === 'FALSE')) {
                hiddenColumns.push(index);
            }
        } else {
            /*
            columns.push({
                "data": null, "defaultContent": `
                <a class="btn btn-info btn-sm" href="#"><i class="fas fa-pencil-alt"></i></a>
                <a class="btn btn-danger btn-sm" href="#"><i class="fas fa-trash"></i></a>
            `, "width": "80px" });
            */
        }

    });



    let columnDefs = [
        {
            "targets": [0],
            "visible": false,
            "searchable": false
        },
        {
            "width": "70px",
            "targets": [columns.length],
            "render": function (data, type, row, meta) {
                return `
                    <div class="btn-group btn-group-sm">
                        <a data-row-id="`+ row['id'] + `" href="javascript:void(0)" class="btn btn-info list-edit"><i class="fas fa-pencil-alt"></i></a>
                        <a data-row-id="`+ row['id'] + `" href="javascript:void(0)" class="btn btn-danger list-delete"><i class="fas fa-trash"></i></a>
                    </div>
                    `;
            }
        },
        {
            "orderable": false,
            "targets": [0, columns.length]
        }
    ];

    if (hiddenColumns && hiddenColumns.length) {
        columnDefs.push({
            "visible": false,
            "target": hiddenColumns.filter(ele => ele != 0 && ele != columns.length)
        });
    }

    $(".cook-datatables").DataTable(
        {
            "responsive": true,
            "ordering": true,
            "serverSide": true,
            "processing": true,
            "paging": true,
            "filter": true,
            "ajax": {
                "url": $(".cook-datatables").attr("data-url"),
                "type": "POST",
                "datatype": "json"
            },
            "columnDefs": columnDefs,
            "columns": columns
        }
    );
}

function initListAgent() {

    let columns = [];
    let hiddenColumns = [];
    $(".cook-datatables thead tr th").each(function (index) {
        if ($(this).attr("data-field") != undefined) {

            if ($(this).attr("data-type") != undefined && $(this).attr("data-type") == 'img') {
                columns.push({
                    "data": $(this).attr("data-field"), "name": $(this).attr("data-name"),
                    "render": function (data, type, JsonResultRow, meta) {
                        return '<img src="' + data + '" style="width: 4rem; height: 4rem;" />';
                    }
                });
            } else if ($(this).attr("data-text") != undefined && $(this).attr("data-text") != null
                && $(this).attr("data-text").length > 0) {
                let source = JSON.parse($(this).attr("data-text"));

                columns.push({
                    "data": $(this).attr("data-field"), "name": $(this).attr("data-name"),
                    "render": function (data, type, JsonResultRow, meta) {
                        return source[data];
                    }
                });
            } else {
                columns.push({ "data": $(this).attr("data-field"), "name": $(this).attr("data-name") });
            }

            if ($(this).attr('data-visible') && ($(this).attr('data-visible') === true || $(this).attr('data-visible').toUpperCase() === 'FALSE')) {
                hiddenColumns.push(index);
            }
        } else {
            /*
            columns.push({
                "data": null, "defaultContent": `
                <a class="btn btn-info btn-sm" href="#"><i class="fas fa-pencil-alt"></i></a>
                <a class="btn btn-danger btn-sm" href="#"><i class="fas fa-trash"></i></a>
            `, "width": "80px" });
            */
        }

    });



    let columnDefs = [
        {
            "targets": [0],
            "visible": false,
            "searchable": false
        },
        {
            "targets": [columns.length],
            "render": function (data, type, row, meta) {
                return `
                    
                    `;
            }
        },
        {
            "orderable": false,
            "targets": [0, columns.length]
        }
    ];

    if (hiddenColumns && hiddenColumns.length) {
        columnDefs.push({
            "visible": false,
            "target": hiddenColumns.filter(ele => ele != 0 && ele != columns.length)
        });
    }

    $(".cook-datatables").DataTable(
        {
            "responsive": true,
            "ordering": true,
            "serverSide": true,
            "processing": true,
            "paging": true,
            "filter": true,
            "ajax": {
                "url": $(".cook-datatables").attr("data-url"),
                "type": "POST",
                "datatype": "json"
            },
            "columnDefs": columnDefs,
            "columns": columns
        }
    );
}

function initListAction(dotNetHelper) {
    $(".cook-datatables").on("click", ".list-edit", function () {
        console.log("edit");
        dotNetHelper.invokeMethodAsync("Edit", $(this).attr("data-row-id"));
    });

    $(".cook-datatables").on("click", ".list-delete", function () {
        console.log("delete");
        dotNetHelper.invokeMethodAsync("Delete", $(this).attr("data-row-id"));
    });
    return "";
}

function OnLoad() {
    $(window).trigger("load");
}

function triggerClickEvent(selector) {
    let elements = $(selector);
    if (elements || elements.length) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].click();
        }
    }
}

function toggleDisabled(selector) {
    const elements = $(selector);

    if (elements === null || elements === undefined || elements.length === 0)
        return;

    for(let i = 0; i < elements.length; i++) {
        if(elements[i].disabled === undefined) 
            continue;

        elements[i].disabled = !elements[i].disabled;
    }
}

function setValueForInputText(selector, value) {
    let eles = $(selector);
    if (eles && eles.length) {
        for (let i = 0; i < eles.length; i++) {
            if (eles[i].nodeName !== 'INPUT') continue;
            eles[i].value = value;
        }
    }
}

function toggleSpinner(selector) {
    const spinners = selector === null || selector === undefined ? $('.spinner') : $(selector);

    if (spinners === null || spinners === undefined || spinners.length === 0) return;

    for (let i = 0; i < spinners.length; i++) {
        if ($(spinners[i]).hasClass('spinner-border')) {
            $(spinners[i]).removeClass('spinner-border spinner-border-sm');
        } else {
            $(spinners[i]).addClass('spinner-border spinner-border-sm');
        }
    }
}


