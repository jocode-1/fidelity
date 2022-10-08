
$(document).ready(function () {

    var agent_id = document.getElementById('agents').innerHTML;
    var sales = document.getElementById('agents_salespoint').innerHTML;
    // console.log(agent_id);

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
            createRemittance(agent_id, remittance_title, amount_deposited, bank_deposited, teller_id, date, sales)
        }

    })


    function createRemittance(agent_id, remittance_title, amount_deposited, bank_deposited, teller_id, date, sales) {
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
                date: date,
                sales_point: sales
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




    fetchRemittance(agent_id);

    function fetchRemittance(agent_id) {
        // console.log(agent_id);
        var settings = {
            "url": "inc/service/FetchRemittanceByIdAjax.php",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "agent_id": agent_id
            }),
        };

        $.ajax(settings).done(function(data) {
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
                }, {
                    "data": "date"
                }, {
                    data: "remittance_id",
                    render: function (data, type, row) {
                        return `<button type='button' class='btn btn-success' ><i class='bi bi-check-circle view' data= ` + data + `></i></button>`;
                    },
                }],
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ]

            });

            datatable.columns.adjust();
        })
    }


    fetchRemittance();

    function fetchRemittance() {
        // console.log(agent_id);
        var settings = {
            "url": "inc/service/FetchRemittance.php",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            }
        };

        $.ajax(settings).done(function(data) {
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
                }, {
                    "data": "date"
                }, {
                    "data": "sales_point"
                }, {
                    data: "remittance_id",
                    render: function (data, type, row) {
                        return `<button type='button' class='btn btn-success' ><i class='bi bi-check-circle view' data= ` + data + `></i></button>`;
                    },
                }],
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ]

            });

            datatable.columns.adjust();
        })
    }




})