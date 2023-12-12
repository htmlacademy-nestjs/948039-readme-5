import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(
    public readonly likeService: LikeService
  ) { }

  @Get(':id')
  public async getCount(@Param('id') id: string) {
    const count = await this.likeService.getCount(id);
    return count;
  }

  @Put(':id')
  public async setLike(
    @Body() dto: {userId: string},
    @Param('id') id: string
    ) {
      const like = await this.likeService.setLike(id, dto.userId);
      return like;
  }
}
