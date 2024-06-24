import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  PageDto,
  PageOptionsDto,
} from '@/app/response/dto/paginated-response.dto';
import { ClientItemDto } from '@/app/modules/client/dto/client-item.dto';
import { ClientAdminService } from '@/app/modules/client/admin/client.admin.service';

@ApiTags('Admin clients')
@Controller('/admin/clients')
@ApiBearerAuth()
export class ClientAdminController {
  constructor(private readonly clientAdminService: ClientAdminService) {}

  @Get()
  @ApiOperation({ summary: 'Get clients' })
  @ApiOkResponse({
    description: 'Clients',
    type: PageDto<ClientItemDto>,
  })
  async getAll(
    @Query() pageOptionsDto: PageOptionsDto,
    @Res() response: Response,
  ) {
    return response
      .status(HttpStatus.OK)
      .send(await this.clientAdminService.findAllAndCount(pageOptionsDto));
  }

  @Patch(':id/block')
  @ApiOperation({ summary: 'Block clients' })
  @ApiOkResponse({
    description: 'Client',
    type: ClientItemDto,
  })
  @ApiParam({ name: 'id', description: 'Client id', type: 'number' })
  async block(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    return response
      .status(HttpStatus.OK)
      .send(await this.clientAdminService.block(id));
  }

  @Patch(':id/unblock')
  @ApiOperation({ summary: 'Unblock clients' })
  @ApiOkResponse({
    description: 'Client',
    type: ClientItemDto,
  })
  @ApiParam({ name: 'id', description: 'Client id', type: 'number' })
  async unblock(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    return response
      .status(HttpStatus.OK)
      .send(await this.clientAdminService.unblock(id));
  }

  // @Put(':id')
  // @ApiOperation({ summary: 'Procedure update' })
  // @ApiOkResponse({
  //   description: 'Procedure update',
  // })
  // @ApiParam({ name: 'id', description: 'Procedure id', type: 'number' })
  // async update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() procedureUpdateDto: ProcedureUpdateDto,
  //   @Res() response: Response,
  // ) {
  //   return response
  //     .status(HttpStatus.OK)
  //     .send(await this.procedureAdminService.update(id, procedureUpdateDto));
  // }
}
