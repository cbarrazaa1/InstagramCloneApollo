// @flow
import bcrypt from 'bcryptjs';
import AuthToken from '../../auth/AuthToken';
import EntUser from '../../schemas/EntUserSchema';
import type {ViewerContext} from '../../types/ViewerContext';

type UserSignUpMutationVariables = {|
  +username: string,
  +password: string,
|};

const UserSignUpMutation = async (
  parent: null,
  {username, password}: UserSignUpMutationVariables,
  context: ViewerContext
): Promise<EntUser> => {
  const user = await EntUser.genFromUsername(username);
  if (user != null) {
    throw new Error('User already exists.');
  }

  const newUser = EntUser.create()
    .setUsername(username)
    .setPassword(await bcrypt.hash(password, 10));

  return await newUser
    .setAuthToken(AuthToken.create(newUser))
    .genSave();
};

export default UserSignUpMutation;
