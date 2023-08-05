import { ApiProperty } from '@nestjs/swagger'

export class Token {

  @ApiProperty({ description: 'Access Token' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh Token' })
  refreshToken: string;

}
