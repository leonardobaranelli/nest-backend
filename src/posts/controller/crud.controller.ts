import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CrudService } from '../services/crud.service';
import { Posts } from '../../shared/models/relations.config';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Controller('posts')
export class CrudController {
  constructor(private readonly crudService: CrudService) {}

  @Get()
  findAll(): Promise<Posts[] | { error: string }> {
    return this.crudService.findAll();
  }

  @Get(':condition') 
  async filterByType(@Param('condition') condition: string) {    
    const result = await this.crudService.filterByType(condition);
    return result;
  }
  
  // @Get(':condition') 
  // filterByType(@Param('condition') condition: string): Promise<Posts[] | { error: string }> {
  //   return this.crudService.filterByType(condition);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crudService.findOne(id);
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.crudService.create(createPostDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.crudService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crudService.remove(id);
  }
}
