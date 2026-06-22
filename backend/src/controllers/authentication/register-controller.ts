import { FastifyReply } from 'fastify';
import { registerSchema } from '../../schemas/authenticate-schema';
import { FastifyRequestTypeBox } from '../../types/auth-request-type';
import { hashPassword } from '../../libs/bcrypt.js';
import { createUser, getUserByEmail } from '../../services/user';
import { v4 as uuidv4 } from 'uuid';
import { getEmailExpiration } from '../../constants/expiration-date';
import { Role } from '@prisma/client';

export const registerController = async (
  request: FastifyRequestTypeBox<typeof registerSchema>,
  reply: FastifyReply,
) => {
  try {
    const { email, password, username } = request.body;

    const existingEmail = await getUserByEmail(
      request.server.prisma,
      email,
    );

    if (existingEmail) {
      return reply.code(409).send({
        message: 'Cet email est déjà utilisé',
      });
    }

    const hashedPassword = await hashPassword(password);

    const emailConfirmationToken = uuidv4();

    const { email: emailSaved } = await createUser(
      request.server.prisma,
      {
        email,
        username,
        password: hashedPassword,
        role: Role.USER,
        emailConfirmationExpire: getEmailExpiration(),
        emailConfirmationToken,
      },
    );

    // await sendConfirmEmail({
    //   email: emailSaved,
    //   username,
    //   link: `cesizen://confirm?token=${emailConfirmationToken} `,
    // });

    return reply.code(201).send({
      message: `Un email à été envoyé à ${emailSaved}`,
    });
  } catch (err) {
    console.log(err);
    return reply.code(500).send({
      message: 'Une erreur est survenue',
    });
  }
};
