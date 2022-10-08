
$(document).ready(function () {

    var agent_id = document.getElementById('agents').innerHTML;
    // console.log(agent_id);
    // createRemittance()



    // $('#submit').on('click', function (e) {
    //     e.preventDefault()

    //     var product_name = $('#product_name').val()
    //     var customer_name = $('#customer_name').val()
    //     var product_quantity = $('#product_quantity').val()
    //     var order_date = $('#order_date').val()
    //     if (expenditure_title == '' || expenditure_type == '' || expenditure_amount == '' || expenditure_description == '' || receipt_id == '' || date == '') {
    //         sweet('question', 'Empty fields', 'Empty fields detected, please try again')
    //     } else {
    //         createExpenditure(agent_id, expenditure_title, expenditure_type, expenditure_amount, expenditure_description, receipt_id, date)
    //     }

    // })



    function sweet(icon, title, text) {
        Swal.fire({
            icon: icon,
            title: title,
            text: text
        })
    }


    fetchOrders(agent_id);

    // function fetchExpenditure(agent_id) {
    //     // console.log(agent_id);
    //     var settings = {
    //         "url": "inc/service/FetchExpenditureByIdAjax.php",
    //         "method": "POST",
    //         "timeout": 0,
    //         "headers": {
    //             "Content-Type": "application/json"
    //         },
    //         "data": JSON.stringify({
    //             "agent_id": agent_id
    //         }),
    //     };

    //     $.ajax(settings).done(function(data) {
    //         console.log(data)
    //         var datatable = $('#example').DataTable({
    //             dom: 'Bfrtip',
    //             destroy: true,
    //             serverside: true,
    //             processing: true,
    //             scrollX: true,
    //             data: data,
    //             "columns": [{
    //                 "data": "expenditure_title"
    //             }, {
    //                 "data": "expenditure_type"
    //             }, {
    //                 "data": "expenditure_amount"
    //             },{
    //                 "data": "expenditure_description"
    //             }, {
    //                 "data": "recipt_id"
    //             }, {
    //                 "data": "date"
    //             }, {
    //                 data: "remittance_id",
    //                 render: function (data, type, row) {
    //                     return `<button type='button' class='btn btn-success' ><i class='bi bi-check-circle view' data= ` + data + `></i></button>`;
    //                 },
    //             }],
    //             buttons: [
    //                 'copy', 'csv', 'excel', 'pdf', 'print'
    //             ]

    //         });

    //         datatable.columns.adjust();
    //     })
    // }

    function fetchOrders(agent_id) {

        $.ajax({
            url: 'inc/service/FetchOrderByIdAjax.php',
            method: 'POST',
            dataType: 'json',
            data: {
                agent_id: agent_id
            },

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
                    },  {
                        "data": "product_quantity"
                    }, {
                        "data": "date"
                    },
                        // {
                        //     data: "agent_id",
                        //     render: function (data, type, row) {
                        //         return `<button type='button' class='btn btn-success' ><i class='bi bi-check-circle view' data= ` + data + `></i></button>`;
                        //     },
                        // }
                    ],
                    buttons: [
                        'copy', 'csv', 'excel', 'pdf', 'print'
                    ],
                    order: [
                        [2, "desc"]
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
        if (event.target.classList.contains("view")) {
            var view_id = event.target.getAttribute("data");
            console.log("View From " + view_id)
            fetchExpenditureByID(view_id)
            // var div = $('<div class="card-body"><h5 class="card-title">Disabled Backdrop</h5><p>You can disable the backdrop by adding <code>data-bs-backdrop="false"</code> to <code>.modal-dialog</code></p><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#disablebackdrop"></button><div class="modal fade" id="disablebackdrop" tabindex="-1" data-bs-backdrop="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Disabled Backdrop</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">Non omnis incidunt qui sed occaecati magni asperiores est mollitia. Soluta at et reprehenderit. Placeat autem numquam et fuga numquam. Tempora in facere consequatur sit dolor ipsum. Consequatur nemo amet incidunt est facilis. Dolorem neque recusandae quo sit molestias sint dignissimos.</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div></div>')

        }

    })

    // fetchExpenditureByID(expenditure)
    function fetchExpenditureByID(agent) {


        $.ajax({
            url: 'inc/service/FetchExpenditureByIdAjax.php',
            type: 'POST',
            dataType: 'json',
            data: {
                agent_id: agent
            },
            success: function (data) {
                console.log(data)

                // console.log(data[0].job_id)
                $('#expenditure_id').html('Expenditure ID: #' + data[0].expenditure_id)
                $('#expenditure_title').html('Expenditure ID: #' + data[0].expenditure_title)
                $('#expenditure_type').html('Expenditure Type : ' + data[0].expenditure_type)
                $('#expenditure_amount').html('Expenditure Amount : ' + data[0].expenditure_amount)
                $('#expenditure_description').html('Expenditure Description : ' + data[0].expenditure_description)
                $('#receipt_id').html('Reciept ID : ' + data[0].receipt_id)
                $('#date').html('Expenditure Date : ' + data[0].date)
                // initMap()
                $('#disablebackdrop').modal('show');

            },
            error: function (xhr, status, errorThrown) {
                sweet('error', 'Network error', 'Check network and try again')

            }
        });

    }





})