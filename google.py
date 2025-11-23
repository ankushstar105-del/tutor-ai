import imaplib
import email

# Login to your Gmail
EMAIL = 'your_email@gmail.com'
PASSWORD = 'your_app_password'  # Must create App Password in Gmail settings if 2FA is ON

mail = imaplib.IMAP4_SSL('imap.gmail.com')
mail.login(EMAIL, PASSWORD)
mail.select('inbox')

status, messages = mail.search(None, 'ALL')
for num in messages[0].split():
    status, msg_data = mail.fetch(num, '(RFC822)')
    msg = email.message_from_bytes(msg_data[0][1])
    print('From:', msg['From'])
    print('Subject:', msg['Subject'])
