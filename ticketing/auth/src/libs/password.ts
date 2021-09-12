import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
    static async hash(password: string): Promise<string> {
        const salt = randomBytes(16).toString('hex');
        const hashed: Buffer = await scryptAsync(password, salt, 64) as Buffer;
        return `${hashed.toString('hex')}.${salt}`;
    }

    static async compare(password: string, storedPassword: string): Promise<boolean> {
        const [ hashedPassword, salt ] = storedPassword.split('.');
        const hashed = await scryptAsync(password, salt, 64) as Buffer;
        return hashed.toString('hex') === hashedPassword;
    }
}