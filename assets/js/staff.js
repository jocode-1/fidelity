$(document).ready(function(){
   
    var merchant = '1234'//$('#merchant').val()
    
    
    fetchStaff()
    
    
    
    
    
    function fetchStaff() {

        $.ajax({
            url: 'inc/service/FetchStaffAjax.php',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data)
                $('#example').DataTable({
                    dom: 'Bfrtip',
                    destroy: true,
                    serverside: true,
                    processing: true,
                    scrollX: true,
                    data: data,
                    "columns": [{
                        "data": "staff_code"
                    }, {
                        "data": "fullname"
                    }, {
                        "data": "email"
                    },{
                        "data": "phone"
                    },{
                        "data": "address"
                    }, {
                        "data": "timestamp"
                    }, {
                        data: "staff_code",
                        render: function(data, type, row) {
                            return `<button class='edit' data=` + data + `>Remove</button>`;
                        }
                    }],
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print'
                    ],
                    order: [
                        [6, "desc"]
                    ],
                });

            },
            error: function (xhr, status, errorThrown) {
                sweet('error', 'Network error', 'Check network and try again')

            }
        });


    }

    function sweet(icon,title,text){
        Swal.fire({
            icon: icon,
            title: title,
            text: text
          })
    }


})