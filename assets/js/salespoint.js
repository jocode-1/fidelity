$(document).ready(function () {

    var merchant = '1234'//$('#merchant').val()


    fetchSalesPoint();





    function fetchSalesPoint() {

        $.ajax({
            url: 'inc/service/FetchSalesPointAjax.php',
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
                        "data": "point_id"
                    }, {
                        "data": "point_name"
                    }, {
                        "data": "point_address"
                    }, {
                        "data": "manager_number"
                    },  {
                        "data": "stampdate"
                    },
                    {
                        data: "point_id",
                       render: function (data, type, row) {
                            return `<button type='button' class='btn btn-success' ><i class='bi bi-check-circle view' data= ` + data + `></i></button>`;
                        },
                    }
                    // {
                    //     data: "product_id",
                    //     render: function (data, type, row) {
                    //         return `<button class='edit' data=` + data + `>Edit</button>`;
                    //     }
                    // }
                ],
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print'
                    ],
                    order: [
                        [5, "desc"]
                    ],
                });

            },
            error: function (xhr, status, errorThrown) {
                sweet('error', 'Network error', 'Check network and try again')

            }
        });


    }

    function sweet(icon, title, text) {
        Swal.fire({
            icon: icon,
            title: title,
            text: text
        })
    }

    $('#example').on('click', function (event) {
        let e1 = event.target.getAttribute("id");
        if (event.target.classList.contains("view")) {
            var view_id = event.target.getAttribute("data");
            console.log("View From " + view_id)
            fetchSalesPointByID(view_id)
        }

    })

    function fetchSalesPointByID(point) {


        $.ajax({
            url: 'inc/service/FetchSalesPointByIdAjax.php',
            type: 'POST',
            dataType: 'json',
            data: {
                point_id: point
            },
            success: function (data) {
                console.log(data)

                // console.log(data[0].job_id)
                $('#point_id').html('ID: #' + data[0].point_id)
                $('#point_name').html('Point Name : ' + data[0].point_name)
                $('#point_address').html('Point Address : ' + data[0].point_address)
                $('#manager_number').html('Manager Number : ' + data[0].manager_number)
                $('#date').html('Date : ' + data[0].stampdate)
                // initMap()
                $('#disablebackdrop').modal('show');

            },
            error: function (xhr, status, errorThrown) {
                sweet('error', 'Network error', 'Check network and try again')

            }
        });
      
    }

   

  
        

    

})