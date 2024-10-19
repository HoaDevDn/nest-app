import * as bcryptjs from 'bcryptjs';
import { env } from '~configs/env.config';

export class PasswordHelper {
  static async hash(password: string): Promise<string> {
    return await bcryptjs.hash(password, env.SALT_ROUND);
  }

  static async verifyPassword(
    password: string,
    encrypted: string,
  ): Promise<boolean> {
    return bcryptjs.compare(password, encrypted);
  }
}
