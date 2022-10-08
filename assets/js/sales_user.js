
$(document).ready(function () {

    var agent_id = document.getElementById('agents').innerHTML;
    // console.log(agent_id);
    fetchSalesByid(agent_id);
    // createRemittance()


    // CREATE SALES POINT

    function fetchSalesByid(agent_id) {
         console.log(agent_id);

         $.ajax({
            url: 'inc/service/FetchSalesByIdAjax.php',
            type: 'POST',
            dataType: 'json',
            data: {
                agent_id: agent_id
            },
            success: function (data) {
                console.log(data)
                var datatable = $('#example').DataTable({
                    dom: 'Bfrtip',
                    destroy: true,
                    serverside: true,
                    processing: true,
                    scrollX: true,
                    data: data,
                    "columns": [{
                        "data": "product_name"
                    }, {
                        "data": "product_price"
                    }, {
                        "data": "product_quantity"
                    }, {
                        "data": "amount_paid"
                    },{
                        "data": "customer_name"
                    },{
                        "data": "amount_credit"
                    },{
                        "data": "sales_point"
                    },{
                        data: "sales_id",
                        render: function (data, type, row) {
                            return `<button type='button' class='btn btn-success' ><i class='bi bi-check-circle view' data= ` + data + `></i></button>`;
                        },
                    },],
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print'
                    ]
    
                });
    
                datatable.columns.adjust();

            },
            error: function (xhr, status, errorThrown) {
                sweet('error', 'Network error', 'Check network and try again')
                console.log("error status: " + xhr.status);
                console.log("errorThrown: " + errorThrown);
            
            }
        });
      
    }

    $('#example').on('click', function (event) {
        let e1 = event.target.getAttribute("id");
        if (event.target.classList.contains("view")) {
            var view_id = event.target.getAttribute("data");
            console.log("View From " + view_id)
            fetchSalesByID(view_id)
            // var div = $('<div class="card-body"><h5 class="card-title">Disabled Backdrop</h5><p>You can disable the backdrop by adding <code>data-bs-backdrop="false"</code> to <code>.modal-dialog</code></p><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#disablebackdrop"></button><div class="modal fade" id="disablebackdrop" tabindex="-1" data-bs-backdrop="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Disabled Backdrop</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">Non omnis incidunt qui sed occaecati magni asperiores est mollitia. Soluta at et reprehenderit. Placeat autem numquam et fuga numquam. Tempora in facere consequatur sit dolor ipsum. Consequatur nemo amet incidunt est facilis. Dolorem neque recusandae quo sit molestias sint dignissimos.</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div></div>')

        }

    })

    function fetchSalesByID(agent_id) {


        $.ajax({
            url: 'inc/service/FetchAllSalesByIdAjax.php',
            type: 'POST',
            dataType: 'json',
            data: {
                sales_id: agent_id
            },
            success: function (data) {
                console.log(data)

                // console.log(data[0].job_id)
                $('#product_name').html('Product Name: #' + data[0].product_name)
                $('#product_price').html('Product Proce : ' + data[0].product_price)
                $('#product_quantity').html('Product Quantity : ' + data[0].product_quantity)
                $('#amount_paid').html('Amount Paid : ' + data[0].amount_paid)
                $('#customer_name').html('Customee Name : ' + data[0].customer_name)
                $('#payment_type').html('Payment Type : ' + data[0].payment_type)
                $('#sales_point').html('Sales Point : ' + data[0].sales_point)
                // initMap()
                $('#disablebackdrop').modal('show');

            },
            error: function (xhr, status, errorThrown) {
                // sweet('error', 'Network error', 'Check network and try again')

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
        if (event.target.classList.contains("credit")) {
            var credit_id = event.target.getAttribute("data");
            console.log("Delete From " + credit_id)
            UpdateSalesByID(credit_id)
        }

    })

      function UpdateSalesByID(credit) {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: 'inc/service/UpdateSalesByIdAjax.php',
                    method: 'POST',
                    data: { sales_id: credit },
                    success: function (response) {
                         fetchSalesByid(agent_id)
                        // console.log(response)
                        Swal.fire(
                            'Marked Product on Credit!',
                            'Product Bought on Credit.',
                            'success'
                        )
                        

                    }
                });

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


})