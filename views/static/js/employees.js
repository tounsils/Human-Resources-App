if(document.URL.indexOf("employees") >= 0){ 
    // users, employees
        console.log("employees");
        console.log(document.URL);

        $( document ).ready(function() {

    //on page load keep the employee list populated------------START
    $.ajax({
        url: "employees/list",
        dataType: "json",
    })
    .done((data) => {
        if(data) {
            var odata = $.parseJSON(JSON.stringify(data.docs));
            var i = 1;
            odata.forEach(item => {
                item.row = i; i = i+1;
                $('#myTableEmployees > tbody:last-child').append(getRowHtmlEmployees(item));
            });
        }
    })
    .fail((err) => {
        console.log("Error");
    });  
    //-------------------------------------------------------END

    //on add employee submit the form----------------------------START
    $("#btnSubmit").click (() => {
        $("#addEmployeeForm").submit();
    });

	$(document).on("submit", '#addEmployeeForm', function(event) {
		event.preventDefault(); 
		var $form = $(this);
		
        $.ajax({
            url: 'employees/add',
            data: $form.serializeArray(),
            type: 'POST'
        })
        .done((data) => {
            if(data) {
                var odata = $.parseJSON(JSON.stringify(data.docs));
                odata.forEach(item => {
                    $('#myTableEmployees > tbody:last-child').append(getRowHtmlEmployees(item));
                });
                $('#addEmployeeForm').trigger("reset");
            }
        })
        .fail((err) => {
            console.log("Error");
        });
    });	  
    //-------------------------------------------------------END
	   
    //on click of delete record----------------------------START
    $(document).on("click", ".btn-del-recordEmployee", function(event) { 

        //identify the row which we will remove from our table.
        var row = $(this).parent().parent();

        $.ajax({
            url: 'employees/delete',
            data: { id:this.id },
            type: 'POST'
        })
        .done((data) => {
            if(data) {
               console.log(data);
               row.remove();
            }
        })
        .fail((err) => {
            console.log("Error");
        });
    });	
    //-------------------------------------------------------END


    //on EditBtnEmployees click  ----------------------------START
    $(document).on("click", ".btn-edit-recordEmployee", function(event) { 

        //identify the row which we will remove from our table.
        var row_index = $(this).parent().parent().index('tr');
        console.log(row_index);
        $('#modal_row').val(row_index);

        $.ajax({
            url: 'employees/findOne',
            data: { id:this.id },
            type: 'POST'
        })
        .done((data) => {
            if(data) {
               console.log(data);
               // read data 
               /**/
               var employee = JSON.parse(JSON.stringify(data))
               // Assing existing values to the modal popup fields
               //console.log(employee.docs.name);
               $("#update_Name").val(employee.docs.name);
               $("#update_Address").val(employee.docs.address);
               $("#update_Salary").val(employee.docs.salary);
               $("#_id").val(employee.docs._id);
   
               // Open modal popup
               $("#update_employee_modal").modal("show");
               //row.remove();
            }
        })
        .fail((err) => {
            console.log("Error");
        });

    });

        ///

    //-------------------------------------------------------END

    //on update employee submit the form----------------------------START
    $("#btnUpdateSubmit").click (() => {
        $("#update_employee_modal").submit();
    });
        // console.log($('#update_Name').val());  // Working


        $(document).on("submit", '#update_employee_modal', function(event) {
            event.preventDefault(); 
            //var $form = $(this);
            //console.log($form);
        //identify the row which we will remove from our table.
        //var item = $(this).parent().parent();

        //console.log(item);

            // how to work with jquerry modal ??
            // see https://www.codemag.com/Article/1511031/CRUD-in-HTML-JavaScript-and-jQuery
            //productUpdateInTable(_activeId);

            $(".update_employee_modal").find("#profile_mail").val("TEST_AJAX");


            // ++++++++++++++++++++++++++++++++++++++

            $.ajax({
                url: 'employees/update',
                data: {name: $('#update_Name').val(),
                address: $('#update_Address').val(),
                salary: $('#update_Salary').val(),
                id: $('#_id').val()},
                type: 'POST'
            })
            .done((data) => {
                if(data) {
                    console.log(data);
                    $("#update_employee_modal").modal("hide");
                    // reload Users by using readRecords();
                    

//read list **************************** START
//var rowindex = $('table tr').index(tr);
var items=document.getElementById('myTableEmployees').rows

var item=items[$('#modal_row').val()].cells
item[0].innerHTML=$('#_id').val();
item[1].innerHTML=$('#update_Name').val();
item[2].innerHTML=$('#update_Address').val();
item[3].innerHTML=$('#update_Salary').val();


//productUpdateInTable(item);

// reset table


/*
// read the table again
$.ajax({
    url: "employees/list",
    dataType: "json",
})
.done((data) => {
    if(data) {
        var odata = $.parseJSON(JSON.stringify(data.docs));
        odata.forEach(item => {
            $('#myTableEmployees > tbody:last-child').append(getRowHtmlEmployees(item));
        });
    }
})
.fail((err) => {
    console.log("Error");
});  
*/

//read list **************************** END


                    //row.update();  // NOT Working
                    console.log("row.update");
                     }
            })
            .fail((err) => {
                console.log("Error");
            });
            

    });	  
    //-------------------------------------------------------END

    function productUpdateInTable(item) {
        // Find Product in <table>
        var row =
        getRowHtmlEmployees(item._id);
        // Add changed product to table
        $(row).after(getRowHtmlEmployees(item._id));
        // Remove original product
        $(row).remove();

    }
      

function getRowHtmlEmployees(item) {
    var thtml = getTD(item._id) 
                + getTD(item.name) 
                + getTD(item.address) 
                + getTD(item.salary)
                + getDelBtnEmployees(item._id)
                + getEditBtnEmployees(item._id);
    thtml = getTR(thtml);
    return thtml;
}

function getTD(val) {
    return '<td>'+ val + '</td>';
}

function getTR(val) {
    return '<tr>'+ val + '</tr>';
}


function getDelBtnEmployees(val) {
    return '<td><button style="color:red" type="button" id='+ val +' class="btn btn-default btn-sm btn-del-recordEmployee"><span class="fa fa-trash-alt"></span> Delete </button> ';
}

// Just added

// added EditBtnEmployees
function getEditBtnEmployees(val) {
    return '<button style="color:green" type="button" id='+ val +' class="btn btn-default btn-sm btn-edit-recordEmployee" data-toggle="modal"><span class="fas fa-edit"></span> Edit </button></td>';
}


});

}