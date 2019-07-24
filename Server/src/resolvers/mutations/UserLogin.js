// @flow
import bcrypt from 'bcryptjs';
import EntUser from '../../schemas/EntUserSchema';
import AuthToken from '../../auth/AuthToken';
import type {ViewerContext} from '../../types/ViewerContext';

type UserLoginMutationVariables = {|
  +username: string,
  +password: string,
|};

const UserLoginMutation = async (
  parent: null,
  {username, password}: UserLoginMutationVariables,
  context: ViewerContext
): Promise<EntUser> => {
  const user = await EntUser.genFromUsername(username);
  if (user == null) {
    throw new Error('User does not exist');
  }

  const validPassword = await bcrypt.compare(
    password,
    user.getPassword()
  );
  if (!validPassword) {
    throw new Error('Incorrect password');
  }

  return await user
    .genUpdate()
    .setAuthToken(AuthToken.create(user))
    .genSave();
};

export default UserLoginMutation;
