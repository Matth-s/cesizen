import {
  EmailParams,
  MailerSend,
  Recipient,
  Sender,
} from 'mailersend';

import fs from 'fs';
import path from 'path';

const MAILERSEND_API_KEY = process.env.MAILERSEND_API_KEY;

const mailerSend = new MailerSend({
  apiKey: MAILERSEND_API_KEY!,
});

const sentFrom = new Sender('noreply@mail.matthdev.fr', 'Matthdev');
export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const recipient = [new Recipient(to)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipient)
    .setSubject(subject)
    .setHtml(html);

  await mailerSend.email.send(emailParams);
};

export const sendConfirmEmail = async ({
  username,
  link,
  email,
}: {
  email: string;
  username: string;
  link: string;
}): Promise<void> => {
  const filePath = path.join(
    process.cwd(),
    'src',
    'html',
    'confirm-email.html',
  );

  const htmlTemplate = await fs.promises.readFile(filePath, 'utf-8');

  const html = htmlTemplate
    .replaceAll('{{USERNAME}}', username)
    .replaceAll('{{CONFIRMATION_LINK}}', link);

  await sendEmail({
    to: email,
    subject: 'Confirmez votre adresse email',
    html,
  });
};

export const sendResetPasswordEmail = async ({
  username,
  link,
  email,
}: {
  email: string;
  username: string;
  link: string;
}): Promise<void> => {
  const filePath = path.join(
    process.cwd(),
    'src',
    'html',
    'reset-password.html',
  );

  const htmlTemplate = await fs.promises.readFile(filePath, 'utf-8');

  const html = htmlTemplate
    .replaceAll('{{USERNAME}}', username)
    .replaceAll('{{RESET_PASSWORD_LINK}}', link);

  await sendEmail({
    to: email,
    subject: 'Confirmez votre adresse email',
    html,
  });
};
