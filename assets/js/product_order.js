
$(document).ready(function () {

    var agent_id = document.getElementById('agents').innerHTML;
    var agent_name = document.getElementById('agent_name').innerHTML;
    var sales = document.getElementById('agents_salespoint').innerHTML;
    // console.log(agent_id);

    // createRemittance()



    $('#create_order').on('click', function (e) {
        e.preventDefault()

        var product_name = $('#product_name').val()
        var product_quantity = $('#product_quantity').val()
        // var customer_name = $('#customer_name').val()
        var date = $('#date').val()
        if (product_name == '' || product_quantity == '' || date == '') {
            sweet('question', 'Empty fields', 'Empty fields detected, please try again')
        } else {
            createProductOrder(agent_id, agent_name, sales, product_name, product_quantity, date)
        }

    })


    function createProductOrder(agent_id, agent_name, sales, product_name, product_quantity, date) {
        $('#create_order').text('Loading .....');
        $('#create_order').attr('disabled', true);
        $.ajax({
            url: 'inc/service/CreateProductOrderAjax.php',
            type: 'POST',
            dataType: 'json',
            data: {
                agent_id: agent_id,
                fullname: agent_name,
                // customer_name: customer_name,
                sales_point: sales,
                product_name: product_name,
                product_quantity: product_quantity,
                date: date
                // payment_type: payment_type
            },
            success: function (data) {
                console.log(data)
                $('#create_order').text('Create');
                $('#create_order').attr('disabled', false);
                if (data.message = 'success') {
                    sweet('success', 'Congrats', 'Order Placed successfully!')
                    $('#product_name').val('')
                    $('#product_quantity').val('')
                    $('#date').val('')
                } else {
                    sweet('error', 'Oops', 'There was an error, please try again')
                }

            },
            error: function (xhr, status, errorThrown) {
                sweet('error', 'Network error', 'Check network and try again')
                console.log("error status: " + xhr.status);
                console.log("errorThrown: " + errorThrown);
                $('#create_order').text('Create');
                $('#create_order').attr('disabled', false);
            }
        });


    }


    fetchProductName()
    
    function fetchProductName() {

        $.ajax({
            url: 'inc/service/FetchProductNameAjax.php',
            type: 'POST',
            dataType: 'json',
            success: function (data) {
                console.log(data)
                let video = $('#product_name');
                video.empty();
                video.append('<option selected="true" disabled>--Select Product Name--</option>');
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