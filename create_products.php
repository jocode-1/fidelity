<?php
include_once('inc/session.php');

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>FS Products</title>
  <meta content="" name="description">
  <meta content="" name="keywords">

  <!-- Favicons -->
  <link href="assets/img/logo.png" rel="icon">
  <link href="assets/img/logo.png" rel="apple-touch-icon">

  <!-- Google Fonts -->
  <link href="https://fonts.gstatic.com" rel="preconnect">
  <link
    href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
    rel="stylesheet">

  <!-- Vendor CSS Files -->
  <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
  <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
  <link href="assets/vendor/quill/quill.snow.css" rel="stylesheet">
  <link href="assets/vendor/quill/quill.bubble.css" rel="stylesheet">
  <link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet">
  <link href="assets/vendor/simple-datatables/style.css" rel="stylesheet">

  <!-- Template Main CSS File -->
  <link href="assets/css/style.css" rel="stylesheet">

</head>

<body>

  <?php
  include('headside.php');

  ?>

  <main id="main" class="main">

    <div class="pagetitle">
      <h1>Create Product</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
          <li class="breadcrumb-item active">Create Product</li>
        </ol>
      </nav>
    </div><!-- End Page Title -->

    <section class="section">
      <div class="row">
        <div class="col-lg-12">

          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Create Product</h5>

              <!-- General Form Elements -->
              <div>
                <div class="row mb-3">
                  
                  <label for="inputText" class="col-sm-2 col-form-label">Product Name</label>
                  <div class="col-sm-10">
                    <select id="product_name" name="product_name" class="form-control">
                    </select>
                  </div>
                </div>
                 <div class="row mb-3">
                  <label class="col-sm-2 col-form-label">Select Sales Point</label>
                  <div class="col-sm-10">
                    <select id="sales_point" name="sales_point" class="form-select">
                        <!-- <option>Jabi</option> -->
                    </select>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="inputNumber" class="col-sm-2 col-form-label">Product Quantity</label>
                  <div class="col-sm-10">
                    <input type="number" class="form-control" id="product_quantity"
                      name="product_quantity">
                  </div>
                </div>
                 <div class="row mb-3">
                  <label class="col-sm-2 col-form-label">Empty Crates Quantity</label>
                  <div class="col-sm-10">
                  <input type="number" class="form-control" id="empty_create" name="empty_create">
                  </div>
                </div>
                <div class="row mb-3">
                  <label class="col-sm-2 col-form-label">Product Category</label>
                  <div class="col-sm-10">
                    <select id="product_category" name="product_category" class="form-select"></select>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="inputNumber" class="col-sm-2 col-form-label">Product Price</label>
                  <div class="col-sm-6">
                    <input type="text" id="product_price" name="product_price"class="form-control">
                  </div>
                  <!-- <div class="col-sm-3">
                    <select id="period" class="form-control">
                      <option>AM</option>
                      <option>PM</option>
                    </select>
                  </div> -->
                </div>
                <!-- <div class="row mb-3">
                    <label for="inputPassword" class="col-sm-2 col-form-label">Product Description</label>
                    <div class="col-sm-10">
                      <textarea class="form-control" id="product_description" name="product_description"
                        style="height: 100px"></textarea>
                    </div>
                  </div> -->
                <div class="row mb-3">
                  <label class="col-sm-2 col-form-label">Published Date</label>
                  <div class="col-sm-10">
                    <input type="date" class="form-control" id="published_date" name="published_date">
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-sm-10">
                    <button type="submit" id="create_product" class="btn btn-primary">Create</button>
                  </div>
                </div>

              </div><!-- End General Form Elements -->

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
      Designed by <a href="#">FS</a>
    </div>
  </footer><!-- End Footer -->

  <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i
      class="bi bi-arrow-up-short"></i></a>

  <!-- Vendor JS Files -->
  <script src="assets/vendor/apexcharts/apexcharts.min.js"></script>
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/chart.js/chart.min.js"></script>
  <script src="assets/vendor/echarts/echarts.min.js"></script>
  <script src="assets/vendor/quill/quill.min.js"></script>
  <script src="assets/vendor/simple-datatables/simple-datatables.js"></script>
  <script src="assets/vendor/tinymce/tinymce.min.js"></script>
  <script src="assets/vendor/php-email-form/validate.js"></script>
  <script src="assets/vendor/jquery/jquery.min.js"></script>
  <script src="assets/vendor/jquery/sweet.js"></script>
  <!-- Template Main JS File -->
  <script src="assets/js/main.js"></script>
  <script src="assets/js/submissions.js"></script>
</body>

</html>