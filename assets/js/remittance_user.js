
$(document).ready(function () {

    var agent_id = document.getElementById('agents').innerHTML;
    console.log(agent_id);
    fetchRemittance(agent_id);
    // createRemittance()



    $('#submit').on('click', function (e) {
        e.preventDefault()

        var remittance_title = $('#remittance_title').val()
        var amount_deposited = $('#amount_deposited').val()
        var bank_deposited = $('#bank_deposited').val()
        var teller_id = $('#teller_id').val()
        var date = $('#date').val()
        if (remittance_title == '' || amount_deposited == '' || bank_deposited == '' || teller_id == '' || date == '') {
            sweet('question', 'Empty fields', 'Empty fields detected, please try again')
        } else {
            createRemittance(agent_id, remittance_title, amount_deposited, bank_deposited, teller_id, date)
        }

    })


    function createRemittance(agent_id, remittance_title, amount_deposited, bank_deposited, teller_id, date) {
        $('#create_sales').text('Loading .....');
        $('#create_sales').attr('disabled', true);
        $.ajax({
            url: 'inc/service/remittanceAjax.php',
            type: 'POST',
            dataType: 'json',
            data: {
                agent_id: agent_id,
                remittance_title: remittance_title,
                amount_deposited: amount_deposited,
                bank_deposited: bank_deposited,
                teller_id: teller_id,
                date: date
                // payment_type: payment_type
            },
            success: function (data) {
                // console.log(data)
                $('#create_sales').text('Create');
                $('#create_sales').attr('disabled', false);
                if (data.message = 'success') {
                    sweet('success', 'Congrats', 'Sales Remitted successfully!')
                    $('#product_name').val('')
                    $('#product_quantity').val('')
                    $('#product_category').val('')
                    $('#product_price').val('')
                    $('#product_description').val('')
                    $('#published_date').val('')
                } else {
                    sweet('error', 'Oops', 'There was an error, please try again')
                }

            },
            error: function (xhr, status, errorThrown) {
                sweet('error', 'Network error', 'Check network and try again')
                console.log("error status: " + xhr.status);
                console.log("errorThrown: " + errorThrown);
                $('#create_jobs').text('Create');
                $('#create_jobs').attr('disabled', false);
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


    fetchProduct()
    function fetchProduct() {

        $.ajax({
            url: 'inc/service/FetchProductAjax.php',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data)
                let video = $('#product_name');
                video.empty();
                video.append('<option selected="true" disabled>--Select Product--</option>');
                video.prop('selectedIndex', 0);
                for (var i = 0; i < data.length; i++) {
                    video.append($('<option></option>').attr('value', data[i].product_name).text(data[i].product_name));

                }

            },
            error: function (xhr, status, errorThrown) {
                sweet('error', 'Network error', 'Check network and try again')

            }
        });
    }

    $('#product_name').on('change', function () {
        var class1 = $('#product_name :selected').val();
        console.log(class1)
        $.ajax({
            url: 'inc/service/FetchProductAjax.php',
            type: "GET",
            dataType: "json",
            data: {
                product_id: class1,
            },
            success: function (res) {
                // console.log(res)
                $.each(res, function (i, p) {
                    // $('#product_price').append("texting");
                    $('#product_price').text($(p.product_price));
                    console.log(p)
                });
            },

            error: function (xhr) {
                alert("AJAX FAILED TEXT", "error");
            }
        });
    });










    fetchSalespoint()

    function fetchSalespoint() {

        $.ajax({
            url: 'inc/service/FetchSalesPointAjax.php',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data)
                let video = $('#sales_point');
                video.empty();
                video.append('<option selected="true" disabled>--Select Sales-Point--</option>');
                video.prop('selectedIndex', 0);
                for (var i = 0; i < data.length; i++) {
                    video.append($('<option></option>').attr('value', data[i].point_name + " ( " + data[i].point_address + " )").text(data[i].point_name + " ( " + data[i].point_address + " )"));

                }

            },
            error: function (xhr, status, errorThrown) {
                sweet('error', 'Network error', 'Check network and try again')

            }
        });


    }

   
    

    function fetchRemittance(agent_id) {
        //  console.log(agent_id);

         $.ajax({
            url: 'inc/service/FetchRemittanceByIdAjax.php',
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
                        "data": "remittance_title"
                    }, {
                        "data": "amount_deposited"
                    }, {
                        "data": "bank_deposited"
                    }, {
                        "data": "teller_id"
                    },{
                        "data": "date"
                    }, {
                        data: "agent_id",
                        render: function (data, type, row) {
                            return `<button type='button' class='btn btn-success' ><i class='bi bi-check-circle view' data= ` + data + `></i></button>`;
                        },
                    }],
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
            fetchExpenditureByID(view_id)
            // var div = $('<div class="card-body"><h5 class="card-title">Disabled Backdrop</h5><p>You can disable the backdrop by adding <code>data-bs-backdrop="false"</code> to <code>.modal-dialog</code></p><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#disablebackdrop"></button><div class="modal fade" id="disablebackdrop" tabindex="-1" data-bs-backdrop="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Disabled Backdrop</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">Non omnis incidunt qui sed occaecati magni asperiores est mollitia. Soluta at et reprehenderit. Placeat autem numquam et fuga numquam. Tempora in facere consequatur sit dolor ipsum. Consequatur nemo amet incidunt est facilis. Dolorem neque recusandae quo sit molestias sint dignissimos.</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div></div>')

        }

    })

    // fetchExpenditureByID(expenditure)
    function fetchExpenditureByID(agent) {


        $.ajax({
            url: 'inc/service/FetchRemittanceByIdAjax.php',
            type: 'POST',
            dataType: 'json',
            data: {
                agent_id: agent
            },
            success: function (data) {
                console.log(data)

                // console.log(data[0].job_id)
                $('#remittance_id').html('Remittance ID: ' + data[0].remittance_id)
                $('#remittance_title').html('Remittance Title: #' + data[0].remittance_title)
                $('#amount_deposited').html('Amount Deposited: #' + data[0].amount_deposited)
                $('#bank_deposited').html('Bank Deposited : ' + data[0].bank_deposited)
                $('#teller_id').html('Teller ID  : ' + data[0].teller_id)
                $('#date').html('Remittance Date : ' + data[0].date)
                // initMap()
                $('#disablebackdrop').modal('show');

            },
            error: function (xhr, status, errorThrown) {
                sweet('error', 'Network error', 'Check network and try again')

            }
        });

    }



})