import smtplib, ssl

def send():
    port = 587 # For SSL
    smtp_server = "smtp-mail.outlook.com"
    sender_email = "feedingyourpet@outlook.com"  # Enter your address
    receiver_email = "aadulan@gmail.com"  # Enter receiver address
    password = "petfood111"
    message = """\
    Subject: Hi there
    
    This message is sent from Python."""

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message)
