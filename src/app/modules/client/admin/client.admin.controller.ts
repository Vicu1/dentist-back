import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
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
