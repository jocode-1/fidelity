$(document).ready(function () {

    var agent_id = document.getElementById('agents').innerHTML;
    // console.log(agent_id)


    fetchAgentProduct(agent_id)

    function fetchAgentProduct(agent_id) {

        $.ajax({
            url: 'inc/service/FetchAgentProductByIdAjax.php',
            type: 'POST',
            dataType: 'json',
            data: {agent_id: agent_id},
            
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
                        "data": "product_id"
                    }, {
                        "data": "product_name"
                    },{
                        "data": "sales_point"
                    },{
                        "data": "product_quantity"
                    },{
                        "data": "empty_create"
                    }, {
                        "data": "product_category"
                    }, {
                        "data": "product_price"
                    }, {
                        "data": "published_date"
                    },{
                        data: "product_id",
                        render: function (data, type, row) {
                            return `<button type='button' class='btn btn-success' ><i class='bi bi-check-circle view' data= ` + data + `></i></button>`;
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
            fetchProductByID(view_id)
            // var div = $('<div class="card-body"><h5 class="card-title">Disabled Backdrop</h5><p>You can disable the backdrop by adding <code>data-bs-backdrop="false"</code> to <code>.modal-dialog</code></p><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#disablebackdrop"></button><div class="modal fade" id="disablebackdrop" tabindex="-1" data-bs-backdrop="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Disabled Backdrop</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">Non omnis incidunt qui sed occaecati magni asperiores est mollitia. Soluta at et reprehenderit. Placeat autem numquam et fuga numquam. Tempora in facere consequatur sit dolor ipsum. Consequatur nemo amet incidunt est facilis. Dolorem neque recusandae quo sit molestias sint dignissimos.</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div></div>')

        }

    })

    function fetchProductByID(product) {


        $.ajax({
            url: 'inc/service/FetchProductByIdAjax.php',
            type: 'POST',
            dataType: 'json',
            data: {
                product_id: product
            },
            success: function (data) {
                console.log(data)

                // console.log(data[0].job_id)
                $('#product_id').html('ID: #' + data[0].product_id)
                $('#product_name').html('Product Name : ' + data[0].product_name)
                $('#sales_point').html('Sales Point : ' + data[0].sales_point)
                $('#product_quantity').html('Product Quantity : ' + data[0].product_quantity)
                $('#empty_create').html('Empty Creates : ' + data[0].empty_create)
                $('#product_category').html('Product Category : ' + data[0].product_category)
                $('#product_price').html('Product Price : ' + data[0].product_price)
                $('#product_description').html('Product Description : ' + data[0].product_description)
                // initMap()
                $('#disablebackdrop').modal('show');

            },
            error: function (xhr, status, errorThrown) {
                sweet('error', 'Network error', 'Check network and try again')

            }
        });
      
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
                $('#sales_point_update').val( data[i].sales_point)
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


// DELETE PRODUCT BY PRODUCT_ID

    $('#example').on('click', function (event) {
        let e1 = event.target.getAttribute("id");
        if (event.target.classList.contains("delete")) {
            var delete_id = event.target.getAttribute("data");
            console.log("Delete From " + delete_id)
            deleteProductByID(delete_id)
            // var div = $('<div class="card-body"><h5 class="card-title">Disabled Backdrop</h5><p>You can disable the backdrop by adding <code>data-bs-backdrop="false"</code> to <code>.modal-dialog</code></p><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#disablebackdrop"></button><div class="modal fade" id="disablebackdrop" tabindex="-1" data-bs-backdrop="false"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Disabled Backdrop</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">Non omnis incidunt qui sed occaecati magni asperiores est mollitia. Soluta at et reprehenderit. Placeat autem numquam et fuga numquam. Tempora in facere consequatur sit dolor ipsum. Consequatur nemo amet incidunt est facilis. Dolorem neque recusandae quo sit molestias sint dignissimos.</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div></div></div>')

        }

    })

      function deleteProductByID(product_id) {

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
                    url: 'inc/service/DeleteProductByIdAjax.php',
                    method: 'POST',
                    data: { product_id: product_id },
                    success: function (response) {
                        fetchProduct()
                        // console.log(response)
                        Swal.fire(
                            'Deleted!',
                            'Product have been deleted.',
                            'success'
                        )
                        

                    }
                });

            }
        });


    }
    // END DELETE PRODUCT BY PRODUCT_ID

    $('#update_product').on('click', function (e) {
        e.preventDefault()

        var product_name = $('#product_name_update').val()
        var sales_point = $('#sales_point_update').val()
        var product_quantity = $('#product_quantity_update').val()
        var empty_create = $('#empty_create_update').val()
        var product_category = $('#product_category_update').val()
        var product_price = $('#product_price_update').val()
        var product_description = $('#product_description_update').val()
        if (product_name == '' || sales_point == '' || product_quantity == '' || empty_create == '' || product_category == '' || product_price == '' || product_description == '' ) {
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

    fetchCategory()
    function fetchCategory() {

        $.ajax({
            url: 'inc/service/FetchCategoryAjax.php',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data)
                let video = $('#product_category_update');
                video.empty();
                video.append('<option selected="true" disabled>--Select Category--</option>');
                video.prop('selectedIndex', 0);
                for (var i = 0; i < data.length; i++) {
                    video.append($('<option></option>').attr('value', data[i].category_id).text(data[i].category_name));

                }

            },
            error: function (xhr, status, errorThrown) {
                sweet('error', 'Network error', 'Check network and try again')

            }
        });


    }


    fetchModalspoint()
    function fetchModalspoint() {

        $.ajax({
            url: 'inc/service/FetchSalesPointAjax.php',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data)
                let video = $('#sales_point_update');
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


    

})