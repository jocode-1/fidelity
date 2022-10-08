$(document).ready(function () {
    //console.log('here...................')
  
    $("#login").on("click", function (e) {
      $("#login").val("Please Wait..");
      $("#login").attr("disabled", true);
      if ($("#email").val() != "" && $("#password").val()) {
        login();
      } else {
        sweet('question', 'Empty fields', 'Empty fields detected, please try again')
      }
      $("#login").val('Login');
      $("#login").attr("disabled", false);
    });
  
    function login() {
      $.ajax({
        url: 'inc/service/loginAjax.php',
        method: "POST",
        dataType: "JSON",
        data: {
          email: $("#email").val(),
          password: $("#password").val(),
        },
        success: function (data) {
          console.log(data);
          for (var i = 0; i < data.length; i++) {
						var role = data[i].role;

						if(role  >= 3){
							window.location = "dashboard.php";
							$("#login").val('LOGIN');
							$("#login").attr('disabled', false);
						}else if(role  < 3){
							window.location = "agent_dashboard.php";
							$("#login").val('LOGIN');
							$("#login").attr('disabled', false);
						}else{
							$("#login").val('LOGIN');
							$("#login").attr('disabled', false);
              sweet('question', 'Oops!', 'E-mail or Password is Incorrect ')
						}

					}
        },
        error: function (err) {
          //console.log(err)
          $("#login").val("LOGIN");
          $("#login").attr("disabled", false);
          sweet('error', 'Oops', 'There was an error, please try again')
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
  });
  