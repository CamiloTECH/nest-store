import { Inject, Injectable } from '@nestjs/common';
import config from './config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: any[],
    @Inject('TASKS') private tasks: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello() {
    return this.tasks;
  }

  getNuevo() {
    const apiKey = this.configService.apiKey;
    return { apiKey };
  }
}
