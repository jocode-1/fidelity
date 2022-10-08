$(document).ready(function () {
    var agent_id = document.getElementById('agents').innerHTML;
    // console.log(agent_id);

    $("#update").on("click", function() {
        var new_pass = $("#new_password").val();
        var confirm = $("#confirm_password").val();
        var match = new_pass.localeCompare(confirm);
        // console.log(match)
        if (new_pass == "" || confirm == "") {
            sweet("question", "Invalid Action", "Empty fields detected");
        } else if (new_pass.localeCompare(confirm) !== 0) {
            sweet("question", "Unmatch", "Passwords do not match");
        } else {
            UpdatePassword(agent_id, new_pass);
        }
    });


    function UpdatePassword(agent_id, new_pass) {
        $("#update").text('Please wait....');
        $("#update").attr('disabled', true);

        $.ajax({
            url: 'inc/service/UpdatePasswordAjax.php',
            type: "POST",
            dataType: "json",
            data: {
                agent_id: agent_id,
                password: new_pass
            },
            success: function(res) {
                // console.log(res)
                $("#update").text('Change Password')
                $("#update").attr('disabled', false)
                
                if (res = 'success') {
                    sweet("success", "Approved", "Password changed successfully");
                    $("#new_password").val('');
                $("#confirm_password").val('');

                } else {
                    sweet('error', 'Oops', 'There was an error, please try again')
                }
            },
            error: function(xhr) {
                $("#update").attr('disabled', false)
                $("#update").text('Change Paasword')
                $("#new_password").val('');
                $("#confirm_password").val('');
                Alert("error", "Declined", "Password change failed");
            },
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