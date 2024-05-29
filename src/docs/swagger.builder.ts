import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const buildApiDocs = (app: INestApplication, ConfigEnv) => {
  const config = new DocumentBuilder()
    .setTitle(ConfigEnv.DOCS_TITLE)
    .setDescription(ConfigEnv.DOCS_DESCRIPTION)
    .setVersion(ConfigEnv.DOCS_VERSION)
    .addServer(ConfigEnv.API_SERVER_URL)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(ConfigEnv.DOCS_PATH, app, document);
};

export default buildApiDocs;
