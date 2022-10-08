
$(document).ready(function () {

    var agent_id = document.getElementById("agents").innerHTML;
    var agent_name = document.getElementById("agent_name").innerHTML;
    var sales_point = document.getElementById("sales_id").innerHTML;
    // var sales_point = $("#sales_id").attr("data-id");

    fetchProduct()



    $('#create_sales').on('click', function (e) {
        e.preventDefault()

        var product_name = $('#product_name option:selected').text()
        var product_id = $('#product_name option:selected').val()
        var product_price = $('#product_price').val()
        var product_quantity = $('#product_quantity').val()
        var total_amount = $('#total_amount').val()
        var amount_paid = $('#amount_paid').val()
        var amount_credit = $('#amount_credit').val()
        var empty_create = $('#empty_create').val()
        var customer_name = $('#customer_name').val()
        var payment_type = $('#payment_type').val()
        if (product_name == '' || product_price == '' || product_quantity == '' || amount_paid == '' || customer_name == '') {
            sweet('question', 'Empty fields', 'Empty fields detected, please try again')
        } else {
            createSales(agent_id, agent_name,  product_name, product_price, product_quantity, total_amount, amount_paid, 
                amount_credit, empty_create, customer_name, sales_point, payment_type,product_id);
        }

    })




    function createSales(agent_id, agent_name,  product_name, product_price, product_quantity, total_amount, amount_paid, amount_credit, empty_create, customer_name, sales_point, payment_type,product_id) {
        $('#create_sales').text('Loading .....');
        $('#create_sales').attr('disabled', true);
        $.ajax({
            url: 'inc/service/CreateSalesAjax.php',
            type: 'POST',
            dataType: 'json',
            data: {
                agent_id: agent_id,
                fullname: agent_name,
                product_name: product_name,
                product_price: product_price,
                product_quantity: product_quantity,
                total_amount: total_amount,
                amount_paid: amount_paid,
                amount_credit: amount_credit,
                empty_create: empty_create,
                customer_name: customer_name,
                sales_point: sales_point,
                payment_type: payment_type,
                product_id:product_id
            },
            success: function (data) {
                console.log(data)
                $('#create_sales').text('Create');
                $('#create_sales').attr('disabled', false);
                if (data.message = 'success') {
                    sweet('success', 'Congrats', 'Sales Recorded Successfully!')
                    $('#product_name').val('')
                    $('#product_price').val('')
                    $('#product_quantity').val('')
                    $('#total_amount').val('')
                    $('#amount_paid').val('')
                    $('#amount_credit').val('')
                    $('#empty_create').val('')
                    $('#customer_name').val('')
                    $('#payment_type').val('')
                } else {
                    sweet('error', 'Oops', 'There was an error, please try again')
                }

            },
            error: function (xhr, status, errorThrown) {
                sweet('error', 'Network error', 'Check network and try again')
                console.log("error status: " + xhr.status);
                console.log("errorThrown: " + errorThrown);
                $('#create_sales').text('Create Sales');
                $('#create_sales').attr('disabled', false);
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



    function fetchProduct(product) {

        $.ajax({
            url: 'inc/service/FetchProductAjax.php',
            type: 'POST',
            dataType: 'json',
            data: {product_id: product},
            success: function (data) {
                console.log(data)
                let name = $('#product_name');
                name.empty();
                name.append('<option selected="true" disabled>--Select Product--</option>');
                name.prop('selectedIndex', 0);
                for (var i = 0; i < data.length; i++) {
                    name.append($('<option></option>').attr('value', data[i].product_id).text(data[i].product_name));

                }

            },
            error: function (xhr, status, errorThrown) {
                sweet('error', 'Network error', 'Check network and try again')

            }
        });
    }

    $('#product_name').on('change', function () {
		var cl = $('#product_name :selected').val();
		$.ajax({
			url: 'inc/service/FetchProductByIdAjax.php',
			type: "POST",
			dataType: "json",
			data: {
				product_id: cl,
			},
			success: function (res) {
				console.log(res)
				$.each(res, function (i, p) {
                    $('#product_price').val(p.product_price).text();
                    console.log(p)
				});
			},

			error: function (xhr) {
				alert("AJAX FAILED TEXT", "error");
			}
		});
	});

    $(function() {
        $("#product_price, #product_quantity").on("keydown keyup click focus", qty);

        function qty() {

            var sum = (Number($("#product_price").val()) * Number($("#product_quantity").val()));

            $('#total_amount').val(sum);
        }

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

})