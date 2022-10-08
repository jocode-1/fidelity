
$(document).ready(function () {

    var merchant = '1234'//$('#merchant').val()

    fetchCategory()
    $('#create_agent').on('click', function (e) {
        e.preventDefault()
        var fullname = $('#fullname').val()
        var email = $('#email').val()
        var phone = $('#phone').val()
        var address = $('#address').val()
        var sales_point = $('#sales_point').text()
         var sales_point_id = $('#sales_point').val()
        var role = $('#role').val()
        if (fullname == '' || email == '' || phone == '' || address == '' || sales_point == '') {
            sweet('question', 'Empty fields', 'Empty fields detected, please try again')
        } else {
            createStaff(fullname, email, phone, address, sales_point,sales_point_id, role)
        }

    })



    $('#create_product').on('click', function (e) {
        e.preventDefault()

        var sales_point_id = $('#sales_point').val()
        var product_name = $('#product_name').val()
        var sales_point = $('#sales_point option:selected').text()
        var product_quantity = $('#product_quantity').val()
        var empty_create = $('#empty_create').val()
        var product_category = $('#product_category').val()
        var product_price = $('#product_price').val()
        var published_date = $('#published_date').val()
        if (product_name == '' || sales_point == '' || product_quantity == '' || empty_create == '' || product_category == '' || product_price == '' ||  published_date == '') {
            sweet('question', 'Empty fields', 'Empty fields detected, please try again')
        } else {
            createProduct(sales_point_id,product_name, sales_point, product_quantity, empty_create, product_category, product_price, published_date)
        }

    })

    $('#create_point').on('click', function (e) {
        e.preventDefault()

        var point_name = $('#point_name').val()
        var point_address = $('#point_address').val()
        var manager_number = $('#manager_number').val()
        if (point_name == '' || point_address == '' || manager_number == '') {
            sweet('question', 'Empty fields', 'Empty fields detected, please try again')
        } else {
            createSalesPoint(point_name, point_address, manager_number)
        }

    })

    $('#create_product_name').on('click', function (e) {
        e.preventDefault()

        var product_name = $('#product_name').val()
        if (product_name == '') {
            sweet('question', 'Empty fields', 'Empty fields detected, please try again')
        } else {
            createProductName(product_name)
        }

    })




    function createProductName(product_name) {
        $('#create_product_name').text('Loading .....');
        $('#create_product_name').attr('disabled', true);
        $.ajax({
            url: 'inc/service/CreateProductNameAjax.php',
            type: 'POST',
            dataType: 'json',
            data: {
                // product_id: product_id,
                product_name: product_name
            },
            success: function (data) {
                console.log(data)
                $('#create_product_name').text('Create');
                $('#create_product_name').attr('disabled', false);
                if (data.message = 'success') {
                    sweet('success', 'Congrats', 'Product Name created successfully!')
                    $('#product_name').val('')
                } else {
                    sweet('error', 'Oops', 'There was an error, please try again')
                }

            },
            error: function (xhr, status, errorThrown) {
                sweet('error', 'Network error', 'Check network and try again')
                console.log("error status: " + xhr.status);
                console.log("errorThrown: " + errorThrown);
                $('#create_product_name').text('Create');
                $('#create_product_name').attr('disabled', false);
            }
        });


    }






    function createProduct(sales_point_id, product_name, sales_point, product_quantity, empty_create, product_category, product_price, published_date) {
        $('#create_product').text('Loading .....');
        $('#create_product').attr('disabled', true);
        $.ajax({
            url: 'inc/service/CreateProductAjax.php',
            type: 'POST',
            dataType: 'json',
            data: {
                // product_id: product_id,
                sales_point_id: sales_point_id,
                product_name: product_name,
                sales_point: sales_point,
                product_quantity: product_quantity,
                empty_create: empty_create,
                product_category: product_category,
                product_price: product_price,
                published_date: published_date
            },
            success: function (data) {
                console.log(data)
                $('#create_product').text('Create');
                $('#create_product').attr('disabled', false);
                if (data.message = 'success') {
                    sweet('success', 'Congrats', 'Product created successfully!')
                    $('#product_name').val('')
                    $('#sales_point').val('')
                    $('#product_quantity').val('')
                    $('#empty_create').val('')
                    $('#product_category').val('')
                    $('#product_price').val('')
                    // $('#product_description').val('')
                    $('#published_date').val('')
                } else {
                    sweet('error', 'Oops', 'There was an error, please try again')
                }

            },
            error: function (xhr, status, errorThrown) {
                sweet('error', 'Network error', 'Check network and try again')
                console.log("error status: " + xhr.status);
                console.log("errorThrown: " + errorThrown);
                $('#create_product').text('Create');
                $('#create_product').attr('disabled', false);
            }
        });


    }

    // CREATE SALES POINT

    function createSalesPoint(point_name, point_address, manager_number) {
        $('#create_product').text('Loading .....');
        $('#create_product').attr('disabled', true);
        $.ajax({
            url: 'inc/service/CreateSalesPointAjax.php',
            type: 'POST',
            dataType: 'json',
            data: {
                // product_id: product_id,
                point_name: point_name,
                point_address: point_address,
                manager_number: manager_number
            },
            success: function (data) {
                console.log(data)
                $('#create_point').text('Create');
                $('#create_point').attr('disabled', false);
                if (data.message = 'success') {
                    sweet('success', 'Congrats', 'Sales Point created successfully!')
                    $('#point_name').val('')
                    $('#point_address').val('')
                    $('#manager_number').val('')
                } else {
                    sweet('error', 'Oops', 'There was an error, please try again')
                }

            },
            error: function (xhr, status, errorThrown) {
                sweet('error', 'Network error', 'Check network and try again')
                console.log("error status: " + xhr.status);
                console.log("errorThrown: " + errorThrown);
                $('#create_point').text('Create');
                $('#create_point').attr('disabled', false);
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



    function fetchCategory() {

        $.ajax({
            url: 'inc/service/FetchCategoryAjax.php',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data)
                let video = $('#product_category');
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

    fetchSalespoint()

    function fetchSalespoint(point) {

        $.ajax({
            url: 'inc/service/FetchSalesPointAjax.php',
            type: 'GET',
            dataType: 'json',
            data: {point_id: point},
            success: function (data) {
                console.log(data)
                let video = $('#sales_point');
                video.empty();
                video.append('<option selected="true" disabled>--Select Sales-Point--</option>');
                video.prop('selectedIndex', 0);
                for (var i = 0; i < data.length; i++) {
                    video.append($('<option></option>').attr('value', data[i].point_id).text(data[i].point_name + " ( " + data[i].point_address + " )"));

                }

            },
            error: function (xhr, status, errorThrown) {
                sweet('error', 'Network error', 'Check network and try again')

            }
        });


    }

    // $('#sales_point').on('change', function () {
	// 	var cl = $('#sales_point :selected').val();
	// 	// console.log(cl)
	// 	$.ajax({
	// 		url: 'inc/service/FetchAgentsAjax.php',
	// 		type: "GET",
	// 		dataType: "json",
	// 		data: {
	// 			point_id: cl,
	// 		},
	// 		success: function (res) {
	// 			// console.log(res)
	// 			$.each(res, function (i, p) {
    //                 $('#agent').text(p.agent_name);
    //                 console.log(p)
	// 			});
	// 		},

	// 		error: function (xhr) {
	// 			alert("AJAX FAILED TEXT", "error");
	// 		}
	// 	});
	// });

    // fetchAgent()

    // function fetchAgent() {

    //     $.ajax({
    //         url: 'inc/service/FetchAgentAjax.php',
    //         type: 'GET',
    //         dataType: 'json',
    //         success: function (data) {
    //             console.log(data)
    //             let video = $('#agent');
    //             video.empty();
    //             video.append('<option selected="true" disabled>--Select Agent--</option>');
    //             video.prop('selectedIndex', 0);
    //             for (var i = 0; i < data.length; i++) {
    //                 video.append($('<option></option>').attr('value', data[i].agent_name + " ( " + data[i].agent_ + " )").text(data[i].point_name + " ( " + data[i].point_address + " )"));

    //             }

    //         },
    //         error: function (xhr, status, errorThrown) {
    //             sweet('error', 'Network error', 'Check network and try again')

    //         }
    //     });


    // }

    
    // CREATE SALES POINT

    function createStaff(fullname, email, phone, address, sales_point,sales_point_id, role) {
        $('#create_product').text('Loading .....');
        $('#create_product').attr('disabled', true);
        $.ajax({
            url: 'inc/service/CreateAgentAjax.php',
            type: 'POST',
            dataType: 'json',
            data: {
                // product_id: product_id,
                fullname: fullname,
                email: email,
                phone: phone,
                address: address,
                sales_point: sales_point,
                sales_point_id:sales_point_id,
                role: role
            },
            success: function (data) {
                console.log(data)
                $('#create_product').text('Create');
                $('#create_product').attr('disabled', false);
                if (data.message = 'success') {
                    sweet('success', 'Congrats', 'Agent created successfully!')
                    $('#fullname').val('')
                    $('#email').val('')
                    $('#phone').val('')
                    $('#address').val('')
                    $('#sales_point').val('')
                    $('#role').val('')
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
})