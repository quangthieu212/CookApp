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
    var table = $(".sam-datatables").DataTable();
    let url = $(".sam-datatables").attr("data-url") + "?" + data;
    //console.log(url);
    table.ajax.url(url);
    table.ajax.reload();

}

function initList() {

    let columns = [];
    let hiddenColumns = [];
    $(".sam-datatables thead tr th").each(function (index) {
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

    $(".sam-datatables").DataTable(
        {
            "responsive": true,
            "ordering": true,
            "serverSide": true,
            "processing": true,
            "paging": true,
            "filter": true,
            "ajax": {
                "url": $(".sam-datatables").attr("data-url"),
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
    $(".sam-datatables thead tr th").each(function (index) {
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

    $(".sam-datatables").DataTable(
        {
            "responsive": true,
            "ordering": true,
            "serverSide": true,
            "processing": true,
            "paging": true,
            "filter": true,
            "ajax": {
                "url": $(".sam-datatables").attr("data-url"),
                "type": "POST",
                "datatype": "json"
            },
            "columnDefs": columnDefs,
            "columns": columns
        }
    );
}

function initListAction(dotNetHelper) {
    $(".sam-datatables").on("click", ".list-edit", function () {
        console.log("edit");
        dotNetHelper.invokeMethodAsync("Edit", $(this).attr("data-row-id"));
    });

    $(".sam-datatables").on("click", ".list-delete", function () {
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

function ExportQRCodeToPDF_old(dataJsonString, options) {
    const objData = JSON.parse(dataJsonString);

    if (objData === null || objData === undefined
        || objData.qrCodes === null || objData.qrCodes === undefined || objData.qrCodes.length === 0
        || objData.product === null || objData.product === undefined) {
        alert("Không có dữ liệu");
        return;
    }

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF({ unit: "mm" });

    const fontSize = 10;
    doc.setFont("Roboto-Medium");
    doc.setFontSize(fontSize);

    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();

    const margin = 10;

    const colPerPage = 7;
    const rowPerPage = 10;
    let pageCount = Math.ceil(objData.qrCodes.length / (rowPerPage * colPerPage));

    let currentDatetime = new Date();

    let addedItemCount = 0;
    let qrImg;
    PAGE_LOOP:
    for (let page = 0; page < pageCount; page++) {
        if (page !== 0) {
            doc.addPage();
        }

        let px = margin;
        let py = margin / 2;

        // Begin: header
        doc.text("Tên sản phẩm: " + objData.product.Name, px, py);
        py += 5;
        if (objData.province !== null && objData.province !== undefined) {
            doc.text("Xuất cho tỉnh: " + objData.province.Name + " - Số lượng: " + objData.qrCodes.length, px, py);
        } else if (objData.agent !== null && objData.agent !== undefined) {
            doc.text("Xuất cho đại lý: " + objData.agent.Text + " - Số lượng: " + objData.qrCodes.length, px, py);
        }
        py += 5;
        doc.text("Ngày: "
            + currentDatetime.getFullYear() + '-'
            + (currentDatetime.getMonth() + 1).toString().padStart(2, '0') + '-'
            + currentDatetime.getDate().toString().padStart(2, '0') + ' '
            + currentDatetime.getHours().toString().padStart(2, '0') + ':'
            + currentDatetime.getMinutes().toString().padStart(2, '0') + ':'
            + currentDatetime.getMilliseconds().toString().padStart(3, '0'), px, py);
        py += 3;
        // End: header

        // Begin: content
        let imgW = 25;
        let imgH = 25;
        for (let row = 0; row < rowPerPage; row++) {
            px = margin * 1.5;
            py += 0.2; // top margin
            for (let col = 0; col < colPerPage; col++) {
                px += 0.2; // left margin
                if (addedItemCount === objData.qrCodes.length) {
                    doc.text('Trang ' + (page + 1) + ' của ' + Math.floor(pageCount) + ' trang (' + (addedItemCount - page * 70) + ' trong ' + objData.qrCodes.length + ' mã)', pageW - margin * 7, pageH - 5);
                    break PAGE_LOOP;
                }

                doc.addImage(objData.qrCodes[addedItemCount].ImageUrl, "PNG", px, py, imgW, imgH);

                doc.addImage('StaticFiles\\Images\\Templates\\domain-image.jpg', "PNG", px + 2.45, py + imgH - 1.2, 20, 2.643);

                addedItemCount++;

                px += 0.2; // right margin
                px += imgW; // next column
            }
            py += 1.5; // bottom margin
            py += imgH;// + 2.643; // next row
        }
        // End: content

        // Begin: Footer
        doc.text('Trang ' + (page + 1) + ' của ' + Math.floor(pageCount) + ' trang (' + (addedItemCount - page * 70) + ' trong ' + objData.qrCodes.length + ' mã)', pageW - margin * 7, pageH - 5);
        // End: Footer
    }

    doc.save(objData.product.Name + " - " + new Date().getTime() + ".pdf");
}

function ExportQRCodeToPDF(dataJsonString, options) {
    const objData = JSON.parse(dataJsonString);

    if (objData === null || objData === undefined
        || objData.qrCodes === null || objData.qrCodes === undefined || objData.qrCodes.length === 0
        || objData.product === null || objData.product === undefined) {
        alert("Không có dữ liệu");
        return;
    }

    const doc = initPdf();

    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();

    let currentDatetime = new Date();

    // BEGIN: CONTENT
    let addedItemCount = 0;

    let coordinate = {
        px : 5.5,
        py : 0
    };

    let qrOptions = {
        marginL: 1.131,
        marginB: 2.593,
        qr: {
            url: '', // TODO: dynamic url
            width: 18,
            height: 18
        },
        footer: {
            url: 'StaticFiles\\Images\\Templates\\domain-image.jpg', // size: 37 x 280
            width: 16, // qr.width - 2
            height: 2.114 // width * 37 / 280 (size of image)
        }
    };

    const rowPerPage = 14;
    const colPerPage = 15;

    const pageCount = Math.ceil(objData.qrCodes.length / (rowPerPage * colPerPage));

    PAGE_LOOP:
    for (let page = 0; page < pageCount; page++) {
        if (page !== 0) {
            doc.addPage();
            coordinate = {
                px: 5.5,
                py: 0
            };
        }

        addQrPageHeader(doc, coordinate, objData, currentDatetime);

        let isNewRow = false;
        for (let r = 0; r < rowPerPage; r++) {
            for (let c = 0; c < colPerPage; c++) {
                if (addedItemCount === objData.qrCodes.length) {
                    doc.text('Trang ' + (page + 1) + ' của ' + Math.floor(pageCount) + ' trang (' + (page * rowPerPage * colPerPage + 1) + ' ~ ' + addedItemCount + ')', 120, 55);
                    break PAGE_LOOP;
                }

                isNewRow = r !== 0 && c === 0;

                if (isNewRow) {
                    coordinate.px = 5.5;
                    coordinate.py += qrOptions.qr.height + qrOptions.footer.height + qrOptions.marginB;
                }

                qrOptions.qr.url = objData.qrCodes[addedItemCount].ImageUrl;

                addQRImage(doc, coordinate, qrOptions);

                addedItemCount++;
            }
        }

        doc.text('Trang ' + (page + 1) + ' của ' + Math.floor(pageCount) + ' trang (' + (page * rowPerPage * colPerPage + 1) + ' ~ ' + addedItemCount + ')', 120, 55);
    }

    // END: CONTENT

    doc.save(objData.product.Name + " - " + new Date().getTime() + ".pdf");
}

function initPdf() {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF({
        unit: "mm"
        , format: 'a3'
        //, orientation: "l"
    });

    doc.setFont("Roboto-Medium");
    doc.setFontSize(10);

    return doc;
}

function addQrPageHeader(doc, coordinate, objData, currentDatetime) {
    coordinate.py += 15;

    // doc.text("Tên sản phẩm: " + objData.product.Name, coordinate.px, coordinate.py);
    
    // doc.text("Tên sản phẩm: " + objData.product.Name, 7, 45);
    let pageHeader = "Tên sản phẩm: ".concat(objData.product.Name).concat(' - ');

    coordinate.py += 5;
    if (objData.province !== null && objData.province !== undefined) {
        // doc.text("Xuất cho tỉnh: " + objData.province.Name + " - Số lượng: " + objData.qrCodes.length, coordinate.px, coordinate.py);
        // doc.text("Xuất cho tỉnh: " + objData.province.Name, 7, 50);
        pageHeader = pageHeader.concat("Xuất cho tỉnh: ").concat(objData.province.Name).concat(' - ');
    } else if (objData.agent !== null && objData.agent !== undefined) {
        // doc.text("Xuất cho đại lý: " + objData.agent.Text + " - Số lượng: " + objData.qrCodes.length, coordinate.px, coordinate.py);
        // doc.text("Xuất cho đại lý: " + objData.agent.Text, 7, 50);
        pageHeader = pageHeader.concat("Xuất cho đại lý: ").concat(objData.agent.Text).concat(' - ');
    }

    // doc.text("Số lượng: " + objData.qrCodes.length, 7, 55);
    pageHeader = pageHeader.concat("Số lượng: ").concat(objData.qrCodes.length).concat(' - ');

    coordinate.py += 5;
    /*
    doc.text("Ngày: "
        + currentDatetime.getFullYear() + '-'
        + (currentDatetime.getMonth() + 1).toString().padStart(2, '0') + '-'
        + currentDatetime.getDate().toString().padStart(2, '0') + ' '
        + currentDatetime.getHours().toString().padStart(2, '0') + ':'
        + currentDatetime.getMinutes().toString().padStart(2, '0') + ':'
        + currentDatetime.getMilliseconds().toString().padStart(3, '0'),
        coordinate.px, coordinate.py);
    
    doc.text("Ngày: "
        + currentDatetime.getFullYear() + '-'
        + (currentDatetime.getMonth() + 1).toString().padStart(2, '0') + '-'
        + currentDatetime.getDate().toString().padStart(2, '0') + ' '
        + currentDatetime.getHours().toString().padStart(2, '0') + ':'
        + currentDatetime.getMinutes().toString().padStart(2, '0') + ':'
        + currentDatetime.getMilliseconds().toString().padStart(3, '0'),
        7, 60);
    */
    pageHeader = pageHeader.concat("Ngày: ");
    pageHeader = pageHeader.concat(currentDatetime.getFullYear()).concat('/'); // Year
    pageHeader = pageHeader.concat((currentDatetime.getMonth() + 1).toString().padStart(2, '0')).concat('/'); // Month
    pageHeader = pageHeader.concat(currentDatetime.getDate().toString().padStart(2, '0')).concat(' '); // Date
    pageHeader = pageHeader.concat(currentDatetime.getHours().toString().padStart(2, '0')).concat(':'); // Hour
    pageHeader = pageHeader.concat(currentDatetime.getMinutes().toString().padStart(2, '0')).concat(':'); // Minute
    pageHeader = pageHeader.concat(currentDatetime.getMilliseconds().toString().padStart(3, '0')); // Mini Second

    if (objData.province !== null && objData.province !== undefined) {
        doc.text(pageHeader, 65, 50);
    } else {
        doc.text(pageHeader, 55, 50);
    }
    coordinate.py += 15 + 22.707;
}

/*
 * coordinate = {
 *  px: 0,
 *  py: 0
 * };
 * 
 * qrOptions = {
 *  marginB = 2,
 *  qr: {  
 *      url: '',
 *      width: 18,
 *      height: 18
 *  },
 *  footer: {
 *      url: '',
 *      width: 18 - 2, // default: qr.width - 2
 *      height: (width * 37 / 280) // 2.114
 *  }
 * };
 */

function addQRImage(doc, coordinate, qrInfo) {
    doc.addImage(qrInfo.qr.url, "PNG", coordinate.px, coordinate.py, qrInfo.qr.width, qrInfo.qr.height);

    doc.addImage(qrInfo.footer.url, "PNG", coordinate.px + (qrInfo.qr.width - qrInfo.footer.width) / 2, coordinate.py + qrInfo.qr.height, qrInfo.footer.width, qrInfo.footer.height);

    coordinate.px += qrInfo.qr.width + qrInfo.marginL;
}

function initCustomFileInput(inputSelector, formSelector) {
    $(document).ready(function () {
        bsCustomFileInput.init();
    });
}

