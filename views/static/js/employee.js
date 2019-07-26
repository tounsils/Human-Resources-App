$( document ).ready(function() {

    //on page load keep the employee list populated------------START
    $.ajax({
        url: "employee/list",
        dataType: "json",
    })
    .done((data) => {
        if(data) {
            var odata = $.parseJSON(JSON.stringify(data.docs));
            odata.forEach(item => {
                $('#myTable > tbody:last-child').append(getRowHtml(item));
            });
        }
    })
    .fail((err) => {
        console.log("Error");
    });  
    //-------------------------------------------------------END

    //on add employee submit the form----------------------------START
    $("#btnSubmit").click (() => {
        $("#addemployeeForm").submit();
    });

	$(document).on("submit", '#addemployeeForm', function(event) {
		event.preventDefault(); 
		var $form = $(this);
		
        $.ajax({
            url: 'employee/add',
            data: $form.serializeArray(),
            type: 'POST'
        })
        .done((data) => {
            if(data) {
                var odata = $.parseJSON(JSON.stringify(data.docs));
                odata.forEach(item => {
                    $('#myTable > tbody:last-child').append(getRowHtml(item));
                });
                $('#addemployeeForm').trigger("reset");
            }
        })
        .fail((err) => {
            console.log("Error");
        });
    });	  
    //-------------------------------------------------------END
	   
    //on click of delete record----------------------------START
    $(document).on("click", ".btn-del-record", function(event) { 

        //identify the row which we will remove from our table.
        var row = $(this).parent().parent();

        $.ajax({
            url: 'employee/delete',
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

});

function getRowHtml(item) {
    var thtml = getTD(item._id) 
                + getTD(item.name) 
                + getTD(item.address) 
                + getTD(item.salary)
                + getDelBtn(item._id);
    thtml = getTR(thtml);
    return thtml;
}
function getTD(val) {
    return '<td>'+ val + '</td>';
}

function getTR(val) {
    return '<tr>'+ val + '</tr>';
}

function getDelBtn(val) {
    return '<td><button type="button" id='+ val +' class="btn btn-default btn-sm btn-del-record"><span class="fa fa-trash-alt"></span> Delete </button></td>';
}