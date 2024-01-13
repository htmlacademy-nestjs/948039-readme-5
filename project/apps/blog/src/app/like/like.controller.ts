import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { LikeService } from './like.service';
import { SetLikeDto } from './dto/set-like';

@Controller('like')
export class LikeController {
  constructor(
    public readonly likeService: LikeService
  ) { }
  @Put('')
  public async setLike(
    @Body() dto: SetLikeDto
    ) {
      const like = await this.likeService.setLike(dto);
      return like;
  }
}
