import { PrismaClient } from '../generated/prisma';
import { UserDto } from '../utils/dto/user';

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(userDto: UserDto) {
    const user = await this.prisma.user.create({
      data: { ...userDto },
    });

    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    return user;
  }
}
