
  <header id="header" class="header fixed-top d-flex align-items-center">

    <div class="d-flex align-items-center justify-content-between">
      <a href="agent_dashboard.php" class="logo d-flex align-items-center">
        <img src="assets/img/logo.png" alt="">
        <span class="d-none d-lg-block">FS</span>
      </a>
      <i class="bi bi-list toggle-sidebar-btn"></i>
    </div><!-- End Logo -->


    <nav class="header-nav ms-auto">
      <ul class="d-flex align-items-center">

        <li class="nav-item d-block d-lg-none">
          <a class="nav-link nav-icon search-bar-toggle " href="#">
            <i class="bi bi-search"></i>
          </a>
        </li><!-- End Search Icon-->

       
        <li class="nav-item dropdown pe-3">

          <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
            <img src="assets/img/default-avatar.png" alt="Profile" class="rounded-circle">
            <span class="d-none d-md-block dropdown-toggle ps-2"><?php echo $userDetails['fullname']; ?></span>
          </a><!-- End Profile Iamge Icon -->

          <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
            <li class="dropdown-header">
              <h6><?php echo $userDetails['email']; ?></h6>
              <span><?php echo $userDetails['sales_point']; ?></span>
            </li>
            <li>
              <hr class="dropdown-divider">
            </li>

           
            <li>
              <hr class="dropdown-divider">
            </li>

            <li>
              <a class="dropdown-item d-flex align-items-center" href="logout.php">
                <i class="bi bi-box-arrow-right"></i>
                <span>Sign Out</span>
              </a>
            </li>

          </ul><!-- End Profile Dropdown Items -->
        </li><!-- End Profile Nav -->

      </ul>
    </nav><!-- End Icons Navigation -->

  </header><!-- End Header -->

  <!-- ======= Sidebar ======= -->
  <aside id="sidebar" class="sidebar">

    <ul class="sidebar-nav" id="sidebar-nav">

      <li class="nav-item">
        <a class="nav-link " href="index.html">
          <i class="bi bi-grid"></i>
          <span>Dashboard</span>
        </a>
      </li><!-- End Dashboard Nav -->

      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#salespoint-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide"></i><span> Sales</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="salespoint-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
        
          <li>
            <a href="create_sales.php">
              <i class="bi bi-circle"></i><span>Create Sales</span></a>
          </li>
          <li>
            <a href="view_agent_products.php">
              <i class="bi bi-circle"></i><span>View Products</span></a>
          </li>

          <li>
            <a href="view_agent_sales.php">
              <i class="bi bi-circle"></i><span>View My Sales</span></a>
          </li>
          
        </ul>
      </li>
      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#order-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide"></i><span> Orders</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="order-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
        
        <li>
            <a href="product_order.php">
              <i class="bi bi-circle"></i><span>Create Order</span></a>
          </li>
          
          <li>
            <a href="view_orders.php">
              <i class="bi bi-circle"></i><span>View Order</span></a>
          </li>

          
        </ul>
      </li>
      
      <!-- End Sales Point Nav -->

      <li class="nav-item">
        <a class="nav-link collapsed" data-bs-target="#agents-nav" data-bs-toggle="collapse" href="#">
          <i class="bi bi-menu-button-wide"></i><span>Reports</span><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul id="agents-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
          <!--  <li>-->
          <!--  <a href="view_agent_product.php">-->
          <!--    <i class="bi bi-circle"></i><span>View Products</span></a>-->
          <!--</li>-->
          <li>
            <a href="remittance.php">
              <i class="bi bi-circle"></i><span> Remittance </span></a>
          </li>
          <li>
            <a href="expenditure.php">
              <i class="bi bi-circle"></i><span> Expenditure </span>
            </a>
          </li>

          <li>
            <a href="view_remittance.php">
              <i class="bi bi-circle"></i><span> View Remittance </span>
            </a>
          </li>

          <li>
            <a href="view_expenditure.php">
              <i class="bi bi-circle"></i><span> View Expenditures </span>
            </a>
          </li>
        </ul>
      </li>
      
      <!-- End Agent Nav -->
      

      <li class="nav-heading">Settings</li>

      <li class="nav-item">
        <a class="nav-link collapsed" href="change_password.php">
          <i class="bi bi-person"></i>
          <span>Change Password</span>
        </a>
      </li><!-- End Profile Page Nav -->

      <li class="nav-item">
        <a class="nav-link collapsed" href="logout.php">
          <i class="bi bi-question-circle"></i>
          <span>Logout</span>
        </a>
      </li><!-- End F.A.Q Page Nav -->

    </ul>

  </aside><!-- End Sidebar-->
