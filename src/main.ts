import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ApiConfigService } from './config/services/api-config.service';
import { AppConfigService } from './config/services/app-config.service';
import { appModes } from './config/types/app-modes';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const { host, port } = app.get(ApiConfigService);
  const { mode } = app.get(AppConfigService);

  if (mode === appModes.development) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Currency exchange')
      .setDescription('Documentation for RESTful API of currency exchange service')
      .setVersion('1.0.0')
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('doc', app, document);
  }

  await app.listen(port, host);
}
bootstrap();
