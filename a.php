<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
if (isset($_POST['send'])) {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'trancongtien406@gmail.com';
    $mail->Password = 'jbbiguectjxaqaxr';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;
    $mail->setFrom('trancongtien406@gmail.com');
    $mail->addAddress($_POST['email']);
    $mail->isHTML(true);
    $mail->Subject = $_POST['fullname'];
    $mail->Body = $_POST['message'];
    $mail->send();
    echo "<script>alert('Send Mail Successfully'); document.location.href='/'; </script>";
}