
$(document).ready(function () {

    var agent_id = document.getElementById('agents').innerHTML;
    var sales = document.getElementById('agents_salespoint').innerHTML;
    // console.log(sales_point);

    // createRemittance()



    $('#submit').on('click', function (e) {
        e.preventDefault()

        
        var expenditure_amount = $('#expenditure_amount').val()
        var expenditure_description = $('#expenditure_description').val()
        var authorizer_name = $('#authorizer_name').val()
        var date = $('#date').val()
        // var sales_point = $('#agents_salespoint').val()
        if ( expenditure_amount == '' || expenditure_description == '' || authorizer_name == '' || date == '') {
            sweet('question', 'Empty fields', 'Empty fields detected, please try again')
        } else {
            createExpenditure(agent_id,  expenditure_amount, expenditure_description, authorizer_name, date, sales)
        }

    })


    function createExpenditure(agent_id, expenditure_amount, expenditure_description, authorizer_name, date, sales) {
        $('#submit').text('Loading .....');
        $('#submit').attr('disabled', true);
        $.ajax({
            url: 'inc/service/CreateExpenditureAjax.php',
            type: 'POST',
            dataType: 'json',
            data: {
                agent_id: agent_id,
                expenditure_amount: expenditure_amount,
                expenditure_description: expenditure_description,
                authorizer_name: authorizer_name,
                date: date,
                sales_point: sales
               
                // payment_type: payment_type
            },
            success: function (data) {
                console.log(data)
                $('#submit').text('Create');
                $('#submit').attr('disabled', false);
                if (data.message = 'success') {
                    sweet('success', 'Congrats', 'Expenditure Recorded!')
                    $('#expenditure_amount').val('')
                    $('#expenditure_description').val('')
                    $('#authorizer_name').val('')
                    $('#date').val('')
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

 


})