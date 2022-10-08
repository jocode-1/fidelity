<?php
include_once('inc/session.php');

?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>FS View Agent</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link href="assets/img/logo.png" rel="icon">
  <link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link href="https://fonts.gstatic.com" rel="preconnect">
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
  <link href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap4.min.css" rel="stylesheet">
  <link href="assets/vendor/quill/quill.bubble.css" rel="stylesheet">
  <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.css" rel="stylesheet">

  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.23/datatables.min.css">
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.23/css/jquery.dataTables.min.css">
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.6.5/css/buttons.dataTables.min.css">

  <!-- Template Main CSS File -->
  <link href="assets/css/style.css" rel="stylesheet">
  <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>

  <!-- =======================================================
  * Template Name: FS - v2.2.2
  * Template URL: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/
  * Author: BootstrapMade.com
  * License: https://bootstrapmade.com/license/
  ======================================================== -->
</head>

<body>

  <?php
  include('headside.php');

  ?>
  <main id="main" class="main">

    <div class="pagetitle">
      <h1>View Agent</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
          <li class="breadcrumb-item">Agents</li>
          <li class="breadcrumb-item active">View Agents</li>
        </ol>
      </nav>
    </div><!-- End Page Title -->

    <section class="section">
      <div class="row">
        <div class="col-lg-12">

          <div class="card">
            <div class="card-body">
              <h5 class="card-title">View Agents</h5>

              <table class="stripe" style="width:100%" id="example2">
                <thead>
                  <tr>
                    <th scope="col">Agent ID</th>
                    <th scope="col">Fullname</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Address</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Sales Point</th>
                    <th scope="col">Date</th>
                    <th scope="col">Edit</th>
                    <th scope="col">View</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>

              </table>
              <!-- End Table with stripped rows -->

            </div>
          </div>

        </div>

        <div class="modal fade" id="disablebackdrop" tabindex="-1" data-bs-backdrop="false">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="agent_id"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <p id="fullname"></p>
                  <p id="phone"></p>
                  <p id="address"></p>
                  <p id="email"></p>
                  <p id="sales_point"></p>
                  <p id="date"></p>
              </div>
              <!-- <div id="map"></div> -->
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>

          </div>
        </div>


        <div class="modal fade" id="disablebackdrop2" tabindex="-1" data-bs-backdrop="false">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="agent_id"></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="row mb-3">
                  <label for="inputText" class="col-sm-2 col-form-label">Product ID</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="product_id_update" name="product_id" disabled>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="inputEmail" class="col-sm-2 col-form-label">Product Name</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="product_name_update" name="product_name">
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="inputPassword" class="col-sm-2 col-form-label">Sales Point</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="sales_point_update" name="sales_point" disabled>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="inputNumber" class="col-sm-2 col-form-label">Product Quantity</label>
                  <div class="col-sm-10">
                    <input type="number" class="form-control" id="product_quantity_update" name="product_quantity">
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="inputNumber" class="col-sm-2 col-form-label">Empty Create</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="empty_create_update" name="empty_create">
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="inputNumber" class="col-sm-2 col-form-label">Product Category</label>
                  <div class="col-sm-10">
                    <select type="text" class="form-select" id="product_category_update" name="product_category"></select>
                  </div>
                </div>

                <div class="row mb-3">
                  <label for="inputNumber" class="col-sm-2 col-form-label">Product Price</label>
                  <div class="col-sm-10">
                    <input type="number" class="form-control" id="product_price_update" name="product_price">
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="inputNumber" class="col-sm-2 col-form-label">Product Description</label>
                  <div class="col-sm-10">
                    <textarea type="text" class="form-control" id="product_description_update" name="product_description"></textarea>
                  </div>
                </div>
                <div class="row mb-3">
                  <!-- <label class="col-sm-2 col-form-label">Submit Button</label> -->
                  <div class="col-sm-10">
                    
                  </div>
                </div>
<!-- End General Form Elements -->
              </div>
              <!-- <div id="map"></div> -->
              <div class="modal-footer">
              <button type="submit" class="btn btn-primary" id="update_product">Update Product</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>

          </div>
        </div>




      </div>

    </section>

  </main><!-- End #main -->

  <!-- ======= Footer ======= -->
  <footer id="footer" class="footer">
    <div class="copyright">
      &copy; Copyright <strong><span>FS</span></strong>. All Rights Reserved
    </div>
    <div class="credits">
      <!-- All the links in the footer should remain intact. -->
      <!-- You can delete the links only if you purchased the pro version. -->
      <!-- Licensing information: https://bootstrapmade.com/license/ -->
      <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/ -->
      Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
    </div>
  </footer><!-- End Footer -->

  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

  <!-- Vendor JS Files -->
  <script src="assets/vendor/apexcharts/apexcharts.min.js"></script>
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script type="text/javascript " src="assets/vendor/jquery/jquery.min.js"></script>
  <script type="text/javascript " src="//cdn.datatables.net/v/dt/dt-1.10.23/datatables.min.js "></script>
  <script type="text/javascript " src="https://cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js "></script>
  <script type="text/javascript " src="https://cdn.datatables.net/buttons/1.6.5/js/dataTables.buttons.min.js "></script>
  <script type="text/javascript " src="https://cdn.datatables.net/buttons/1.6.5/js/buttons.flash.min.js "></script>
  <script type="text/javascript " src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js "></script>
  <script type="text/javascript " src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js "></script>
  <script type="text/javascript " src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js "></script>
  <script type="text/javascript " src="https://cdn.datatables.net/buttons/1.6.5/js/buttons.html5.min.js "></script>
  <script type="text/javascript " src="https://cdn.datatables.net/buttons/1.6.5/js/buttons.print.min.js "></script>
  <script src="assets/vendor/jquery/sweet.js"></script>
  <script src="assets/js/agent.js"></script>
  <!-- Template Main JS File -->
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&v=weekly" defer></script>
  <script src="assets/js/main.js"></script>
  
</body>

</html>