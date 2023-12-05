
function RunDataTables(tableId) {
    const table = document.getElementById(tableId);
    $(document).ready(function () {
        $(table).DataTable(
            {
                "responsive": true,
                "autoWidth": false,
                "ordering": true,
            }
        );
    });
}

function searchForm() {
    var data = $(".saa-search-form").serialize();
    var table = $(".sam-datatables").DataTable();
    let url = table.ajax.url() + "?" + data;

    table.ajax.url(url);
    table.ajax.reload();
    
}

function RunDataTablesSever(tableId,uri,columneDefine) {
    const table = document.getElementById(tableId);
    $(".sam-datatables").DataTable(
        {
            "responsive": true,
            "ordering": true,
            "serverSide": true,
            "processing": true,
            "paging": true,
            "filter": true,
            "ajax": {
                "url": uri,
                "type": "POST",
                "datatype": "json"
            },
            "columnDefs": [{
                "targets": [0],
                "visible": false,
                "searchable": false
            }],
            "columns":
                [
                    { "data": "id", "name": "ID", "autoWidth": true },
                    { "data": "name", "name": "Name", "autoWidth": true },
                    { "data": "address", "name": "Address", "autoWidth": true },
                    { "data": "phoneNumber", "name": "Phone", "autoWidth": true },
                    { "data": "email", "name": "Email", "autoWidth": true },
                    { "data": "level.name", "name": "Level", "autoWidth": true },
                    { "data": "type", "name": "Type", "autoWidth": true },
                    {
                        "data": "id", "autoWidth": true,
                        "render": function (data, type) {
                            if (type === 'display') {
                                let link = uri + "/action/" + data;
                                return '<a href="' + link + '">' + 'Details' + '</a>';
                            }
                            return data;
                        }
                    },
                ]
        }
    );
}

function registerEventClick(elementId, type) {
    const elemen = document.getElementById(elementId);
    $(document).ready(function () {
        $(elemen).click(function () {
            //call function
            if (type == "add") {
                AddComponents();
            }
            else if (type == "delete") {
                //remove
                RemoveComponents();
            }
        });
    });
}

function AddComponents() {
    let currentDiv = document.getElementById("searchCon");
    let parentnode = currentDiv.parentNode;
    let coutItem = parentnode.childElementCount;
    let newdiv = document.createElement("div");
    //add class for new div
    newdiv.classList.add("form-group");
    newdiv.setAttribute("id", "groupCondi" + coutItem);
    //add field select
    let newLabel = document.createElement("label");
    newLabel.innerHTML = "Field";
    let newSelect = document.createElement("select");
    newSelect.classList.add("custom-select");
    let opt1 = document.createElement("option");
    opt1.innerHTML = "Name";
    let opt2 = document.createElement("option");
    opt2.innerHTML = "Address";
    let opt3 = document.createElement("option");
    opt3.innerHTML = "Phone";
    let opt4 = document.createElement("option");
    opt4.innerHTML = "Email";
    newSelect.appendChild(opt1);
    newSelect.appendChild(opt2);
    newSelect.appendChild(opt3);
    newSelect.appendChild(opt4);
    //add condition select
    let newLabel1 = document.createElement("label");
    newLabel1.innerHTML = "Condition";
    let newSelect1 = document.createElement("select");
    newSelect1.classList.add("custom-select");
    let opt5 = document.createElement("option");
    opt5.innerHTML = "AND";
    let opt6 = document.createElement("option");
    opt6.innerHTML = "OR";
    newSelect1.appendChild(opt5);
    newSelect1.appendChild(opt6);
    //add field group
    newdiv.appendChild(newLabel);
    newdiv.appendChild(newSelect);
    //add condition group
    newdiv.appendChild(newLabel1);
    newdiv.appendChild(newSelect1);
    //add to parent
    parentnode.insertBefore(newdiv, currentDiv);
}

function RemoveComponents() {
    let currentDiv = document.getElementById("searchCon");
    let parentnode = currentDiv.parentNode;
    let coutItem = parentnode.childElementCount-1;
    if (coutItem > 0) {
        var myobj = document.getElementById("groupCondi" + coutItem);
        myobj.remove();
    }
}