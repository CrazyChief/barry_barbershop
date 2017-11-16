<?php
//var_dump($_POST);
if ((isset($_POST['formName']) && ($_POST['formName'] != ''))
    && (isset($_POST['formEmail']) && ($_POST['formEmail'] != ''))
    && (isset($_POST['formMessage']) && ($_POST['formMessage'] != ''))
    && mb_ereg("^[a-zA-Z0-9_.-]+@([a-zA-Z0-9-]+\.)+[a-z]{2,6}$", $_POST['formEmail'] )
) {

    $to = 'info@barry.vn.ua'; //    variable with receiver email

    $subject = 'Contact us';  //  variable with message subject
    $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Имя контактного лица: '.strip_tags(htmlspecialchars($_POST['formName'])).'</p>
                        <p>Email контактного лица: '.strip_tags(htmlspecialchars($_POST['formEmail'])).'</p>
                        <p>Сообщение контактного лица: '.strip_tags(htmlspecialchars($_POST['formMessage'])).'</p>
                        <br><br>
                        <hr>
                        <a>Ответить на письмо: '.strip_tags(htmlspecialchars($_POST['formEmail'])).'</a>
                    </body>
                </html>';
    $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
    $headers .= "From: Отправитель <".$_POST['formEmail'].">\r\n";
    mail($to, $subject, $message, $headers);
    echo "Ваше сообщение отправлено!";
}
else
    echo "Ошибка!";