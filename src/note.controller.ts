import { Controller, Get, Post, Put, Patch, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { NoteInput } from './dto/note.dto'

@Controller('note')
export class NoteController {
  constructor() {
    if (!global.notes) {
      this.initNotesValue();
    }
  }

  @Get()
  getAllNote(): Array<Object> {
    return global.notes;
  }

  // route parameter id
  // path: /note/:id
  @Get(':id')
  getNote(@Param() params): Object {
    let note = global.notes.find((n) => n.id == params.id);

    if (!note) {
      throw new NotFoundException();
    }

    return note;
  }

  @Post()
  createNote(@Body() input: NoteInput): Object {
    let lastId = global.notes[global.notes.length - 1]['id'];

    let newNote = {
      id: lastId + 1,
      message: input.message,
      user_id: input.user_id,
      created_at: Date.now()
    };

    global.notes.push(newNote)

    return newNote;
  }

  @Delete(':id')
  DeleteNote(@Param() params): Object {
    let index = global.notes.findIndex(note => note.id == params.id);

    if (index == -1) {
      throw new NotFoundException();
    }

    global.notes.splice(index, 1);
    return {
      message: `Note with id ${params.id} has been succesfully deleted`
    };
  }

  @Put(':id')
  PutNote(@Param() params, @Body() input: NoteInput): Object {
    let index = global.notes.findIndex(note => note.id == params.id);

    if (index == -1) {
      throw new NotFoundException();
    }

    let note = global.notes[index];

    global.notes[index] = {
      id: note.id,
      message: input.message,
      user_id: input.user_id,
      created_at: note.id
    };

    return global.notes[index];
  }

  @Patch(':id')
  PatchNote(@Param() params, @Body() input: NoteInput): Object {
    let index = global.notes.findIndex(note => note.id == params.id);

    if (index == -1) {
      throw new NotFoundException();
    }

    let note = global.notes[index];

    global.notes[index] = {
      id: note.id,
      message: input.message || note.message,
      user_id: input.user_id || note.user_id,
      created_at: note.id
    };


    return global.notes[index];
  }

  initNotesValue() {
    global.notes = [
      {
        id: 1,
        message: 'This is a hectic day',
        user_id: 10,
        created_at: 1678261472
      },
      {
        id: 2,
        message: 'I met my old friend today',
        user_id: 11,
        created_at: 1678281466
      }
    ];
  }
}
