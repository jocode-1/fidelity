<?php
include_once('inc/session.php');

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>FS Sales</title>
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
  include('headside2.php');

  ?>

  <main id="main" class="main">

    <div class="pagetitle">
      <h1>Sales</h1>
      <nav>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="dashboard.php">Home</a></li>
          <li class="breadcrumb-item active"> Create Sales</li>
        </ol>
      </nav>
    </div><!-- End Page Title -->

    <section class="section">
      <div class="row">
        <div class="col-lg-12">

          <div class="card">
            <div class="card-body">
              <h5 class="card-title"> Create Sales </h5>
              <p id="agents" hidden> <?php echo $userDetails['agent_id']; ?></p>
              <p id="agent_name" hidden> <?php echo $userDetails['fullname']; ?></p>
              <p id="sales_id" hidden> <?php echo $userDetails['sales_point']; ?> </p>

              <!-- General Form Elements -->
              <div>
              <div class="row mb-3">
                  <label class="col-sm-2 col-form-label">Select Product</label>
                  <div class="col-sm-8">
                    <select id="product_name" name="product_name" class="form-select">
                      <!-- <option value=""> Wine </option> -->
                    </select>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="inputNumber" class="col-sm-2 col-form-label">Product Price</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="product_price" name="product_price" disabled>
                  </div>
                </div>
                <div class="row mb-3">
                  <label class="col-sm-2 col-form-label">Product Quantity</label>
                  <div class="col-sm-6">
                  <input type="number" class="form-control" id="product_quantity" name="product_quantity" min="1" value="1">
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="inputNumber" class="col-sm-2 col-form-label">Total Amount</label>
                  <div class="col-sm-8">
                    <input type="number" class="form-control" id="total_amount" name="total_amount" disabled>
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="inputNumber" class="col-sm-2 col-form-label">Amount Paid</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="amount_paid" name="amount_paid">
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="inputNumber" class="col-sm-2 col-form-label">Amount on Credit</label>
                  <div class="col-sm-6">
                    <input type="text" id="amount_credit" name="amount_credit"class="form-control" >
                  </div>
                 <div class="row mb-3">
                  <label class="col-sm-2 col-form-label">Empty Crates Quantity</label>
                  <div class="col-sm-8">
                  <input type="number" class="form-control" id="empty_create" name="empty_create">
                  </div>
                </div>
                </div>
                 <div class="row mb-3">
                  <label for="inputNumber" class="col-sm-2 col-form-label">Customer Name</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="customer_name" name="customer_name" placeholder="Enter Customer Name">
                  </div>
                </div>
                <div class="row mb-3">
                  <label class="col-sm-2 col-form-label">Payment Type</label>
                  <div class="col-sm-8">
                    <select id="payment_type" name="payment_type" class="form-select">
                      <option >....Select Payment Type.....</option>
                      <option value="Cash"> Cash </option>
                      <option value="Bank Transfer/ POS"> Bank Transfer/ POS </option>
                      <option value="Credit"> Credit </option>
                    </select>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-sm-10">
                    <button type="submit" id="create_sales" class="btn btn-primary">Create Sales</button>
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
      Designed by <a href="index.php">FS</a>
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
  <script src="assets/js/sales.js"></script>
</body>

</html>