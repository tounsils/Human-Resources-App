$( document ).ready(function() {

    //on page load keep the employee list populated------------START
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
        var row = $(this).parent().parent();

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
            var $form = $(this);
            //console.log($form);
            var row = $(this);
            // how to work with jquerry modal ??
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

// reset table

// read
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


//read list **************************** END


                    //row.update();  // NOT Working
                     }
            })
            .fail((err) => {
                console.log("Error");
            });
            

    });	  
    //-------------------------------------------------------END



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