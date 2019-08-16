if(document.URL.indexOf("users") >= 0){ 
    // users, employees
        console.log("users");
        console.log(document.URL);

        $( document ).ready(function() {

    //on page load keep the user list populated------------START
    $.ajax({
        url: "users/list",
        dataType: "json",
    })
    .done((data) => {
        if(data) {
            var odata = $.parseJSON(JSON.stringify(data.docs));
            odata.forEach(item => {
                $('#myTableUsers > tbody:last-child').append(getRowHtmlUsers(item));
            });
        }
    })
    .fail((err) => {
        console.log("Error");
    });  
    //-------------------------------------------------------END

    //on add user submit the form----------------------------START
    $("#btnSubmit").click (() => {
        $("#addUserForm").submit();
    });

	$(document).on("submit", '#addUserForm', function(event) {
		event.preventDefault(); 
		var $form = $(this);
		
        $.ajax({
            url: 'users/add',
            data: $form.serializeArray(),
            type: 'POST'
        })
        .done((data) => {
            if(data) {
                var odata = $.parseJSON(JSON.stringify(data.docs));
                odata.forEach(item => {
                    $('#myTableUsers > tbody:last-child').append(getRowHtmlUsers(item));
                });
                $('#addUserForm').trigger("reset");
            }
        })
        .fail((err) => {
            console.log("Error");
        });
    });	  
    //-------------------------------------------------------END
	   
    //on click of delete record----------------------------START
    $(document).on("click", ".btn-del-recordUser", function(event) { 

        //identify the row which we will remove from our table.
        var row = $(this).parent().parent();

        $.ajax({
            url: 'users/delete',
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

// _id, name, email, password, acl

function getRowHtmlUsers(item) {
    var thtml = getTD(item.name) 
                + getTD(item.email) 
                + getTD(item.acl)
                + getDelBtnUsers(item._id);
    thtml = getTR(thtml);
    return thtml;
}
function getTD(val) {
    return '<td>'+ val + '</td>';
}

function getTR(val) {
    return '<tr>'+ val + '</tr>';
}

function getDelBtnUsers(val) {
    return '<td><button type="button" id='+ val +' class="btn btn-default btn-sm btn-del-recordUser"><span class="fa fa-trash-alt"></span> Delete </button></td>';
}

}

