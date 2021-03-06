// @flow strict
'use strict';
import mongoose, {
  type MongooseModel,
  type MongooseSchema,
  type MongooseDocument,
} from 'mongoose';

const EntUserSchema: MongooseSchema<MongooseDocument> = new mongoose.Schema(
  {
    username: String,
    name: String,
    password: String,
    authToken: String,
  }
);

const EntUserModel: MongooseModel = mongoose.model(
  'user',
  EntUserSchema
);

const getNullableEnt = (data: ?MongooseDocument): ?EntUser => {
  if (data == null) {
    return null;
  }

  return new EntUser(data);
};

class EntUser {
  data: MongooseDocument;
  isMutating: boolean;

  constructor(data: MongooseDocument, isMutating?: boolean = false) {
    this.data = data;
    this.isMutating = isMutating;
  }

  static async genEnforce(id: string): Promise<EntUser> {
    const data = await EntUserModel.findById(id);
    if (data == null) {
      throw new Error('Could not load Ent with ID ' + id);
    }

    return new EntUser(data);
  }

  static async genNullable(id: string): Promise<?EntUser> {
    return getNullableEnt(await EntUserModel.findById(id));
  }

  static async genFromUsername(username: string): Promise<?EntUser> {
    return getNullableEnt(await EntUserModel.findOne({username}));
  }

  static async genFromToken(authToken: string): Promise<?EntUser> {
    return getNullableEnt(await EntUserModel.findOne({authToken}));
  }

  static create(): EntUser {
    return new EntUser(new EntUserModel(), true);
  }

  static async genUpdateForID(id: string): Promise<EntUser> {
    return new EntUser((await EntUser.genEnforce(id)).data, true);
  }

  update(): EntUser {
    this.isMutating = true;
    return this;
  }

  async genSave(): Promise<EntUser> {
    if (!this.isMutating) {
      throw new Error(
        'You cannot save an Ent without generating an update for it first!'
      );
    }
    await this.data.save();
    this.isMutating = false;
    return this;
  }

  getID(): string {
    return this.data.get('id');
  }

  getUsername(): string {
    return this.data.get('username');
  }

  getName(): string {
    return this.data.get('name');
  }

  getPassword(): string {
    return this.data.get('password');
  }

  getAuthToken(): string {
    return this.data.get('authToken');
  }

  set(field: string, value: string): EntUser {
    if (!this.isMutating) {
      throw new Error(
        'You cannot mutate an Ent without generating an update for it first!'
      );
    }

    this.data.set(field, value);
    return this;
  }

  setUsername(username: string): EntUser {
    return this.set('username', username);
  }

  setName(name: string): EntUser {
    return this.set('name', name);
  }

  setPassword(password: string): EntUser {
    return this.set('password', password);
  }

  setAuthToken(authToken: string): EntUser {
    return this.set('authToken', authToken);
  }
}

export default EntUser;
