$(document).ready(function () {

    var merchant = '1234'//$('#merchant').val()







    function sweet(icon, title, text) {
        Swal.fire({
            icon: icon,
            title: title,
            text: text
        })
    }

    

    $('#example').on('click', function (event) {
        let e1 = event.target.getAttribute("id");
        if (event.target.classList.contains("edit")) {
            var edit_id = event.target.getAttribute("data");
            console.log("Edit From " + edit_id)
            editProductByID(edit_id)
            // var div = $('<div class="card-body"><h5 class="card-title">Disabled Backdrop</h5><p>You can disable the backdrop by adding <code>data-bs-backdrop="false"</code> to <code>.modal-dialog</code></p><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#disablebackdrop"></button><div class="modal fade" id="disablebackdrop" tabindex="-1" data-bs-backdrop="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Disabled Backdrop</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">Non omnis incidunt qui sed occaecati magni asperiores est mollitia. Soluta at et reprehenderit. Placeat autem numquam et fuga numquam. Tempora in facere consequatur sit dolor ipsum. Consequatur nemo amet incidunt est facilis. Dolorem neque recusandae quo sit molestias sint dignissimos.</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div></div>')

        }

    })

    // editProductByID(product)
    function editProductByID(product) {


        $.ajax({
            url: 'inc/service/FetchProductByIdAjax.php',
            type: 'POST',
            dataType: 'json',
            data: {
                product_id: product
            },
            success: function (data) {
                // console.log(data)
                for (var i = 0; i < data.length; i++) {

                    // console.log(data[i].product_price)

                    $('#product_id_update').val(data[i].product_id)
                    $('#product_name_update').val(data[i].product_name)
                    $('#sales_point_update').val(data[i].sales_point)
                    $('#product_quantity_update').val(data[i].product_quantity);
                    $('#empty_create_update').val(data[i].empty_create)
                    $('#product_category_update').val(data[i].product_category)
                    $('#product_price_update').val(data[i].product_price)
                    $('#product_description_update').val(data[i].product_description)
                    // initMap()
                    $('#disablebackdrop2').modal('show');
                }

            },
            error: function (xhr, status, errorThrown) {
                sweet('error', 'Network error', 'Check network and try again')

            }
        });

    }


  

    $('#update_product').on('click', function (e) {
        e.preventDefault()

        var product_name = $('#product_name_update').val()
        var sales_point = $('#sales_point_update').val()
        var product_quantity = $('#product_quantity_update').val()
        var empty_create = $('#empty_create_update').val()
        var product_category = $('#product_category_update').val()
        var product_price = $('#product_price_update').val()
        var product_description = $('#product_description_update').val()
        if (product_name == '' || sales_point == '' || product_quantity == '' || empty_create == '' || product_category == '' || product_price == '' || product_description == '') {
            sweet('question', 'Empty fields', 'Empty fields detected, please try again')
        } else {
            updateProduct(product_name, sales_point, product_quantity, empty_create, product_category, product_price, product_description)
        }

    })


    function updateProduct(product_name, sales_point, product_quantity, empty_create, product_category, product_price, product_description) {
        $('#update_product').text('Loading .....');
        $('#update_product').attr('disabled', true);
        $.ajax({
            url: 'inc/service/UpdateProductByIdAjax.php',
            type: 'POST',
            dataType: 'json',
            data: {
                // product_id: product_id,
                product_name: product_name,
                sales_point: sales_point,
                product_quantity: product_quantity,
                empty_create: empty_create,
                product_category: product_category,
                product_price: product_price,
                product_description: product_description,
            },
            success: function (data) {
                console.log(data)
                $('#update_product').text('Update Product');
                $('#update_product').attr('disabled', false);
                if (data.message = 'success') {
                    sweet('success', 'Congrats', 'Product Updated successfully!')
                    $('#product_name_update').val('')
                    $('#sales_point_update').val('')
                    $('#product_quantity_update').val('')
                    $('#empty_create_update').val('')
                    $('#product_category_update').val('')
                    $('#product_price_update').val('')
                    $('#product_description_update').val('')

                    $('#disablebackdrop2').modal('hide');
                    fetchProduct()
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


    fetchAgent()

    function fetchAgent() {

        $.ajax({
            url: 'inc/service/FetchAgentsAjax.php',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data)
                $('#example2').DataTable({
                    dom: 'Bfrtip',
                    destroy: true,
                    serverside: true,
                    processing: true,
                    scrollX: true,
                    data: data,
                    "columns": [{
                        "data": "agent_id"
                    }, {
                        "data": "fullname"
                    }, {
                        "data": "phone"
                    }, {
                        "data": "address"
                    }, {
                        "data": "email"
                    }, {
                        "data": "sales_point"
                    }, {
                        "data": "stampdate"
                    }, 
                    {
                        data: "agent_id",
                        render: function (data, type, row) {
                            return `<button type='button' class='btn btn-warning' ><i class='bi bi-pencil-square edit' data= ` + data + `></i></button>`;
                        },
                    }, {
                        data: "agent_id",
                        render: function (data, type, row) {
                            return `<button type='button' class='btn btn-success' ><i class='bi bi-check-circle view' data= ` + data + `></i></button>`;
                        },
                    }, {
                        data: "agent_id",
                        render: function (data, type, row) {
                            return `<button type='button' class='btn btn-danger' ><i class='bi bi-trash delete' data= ` + data + `></i></button>`;
                        },
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

    $('#example2').on('click', function (event) {
        let e1 = event.target.getAttribute("id");
        if (event.target.classList.contains("delete")) {
            var agent_id = event.target.getAttribute("data");
            console.log("Delete From " + agent_id)
            deleteAgent(agent_id)
            // var div = $('<div class="card-body"><h5 class="card-title">Disabled Backdrop</h5><p>You can disable the backdrop by adding <code>data-bs-backdrop="false"</code> to <code>.modal-dialog</code></p><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#disablebackdrop"></button><div class="modal fade" id="disablebackdrop" tabindex="-1" data-bs-backdrop="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Disabled Backdrop</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">Non omnis incidunt qui sed occaecati magni asperiores est mollitia. Soluta at et reprehenderit. Placeat autem numquam et fuga numquam. Tempora in facere consequatur sit dolor ipsum. Consequatur nemo amet incidunt est facilis. Dolorem neque recusandae quo sit molestias sint dignissimos.</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div></div>')

        }

    })

    function deleteAgent(agent_id) {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: 'inc/service/DeleteAgentAjax.php',
                    method: 'POST',
                    data: { agent_id: agent_id },
                    success: function (response) {
                        console.log(response)
                        Swal.fire(
                            'Deleted!',
                            'Agent have been deleted.',
                            'success'
                        )
                        fetchAgent()

                    }
                });

            }
        });


    }


    $('#example2').on('click', function (event) {
        let e1 = event.target.getAttribute("id");
        if (event.target.classList.contains("view")) {
            var view_id = event.target.getAttribute("data");
            console.log("View From " + view_id)
            fetchAgentByid(view_id)
            // var div = $('<div class="card-body"><h5 class="card-title">Disabled Backdrop</h5><p>You can disable the backdrop by adding <code>data-bs-backdrop="false"</code> to <code>.modal-dialog</code></p><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#disablebackdrop"></button><div class="modal fade" id="disablebackdrop" tabindex="-1" data-bs-backdrop="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Disabled Backdrop</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">Non omnis incidunt qui sed occaecati magni asperiores est mollitia. Soluta at et reprehenderit. Placeat autem numquam et fuga numquam. Tempora in facere consequatur sit dolor ipsum. Consequatur nemo amet incidunt est facilis. Dolorem neque recusandae quo sit molestias sint dignissimos.</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div></div>')

        }

    })

    function fetchAgentByid(agent) {


        $.ajax({
            url: 'inc/service/FetchAgentByIdAjax.php',
            type: 'POST',
            dataType: 'json',
            data: {
                agent_id: agent
            },
            success: function (data) {
                console.log(data)

                // console.log(data[0].job_id)
                $('#agent_id').html('ID: #' + data[0].agent_id)
                $('#fullname').html('Fullname : ' + data[0].fullname)
                $('#phone').html('Phone Number : ' + data[0].phone)
                $('#address').html('Address : ' + data[0].address)
                $('#email').html('E-mail : ' + data[0].email)
                $('#sales_point').html('Sales Point : ' + data[0].sales_point)
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