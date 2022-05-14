import { Controller, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('seeds')
  seed(): Promise<void> {
    return this.appService.seed();
  }
}
