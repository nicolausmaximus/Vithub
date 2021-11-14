<?php
include_once 'dbconnect.php';

// fetch files
$sql = "select filename from tbl_files";
$result = mysqli_query($con, $sql);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>VITHUB- A portal for study materials</title>

    <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />

    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />

    <link href="css/styles_cs.css" rel="stylesheet" />
</head>

<body class="d-flex flex-column h-100">
    <main class="flex-shrink-0">

        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container px-5">
                <a class="navbar-brand" href="http://localhost:8200/">VITHUB </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item"><a class="nav-link" href="http://localhost:8200/">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="#upload">Upload</a></li>
                        <li class="nav-item"><a class="nav-link" href="http://localhost:8200/login">Log Out </a></li>


                    </ul>
                </div>
            </div>
        </nav>
        <!-- Header-->
        <header class="bg-dark py-5" id="upload">
            <div class="container px-5">
                <div class="row gx-5 align-items-center justify-content-center">
                    <div class="col-lg-8 col-xl-7 col-xxl-6">
                        <div class="my-5 text-center text-xl-start">
                            <h1 class="display-5 fw-bolder text-white mb-2">Database Management System</h1>

                            <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">


                            </div>
                        </div>
                    </div>
                    <div class="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
                        <form action="upload.php" method="post" enctype="multipart/form-data">
                            <legend>Select File to Upload:</legend>
                            <div class="form-group">
                                <input name="file1"  class="form-control" id="formFileLg" type="file">
                            </div>
                            <div class="form-group">
                                <input type="submit"  class="btn btn-primary px-4 me-sm-3" name="submit" value="Upload" class="btn btn-info"/>
                            </div>
                            <?php if(isset($_GET['st'])) { ?>
                                <div class="alert alert-danger text-center">
                                <?php if ($_GET['st'] == 'success') {
                                        echo "File Uploaded Successfully!";
                                    }
                                    else
                                    {
                                        echo 'Invalid File Extension!';
                                    } ?>
                                </div>
                            <?php } ?>
                        </form>
                    </div>
                </div>
            </div>
        </header>


        <div class="row">
            <div class="col-xs-8 col-xs-offset-2">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>File Name</th>
                            <th>View</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php
                    $i = 1;
                    while($row = mysqli_fetch_array($result)) { ?>
                    <tr>
                        <td><?php echo $i++; ?></td>
                        <td><?php echo $row['filename']; ?></td>
                        <td><a href="uploads/<?php echo $row['filename']; ?>" target="_blank">View</a></td>
                        <td><a href="uploads/<?php echo $row['filename']; ?>" download>Download</td>
                    </tr>
                    <?php } ?>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
    <!-- Footer-->
    <footer class="bg-dark py-4 mt-auto">
        <div class="container px-5">
            <div class="row align-items-center justify-content-between flex-column flex-sm-row">
                <div class="col-auto">
                    <div class="small m-0 text-white">Made with ❤️ for all the VITIANS</div>
                </div>

            </div>
        </div>
    </footer>
    <!-- Bootstrap core JS-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Core theme JS-->
    <script src="js/scripts.js"></script>
</body>

</html>