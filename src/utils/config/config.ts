import dotenv from 'dotenv';

dotenv.config();

interface Config {
  common: {
    port: number;
    nodeEnv: string;
  },
  jwt: {
    accessSecret: string;
    refreshSecret: string;
  }
}

const config: Config = {
  common: {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  jwt: {
    accessSecret: process.env.JWT_ACESS_SECRET || "3222323",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "cdssdcd",
  }
};

export default config;
