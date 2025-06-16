import { PrismaClient } from '../generated/prisma';
import { UserDto } from '../utils/dto/user';
import bcrypt from "bcryptjs"

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(userDto: UserDto) {
    const password = await bcrypt.hash(userDto.password, 4)
    const user = await this.prisma.user.create({
      data: { ...userDto, password },
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
