import { Request, Response } from 'express';
import { JwtService } from '../services/jwt-service';
import { UserService } from '../services/user-service';
import bcrypt from 'bcryptjs';

export class AuthController {
  private readonly jwtService: JwtService;
  private readonly userService: UserService;

  constructor() {
    this.jwtService = new JwtService();
    this.userService = new UserService();
  }

  async register(req: Request, res: Response) {
    try {
      const { email, name, password } = req.body;
      const foundUser = await this.userService.findUserByEmail(email);

      if (foundUser) {
        throw Error('User with this email already exists');
      }

      const createdUser = await this.userService.createUser({
        email,
        name,
        password,
      });

      if (!createdUser) {
        throw Error('Error creating user');
      }

      const tokens = this.jwtService.generateTokens({ email });

      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 2000,
        sameSite: false,
        httpOnly: true,
      });
      res.cookie('accessToken', tokens.accessToken, {
        maxAge: 1000,
        sameSite: false,
        httpOnly: true,
      });

      res.status(201).json({
        accessToken: tokens.accessToken,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const foundUser = await this.userService.findUserByEmail(email);

      if (!foundUser) {
        throw new Error('User with this email does not exist');
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        foundUser.password,
      );

      if (!isPasswordCorrect) {
        throw new Error('The password is wrong');
      }

      const tokens = this.jwtService.generateTokens({ email });

      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 2000,
        sameSite: false,
        httpOnly: true,
      });
      res.cookie('accessToken', tokens.accessToken, {
        maxAge: 1000,
        sameSite: false,
        httpOnly: true,
      });

      res.status(200).json({
        accessToken: tokens.accessToken
      })
    } catch (e) {
      console.log(e);
    }
  }
}
