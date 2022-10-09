
$(document).ready(function () {

    // var agent_id = document.getElementById('agents').innerHTML;
    // var sales = document.getElementById('agents_salespoint').innerHTML;
    // console.log(sales_point);

    // createRemittance()




    function sweet(icon, title, text) {
        Swal.fire({
            icon: icon,
            title: title,
            text: text
        })
    }


    fetchOrders();


    function fetchOrders() {

        $.ajax({
            url: 'inc/service/FetchAllOrderAjax.php',
            method: 'POST',
            dataType: 'json',
            success: function (data) {
                // console.log(data)

                $('#example').DataTable({
                    dom: 'Bfrtip',
                    destroy: true,
                    serverside: true,
                    processing: true,
                    scrollX: true,
                    data: data,
                    "columns": [{
                        "data": "fullname"
                    }, {
                        "data": "product_name"
                    }, {
                        "data": "product_quantity"
                    }, {
                        "data": "sales_point"
                    }, {
                        "data": "date"
                    }, 
                    // {
                    //     data: "status",
                    //     render: function (row, data, dataIndex) {
                    //         if (data["status"] == "Pending") {
                    //             return `<span class="badge bg-warning" data= ` + data + `> </span>`;
                    //         } else if (data["status"] == "Delivered") {
                    //             $(row).css("background-color", "#FA8072");
                    //         }
                    //     }
                    // },
                    {
                        data: "order_id",
                        render: function (data, type, row) {
                            return `<button type='button' class='btn btn-outline-danger btn-sm action' data= ` + data + `> Cancel Order </button>`;
                        },
                    }],
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print'
                    ],
                    order: [
                        [4, "desc"]
                    ],
                });

            },
            error: function (xhr, status, errorThrown) {
                sweet('error', 'Network error', 'Check network and try again')

            }
        });


    }


    $('#example').on('click', function (event) {
        let e1 = event.target.getAttribute("id");
        if (event.target.classList.contains("action")) {
            var order_id = event.target.getAttribute("data");
            console.log("View From " + order_id)
            UpdateOrderByID(order_id)
        }

    })

    function UpdateOrderByID(sales_id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: 'inc/service/UpdateOrderByIdAjax.php',
                    method: 'POST',
                    data: { sales_id: sales_id },
                    success: function (response) {
                        fetchOrders()
                        // console.log(response)
                        Swal.fire(
                            'Cancelled!',
                            'Order Cancelled Successfully.',
                            'success'
                        )
                        

                    }
                });

            }
        });


    }





})