
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


    fetchCredit();


    function fetchCredit() {

        $.ajax({
            url: 'inc/service/FetchCreditByIdAjax.php',
            method: 'POST',
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
                        "data": "product_name"
                    }, {
                        "data": "product_price"
                    }, {
                        "data": "product_quantity"
                    }, {
                        "data": "amount_credit"
                    }, {
                        "data": "customer_name"
                    }, {
                        "data": "sales_point"
                    }, {
                        data: "sales_id",
                        render: function (data, type, row) {
                            return `<button type='button' class='btn btn-success paid' data= ` + data + ` >Paid</button>`;
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
        if (event.target.classList.contains("paid")) {
            var paid_id = event.target.getAttribute("data");
            console.log("View From " + paid_id)
            UpdateSalesByID(paid_id)
            // var div = $('<div class="card-body"><h5 class="card-title">Disabled Backdrop</h5><p>You can disable the backdrop by adding <code>data-bs-backdrop="false"</code> to <code>.modal-dialog</code></p><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#disablebackdrop"></button><div class="modal fade" id="disablebackdrop" tabindex="-1" data-bs-backdrop="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Disabled Backdrop</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">Non omnis incidunt qui sed occaecati magni asperiores est mollitia. Soluta at et reprehenderit. Placeat autem numquam et fuga numquam. Tempora in facere consequatur sit dolor ipsum. Consequatur nemo amet incidunt est facilis. Dolorem neque recusandae quo sit molestias sint dignissimos.</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div></div>')

        }

    })

    // fetchExpenditureByID(expenditure)
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
                    url: 'inc/service/UpdateSalesPaidAjax.php',
                    method: 'POST',
                    data: { sales_id: credit },
                    success: function (response) {
                        fetchCredit()
                        // console.log(response)
                        Swal.fire(
                            'Marked Credit as Paid!',
                            'Paid.',
                            'success'
                        )
                        

                    }
                });

            }
        });


    }
    
    
    
    //   function UpdateCreditStatus(credit) {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes'
    //     }).then((result) => {
    //         if (result.value) {
    //             $.ajax({
    //                 url: 'inc/service/UpdateSalesPaidAjax.php',
    //                 method: 'POST',
    //                 data: { sales_id: credit },
    //                 success: function (response) {
    //                     fetchCredit()
    //                     // console.log(response)
    //                     Swal.fire(
    //                         'Marked Credit as Paid!',
    //                         'Paid.',
    //                         'success'
    //                     )
                        

    //                 }
    //             });

    //         }
    //     });


    // }





})