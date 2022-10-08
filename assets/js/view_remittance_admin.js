
$(document).ready(function () {

   

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
        })
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
                $('#remittance_id').html('Remittance ID: #' + data[0].remittance_id)
                $('#amount_deposited').html('Amount Deposited: #' + data[0].amount_deposited)
                $('#bank_deposited').html('Bank Deposited : ' + data[0].bank_deposited)
                $('#teller_id').html('Teller ID  : ' + data[0].teller_id)
                $('#date').html('Remittance Date : ' + data[0].date)
                $('#sales_point').html('Sales Point : ' + data[0].sales_point)
                // initMap()
                $('#disablebackdrop').modal('show');

            },
            error: function (xhr, status, errorThrown) {
                sweet('error', 'Network error', 'Check network and try again')

            }
        });

    }




})